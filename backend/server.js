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
//DB for companyRoles
const companyRoles = [];

// functions

//* Create Company and Sign up
app.post("/createCompanyAccount", (req, res) => {
  const data = req.body;

  const users = data.users;
  const company = data.companies;
  const roles = data.roles;

  //Create id for all users
  for (let i = 0; i < users.length; i++) {
    users[i].id = usersData.length + 100 + i;
  }

  //Create time data for every user
  for (let i = 0; i < users.length; i++) {
    userTimeData.push({
      id: users[i].id,
      break_left: 0,
      abscense: 0,
      availability: users[i].hours,
    });
  }
  // Remove the `hours` property from each user
  for (let i = 0; i < users.length; i++) {
    delete users[i].hours;
  }

  // Create object and Add Company id to roles
  const rolesObject = { company_id: users[0].company_id, roles: [...roles] };

  //* Save data in backend variables
  usersData.push(users);
  companiesData.push(company);
  companyRoles.push(rolesObject);

  console.log(
    "users",
    usersData,
    "company",
    companiesData,
    "roles",
    companyRoles,
    "time",
    userTimeData
  );
});

//*Create schedule

app.post("/sendUsers", (req, res) => {
  let company_id = req.body.contextId; // Correct: Access `req.body` for the request payload
  console.log("Received company_id:", company_id);

  //Flatten data in users array
  const allUsers = usersData.flat();

  // Filter users with the same company_id
  const filtered = allUsers.filter((user) => user.company_id == company_id);

  // Send the filtered users back to client
  res.status(200).json(filtered);
});

app.post("/sendShift", (req, res) => {
  let data = req.body;

  let company_id = data.contextId;
  let newShift = data.newShift;

  scheduleData.push(newShift);

  let companyShifts = scheduleData.filter(
    (shift) => shift.company_id == company_id
  );
  console.log("all shifts", scheduleData);
  console.log("company shifts", companyShifts);
  res.json({ companyShifts });
});
