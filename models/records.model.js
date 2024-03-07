"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// We use the {strict: false} option here so that we can add properties to the documents that aren't included in the schema
// This keeps the fields we'll want to index and query at the root level of the document instead of nested inside a 'data' property 
const RecordSchema = new Schema({
    // Reference to the table the record belongs to
    table: { type: Schema.Types.ObjectId, ref: "Table" },
    // The row number assigned to the record. Responsible for the order when no sort is selected.
    // We should auto increment on document create. Users may change by drag/dropping in the UI.
    row: Number
}, {strict: false});

// We'll create a compound index on the table field and the row field for the initial lookup on a table
RecordSchema.index({ table: 1, row: 1});

module.exports = mongoose.model("Record", RecordSchema);
