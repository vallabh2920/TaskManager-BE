const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5002", "http://192.168.1.34:5002"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// MongoDB Connection
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://vallabhingle2920:ANMmus5XPnfc6PTm@cluster0.ryo7c.mongodb.net/taskManagerDB?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, {
    dbName: "test", // 👈 Ensures the database is used
    serverSelectionTimeoutMS: 5000, // Timeout if MongoDB is unreachable
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); // Exit the process on failure
  });

// Event listeners for Mongoose connection
mongoose.connection.on("error", (err) =>
  console.error("❌ MongoDB Error:", err)
);
mongoose.connection.on("disconnected", () =>
  console.warn("⚠️ MongoDB Disconnected!")
);

// Routes
const authRouter = require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

// Server Start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// const express = require("express");
// require("dotenv").config();
// const { connectDB } = require("./config/db");

// const app = express();

// // Middleware
// app.use(express.json()); // Middleware to parse JSON

// // Routes (Optimized placement)
// app.use("/auth", require("./routes/authRoutes"));
// app.use("/tasks", require("./routes/taskRoutes"));

// // Port Configuration
// const PORT = process.env.PORT || 5000;

// // Start the server after DB connection
// connectDB()
//   .then(() => {
//     app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error("DB Connection Error:", err));
