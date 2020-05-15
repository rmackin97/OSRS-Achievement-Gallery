"use strict";

const express = require("./config/express");
const app = express();

//todo export some sort of pouch.js congif initialization (publish databases and create indexes )
// PLUS the important one --- figure out how to start up pouchdb-server here too

app.listen("8000", () => console.log("Listening on port 8000."))