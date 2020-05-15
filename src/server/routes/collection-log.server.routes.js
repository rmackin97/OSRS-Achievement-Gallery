"use strict";

const collectionLog = require("../controllers/collection-log.server.controller");

// TODO specify username

module.exports = function(app){
    app.route("/:username/collection-log/getLogs/:category").get(collectionLog.getLogs);
    app.route("/:username/collection-log/getStats").get(collectionLog.getStats);
    app.route("/:username/collection-log/getRecentUniques").get(collectionLog.getRecentUniques);

    app.route("/:username/collection-log/updateLogs").post(collectionLog.updateLogs);
}