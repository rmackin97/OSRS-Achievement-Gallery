"use strict";

const profileOverview = require("../controllers/overview.server.controller");

module.exports = function(app){
    app.route("/:username/overview/getSkills").get(profileOverview.getSKills);
    app.route("/:username/overview/getBosses").get(profileOverview.getBosses);
    app.route("/:username/overview/getClues").get(profileOverview.getClues);

}