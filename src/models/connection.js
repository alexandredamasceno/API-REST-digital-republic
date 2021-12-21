require('dotenv').config();
const { MongoClient } = require('mongodb');

const { MONGODB_URL } = process.env;
const { DB_NAME } = process.env;

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let db = null;

const connection = () =>
    (db
        ? Promise.resolve(db)
        : MongoClient.connect(MONGODB_URL, OPTIONS)
            .then((conn) => {
                db = conn.db(DB_NAME);
                return db;
            }));

module.exports = connection;
