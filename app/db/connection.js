let mongoose = require('mongoose');

const mongoDBURL = process.env.PRODUCTION_MODE == true ? process.env.PROD_MONGO : process.env.STAG_MONGO;
mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection
    .once('open', () => {
        console.log('->Database connected 🍺🍺!');
    })
    .on('error', (error) => {
        console.log('->mongoConnection Error: ' + error);
    });
module.exports = mongoose;
