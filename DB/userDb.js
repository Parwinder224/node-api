var mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoUserUrl = process.env.MONGO_URL_USER
mongoose.connect(mongoUserUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('DB connection successfully');
    })
    .catch(err => console.log(err));
module.exports = mongoose;