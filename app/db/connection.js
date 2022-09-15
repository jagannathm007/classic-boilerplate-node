let mongoose = require('mongoose');

const mongoDBURL = process.env.NODE_ENV != 'stagging' ? process.env.PROD_MONGO : process.env.STAG_MONGO;
mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection
    .once('open', () => {
        let serverType = process.env.NODE_ENV != 'stagging' ? 'Production' : 'Stagging';
        console.log(`->${serverType} database connected 🍺🍺!`);
    })
    .on('error', (error) => {
        console.log('->mongoConnection Error: ' + error);
    });
module.exports = mongoose;
