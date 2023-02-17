const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
try {
  mongoose.connect(process.env.DB_URL, connectionParams);
  console.log("Connected to database ");
} catch (err) {
  console.log("Could not connect to database ");
}

const userDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  fullName: String,
  gender: String,
  caste: String,
  d_o_b: String,
  religion: String,
  blood_group: String,
  mother_tongue: String,
  sic: String,
  regd: String,
  mobile_number: String,
  faculty_advisor: String,
  f_a_mobile_number: String,
  home_contact_no: String,
  program: String,
  branch: String,
  branch_short: String,
  semester: String,
  group: Number,
  batch: String
});

const UserData = mongoose.model("UserData", userDataSchema);

app.get("/api/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const userData = await UserData.findOne({ email: email });
    res.status(200).send(userData);
    console.log(userData);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
