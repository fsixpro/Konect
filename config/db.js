const mongoose = require('mongoose');

const db = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('mongo db running');
};

module.exports = db;
