"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dbConnection = () => {
    mongoose
        .connect(process.env.DB_URI, {
        autoIndex: true,
    })
        .then((conn) => {
        console.log(`Database Connected: ${conn.connection.host}`);
    });
};
exports.default = dbConnection;
