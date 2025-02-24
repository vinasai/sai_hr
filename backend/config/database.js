const mongoose = require('mongoose');

const connectToDatabase = async () =>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
};

module.exports = connectToDatabase;