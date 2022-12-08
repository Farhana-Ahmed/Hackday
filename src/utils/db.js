const mongoose = require("mongoose");
const getDBconnection = () => {
    const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
    const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.qod9zfm.mongodb.net/myData?retryWrites=true&w=majority
`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Mongo Connected successfully");
});
}

module.exports.getDBconnection = getDBconnection;

