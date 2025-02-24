const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();

const { logger } = require("./middleware/logEvents");
const errorHandler = require('./middleware/errorHandler')
const connectToDatabase = require("./config/database");
const jobRoutes = require("./routes/jobRoute")
const authRoutes = require('./routes/authRoutes')

dotenv.config();
const PORT = process.env.PORT;

app.use(logger);
app.use(express.json());

//Mongodb connection
connectToDatabase();

// Configure cors
const corsOptions = {
    origin: "http://localhost:5174", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true, 
  };
  
app.use(cors(corsOptions));
app.use("/api/job", jobRoutes)
app.use("/api/auth", authRoutes);
app.use('/contact', require('./routes/contactus'));

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
