"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This would be an inclusive list of all the custom data types we would want to allow users to change a column to
const columnTypeEnum = [
    "Date",
    "String",
    "Multiple Select",
    "Reference",
    "AnyOtherCustomColumnType"
];

// Subdocument schema
// We would use this in the middleware to change primitive data types into our custom data types if necessary
const ColumnSchema = new Schema({
    columnName: { type: String, required: true },
    columnType: { type: String, enum: columnTypeEnum }
});

// Primary schema for the table model
// We're assuming there are appropriate User and Workspace models set up and including references to them here
const TableSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    tableName: { type: String, required: true },
    workspace: { type: Schema.Types.ObjectId, ref: "Workspace" },
    columns: [ColumnSchema]
});

module.exports = mongoose.model("Table", TableSchema);
