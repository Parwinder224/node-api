var mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongodbUrl = process.env.MONGO_URL_PRODUCT
console.log("test product db",mongodbUrl)

mongoose.createConnection(mongodbUrl);
module.exports = mongoose;