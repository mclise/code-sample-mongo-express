"use strict";

const Records = require("../models/records.model");
const Tables = require("../models/tables.model");

// Use this route to get the table metadata and populate the column headers before the table data is fully loaded
// req.params.table = the database ID of the table requested
exports.getTableById = (req, res) => {
    Tables.findById(req.params.table)
        .exec(function(err, table) {
            if (err) {
                // Using a generic error code here
                return res.json(500, err);
            }
            // Return the table to the user
            return res.json(200, table);
        });
};

// Use this route to return all the data for the table
// Ideally we would pass an id of a "view" - another collection we'd have set up that would include any sorting or filtering rules we want to apply to the data returned
// req.params.table = the database ID of the table requested
exports.getTableData = (req, res) => {
    Records.find({table: req.params.table})
        // Row would be the default sort - we would change this line to allow for sorting by other properties
        .sort({ row: 1 })
        .exec(function(err, tableData) {
            if (err) {
                // Using a generic error code here
                return res.json(500, err);
            }
            // Return the table to the user
            return res.json(200, tableData);
        })
};
