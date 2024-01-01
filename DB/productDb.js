var mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongodbUrl = process.env.MONGO_URL_PRODUCT
mongoose.createConnection(mongodbUrl);
module.exports = mongoose;