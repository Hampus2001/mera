const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

app.post("/createCompanyAccount", async (req, res) => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const { users, companies, roles } = req.body;

    const company = Array.isArray(companies) ? companies[0] : companies;

    const [companyResult] = await connection.query(
      `INSERT INTO companies (name, design_setting) VALUES (?, ?)`,
      [company.name, company.design_setting]
    );
    let companyId = companyResult.insertId;
    companyId = parseInt(companyId + Math.floor(Math.random() * 10000000));

    for (const role of roles) {
      await connection.query(
        `INSERT INTO roles (company_id, role_name) VALUES (?, ?)`,
        [companyId, role]
      );
    }

    const userInsertPromises = users.map(async (user) => {
      await connection.query(
        `INSERT INTO users (company_id, userId, email, username, password, role, admin)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          companyId,
          user.email,
          user.username,
          user.password,
          user.role,
          user.admin === "Yes" || user.admin === true ? 1 : 0,
        ]
      );
    });

    await Promise.all(userInsertPromises);

    await connection.commit();
    res.status(200).json({ message: "Company account created successfully." });
  } catch (error) {
    await connection.rollback();
    console.error("CreateCompanyAccount error:", error);
    res.status(500).json({ message: "Failed to create company account." });
  } finally {
    connection.release();
  }
});

app.post("/session", async (req, res) => {
  const { username, password, company } = req.body;

  try {
    const connection = await pool.getConnection();

    const [companyRows] = await connection.query(
      `SELECT id FROM companies WHERE name = ?`,
      [company]
    );

    if (companyRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Company not found" });
    }

    const company_id = companyRows[0].id;

    const [userRows] = await connection.query(
      `SELECT * FROM users WHERE username = ? AND password = ? AND company_id = ?`,
      [username, password, company_id]
    );

    connection.release();

    if (userRows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.json({ response: userRows[0] });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

app.post("/sendUsers", async (req, res) => {
  const company_id = req.body.contextId;

  try {
    const [users] = await pool.query(
      `SELECT * FROM users WHERE company_id = ?`,
      [company_id]
    );
    res.status(200).json(users);
  } catch (err) {
    console.error("sendUsers error:", err);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

app.post("/sendShift", async (req, res) => {
  const { contextId: company_id, newShift } = req.body;

  try {
    const { user_id, schedule_name, date, start, end, break_duration, description } = newShift;

    await pool.query(
      `INSERT INTO shifts (company_id, schedule_name, user_id, date, start, end, break_duration, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [company_id, schedule_name, user_id, date, start, end, break_duration, description]
    );

    const [companyShifts] = await pool.query(
      `SELECT * FROM shifts WHERE company_id = ?`,
      [company_id]
    );

    res.json({ companyShifts });
  } catch (err) {
    console.error("sendShift error:", err);
    res.status(500).json({ error: "Failed to save shift." });
  }
});

app.post("/getShifts", async (req, res) => {
  const { contextId: company_id } = req.body;

  try {
    const [companyShifts] = await pool.query(
      `SELECT * FROM shifts WHERE company_id = ?`,
      [company_id]
    );
    res.json({ companyShifts });
  } catch (err) {
    console.error("getShifts error:", err);
    res.status(500).json({ error: "Failed to fetch shifts." });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
