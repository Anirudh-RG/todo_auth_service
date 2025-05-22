const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const { createUserTableIfNotExists } = require('./models/userModel');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get('/auth/health',(req,res)=>{
  res.status(200).json({message:"Auth Service is up and running"});
})
app.use('/auth', authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log("checking for table");

  await createUserTableIfNotExists();
  console.log("done checking for table");
  console.log(`Auth Service running on port ${PORT}`);
});
