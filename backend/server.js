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

let companies = {
  id: 30293,
  name: "Hemköp",
  design_setting: "SOFT_VANILLA",
};

let users = {
  id: 101,
  company_id: 30293,
  email: "test@gmail.com",
  username: "joe doe",
  password: "hidden",
  role: "kassa",
  admin: true,
};

let time = {
  id: 101,
  week_1: 40,
  week_2: 38,
  week_3: 30,
  week_4: 36,
  break_left: 0.24,
  abscense: 0,
  availabilty: 5,
};

let roles = {
  company_id: 30293,
  role_1: "kassa",
  role_2: "manager",
  role_3: "färsk",
  role_4: "kollo",
  role_5: "frukt",
  role_6: "fryst",
  role_7: "mejeri",
  role_8: "jour",
};

let shifts = {
  id: 1,
  schedule_name: "myproject",
  user_id: 101,
  date: "23/04/25",
  start: 6,
  end: 15,
  break: 1,
  desciptions: "frukt och grönt",
};

//updatera users och pusha till usersData
const usersData = [];
//updatera shifts och pusha till scheduleData
const scheduleData = [];
//updatera time och pusha till userTimeData
const userTimeData = [];
//updatera companies och pusha till companiesData
const companiesData = [];
