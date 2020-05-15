"use strict";

const { hiscores } = require("osrs-json-api");

// database
const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));
const db = new PouchDB("http://localhost:5984/overview");

// buildProfileData("R3ltl0rd");

module.exports = async function buildProfileData(username){
    try {
        const data = await hiscores.getPlayer(username, "main"); //todo gamemode
        delete data["bh"];
        delete data["lms"];

        data["_id"] = username.toLowerCase();
        
        // db.put(data).then(result => {
        //     console.log(result);
        //     return true;
        // }).catch(err => {
        //     console.log(err);
        //     console.log("here");
        //     return false;
        // });

        await db.put(data);
        return true;

        // console.log(data);
        // console.log("didnt write to db tho");

        // return true;
    } catch (error) {
        console.log("player doesn't exist");

        return false;
    }
}