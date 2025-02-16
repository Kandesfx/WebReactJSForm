require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Kết nối MongoDB thành công"))
.catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

// Tạo Schema cho dữ liệu form
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  gender: String,
});

const User = mongoose.model("User", userSchema);

// API nhận dữ liệu từ frontend
app.post("/submit", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: "✅ Dữ liệu đã được lưu vào MongoDB!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Lỗi server", error });
  }
});

app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
