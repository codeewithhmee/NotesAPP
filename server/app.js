const express  = require("express");
const cors     = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

//  Connect 
mongoose.connect("mongodb+srv://samirbhandari1231_db_user:YbVcsBkucnlcd5Yj@cluster0.6dlt86o.mongodb.net/noteDB")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("DB error:", err));

//  Models 
const User = mongoose.model("User", new mongoose.Schema({
  email:    String,
  password: String,
}));

const Note = mongoose.model("Note", new mongoose.Schema({
  title:   String,
  content: String,
  author:  String,
}));

//  Signup 
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.json({ success: false, message: "User already exists" });

  const user = await User.create({ email, password });
  res.json({ success: true, user });
});

//  Login 
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "User not found" });
  if (user.password !== password) return res.json({ success: false, message: "Wrong password" });

  res.json({
    success: true,
    user: { id: user._id.toString(), email: user.email }
  });
});

//  Get Notes 
app.get("/api/getNotes/:id", async (req, res) => {
  const notes = await Note.find({ author: req.params.id });
  res.json(notes);
});

//  Add Note 
app.post("/api/addNote", async (req, res) => {
  const { title, content, author } = req.body;
  const note = await Note.create({ title, content, author });
  res.json({ success: true, note });
});

//  Delete Note 
app.post("/api/deleteNote", async (req, res) => {
  console.log(req.body)
  let id=req.body.e._id;
 await Note.findOneAndDelete({ _id: id});
  
});

//  Start Server 
app.listen(5000, () => console.log("Server running on http://localhost:5000"));