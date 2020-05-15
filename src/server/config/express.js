"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// app config here
module.exports = function(){
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // app routes
    require("../routes/profile.server.routes") (app);
    require("../routes/overview.server.routes") (app);
    require("../routes/collection-log.server.routes") (app);

    return app;
}