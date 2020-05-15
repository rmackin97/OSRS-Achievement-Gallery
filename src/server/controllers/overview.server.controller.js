"use strict";

const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));
const db = new PouchDB("http://localhost:5984/overview");

const { hiscores } = require("osrs-json-api");

exports.getSKills = function(req, res){
    const username = req.params.username;

    db.get(username.toLowerCase()).then(result => {
        res.send(result["skills"]);
    }).catch(err => res.status(500).send(err));
}

exports.getBosses = function(req, res){
    const username = req.params.username;

    db.get(username.toLowerCase()).then(result => {
        res.send(result["bosses"]);
    }).catch(err => res.status(500).send(err));
}

exports.getClues = function(req, res){
    const username = req.params.username;

    db.get(username.toLowerCase()).then(result => {
        res.send(result["clues"]);
    }).catch(err => res.status(500).send(err));
}

//todo getActivityScore -- 


// TODO update profile (consider what happens if the user renames their OSRS profile -- then the look up might fail)
// exports.updateProfile = function(req, res){
//     const username = req.body["username"];

//     hiscores.getPlayer(username).then(result => {
//         //todo
//     }).catch(err => res.status(500).send(err));
// }


