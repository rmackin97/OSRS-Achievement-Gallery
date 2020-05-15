"use strict";

const profile = require("../controllers/profile.server.controller");

module.exports = function(app){
    app.route("/profile/create").post(profile.create);

    app.route("/profile/delete/:username").get(profile.delete);
    app.route("/profile/edit/:username").get(profile.edit);
    app.route("/profile/switchProfile/:username").get(profile.switchProfile);
    app.route("/profile/getCurrentProfile").get(profile.getCurrentProfile);
    app.route("/profile/getAllProfiles").get(profile.getAllProfiles);
}

  // create profile
  // delete profile
  // edit profile (username only -- nothing else can change)
  // switch profile
  // display current profile info