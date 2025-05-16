import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: "ec2-13-48-30-37.eu-north-1.compute.amazonaws.com",   // Change this to your EC2 public IP if remote
  user: "admin",
  password: "admin",
  database: "mera-db",
  port: 3307,          // inside container MySQL port, mapped to 3307 locally, so keep 3306 here
});

app.get("/dbtest", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS currentTime");
    res.json({ currentTime: rows[0].currentTime });
  } catch (err) {
    console.error("DB query error:", err);
    res.status(500).json({ error: "DB connection failed", details: err.message });
  }
});

app.get("/dbtest2", async (req, res) => {
  try {
    res.json({message:"hej"});
  } catch (err) {
    console.error("DB query error:", err);
    res.status(500).json({ error: "DB connection failed", details: err.message });
  }
});

app.post("/createCompanyAccount", async (req, res) => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const { users, companies, roles } = req.body;

    // 1. Insert into companies
    const company = Array.isArray(companies) ? companies[0] : companies;

    const [companyResult] = await connection.query(
      `INSERT INTO companies (name, design_setting) VALUES (?, ?)`,
      [company.name, company.design_setting]
    );
    const companyId = companyResult.insertId;

    // 2. Insert roles 
    for (const role of roles) {
      await connection.query(
        `INSERT INTO roles (company_id, role_name) VALUES (?, ?)`,
        [companyId, role]
      );
    }

    // 3. Insert users and their time data
    const userInsertPromises = users.map(async (user) => {
      const [userResult] = await connection.query(
        `INSERT INTO users (company_id, email, username, password, role, admin)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          companyId,
          user.email,
          user.username,
          user.password, // Hash before prod use
          user.role,
          user.admin === "Yes" || user.admin === true ? 1 : 0 // Convert to boolean
        ]
      );

      const userId = userResult.insertId;

      await connection.query(
        `INSERT INTO time (id, week_1, week_2, week_3, week_4, break_left, absence, availability)
         VALUES (?, 0, 0, 0, 0, 0, 0, ?)`,
        [userId, user.hours || 0]
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

//Login
app.post("/session", async (req, res) => {
  const { username, password, company } = req.body;

  try {
    const connection = await pool.getConnection();

    // 1. Get company_id from company name
    const [companyRows] = await connection.query(
      `SELECT id FROM companies WHERE name = ?`,
      [company]
    );

    if (companyRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: "Company not found" });
    }

    const company_id = companyRows[0].id;

    // 2. Get user by username, password and company_id
    const [userRows] = await connection.query(
      `SELECT * FROM users WHERE username = ? AND password = ? AND company_id = ?`,
      [username, password, company_id]
    );

    connection.release();

    if (userRows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // 3. Send the user back
    res.json({ response: userRows[0] });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

//Create schedule
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

//send Shifts
app.post("/sendShift", async (req, res) => {
  const { contextId: company_id, newShift } = req.body;

  try {
    const {
      user_id,
      schedule_name,
      date,
      start,
      end,
      break_duration,
      description
    } = newShift;

    await pool.query(
      `INSERT INTO shifts (company_id, schedule_name, user_id, date, start, end, break_duration, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [company_id, schedule_name, user_id, date, start, end, break_duration, description]
    );

    // Return all shifts for this company
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

//getShifts
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

// Starta servern
app.listen(PORT, () => {
  console.log(`Bankens backend körs på http://localhost:${PORT}`);
});
