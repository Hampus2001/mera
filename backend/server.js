import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Starta servern
app.listen(PORT, () => {
  console.log(`Bankens backend körs på http://localhost:${PORT}`);
});

//updatera users och pusha till usersData
const usersData = [];
//updatera shifts och pusha till scheduleData
const scheduleData = [];
//updatera time och pusha till userTimeData
const userTimeData = [];
//updatera companies och pusha till companiesData
const companiesData = [];

// functions

app.post("/addEmployee", (req, res) => {
  const data = req.body;

  //Admin creates company account and admin user
  if (data.company) {
    //generate company id
    const company = {
      company_id: Date.now(),
      company_name: data.company,
      company_setting: "",
    };
    companiesData.push(company);

    let adminUsers = {
      company_id: company.company_id,
      id: usersData.length + 100,
      email: data.email,
      username: data.username,
      password: data.password,
      role: data.role,
      admin: data.admin,
    };
    //add admin to all users array
    usersData.push(adminUsers);

    res.json({
      company_id: company.company_id,
    });
  }
  //Admin adds employees
  else {
    let users = {
      company_id: data.company_id,
      id: usersData.length + 100,
      email: data.email,
      role: data.role,
      username: data.username,
      password: data.password,
      admin: data.admin,
    };
    //add new user to all users array
    usersData.push(users);

    let timeData = {
      user_id: users.id,
      available: data.time,
      break_left: 0,
      abscense: 0,
      worked_hours: 0,
    };

    //add new time object to time array
    userTimeData.push(timeData);

    res.json({
      usersData,
      userTimeData,
    });
  }
});
