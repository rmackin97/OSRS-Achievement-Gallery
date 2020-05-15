"use strict";

// database
const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));
const db = new PouchDB("http://localhost:5984/profile");

// model
const Profile= require("../models/profile.model");

// data services
const buildCollectionLogData = require("../config/collection-log.data");
const buildProfileData = require("../config/overview.data");

exports.create = function(req, res){
    const username = req.body.username;
    const profile = new Profile(username).model;

    db.get(username.toLowerCase()).then(doc => {
        // profile already exists
        res.send({"result": false}); 
    }).catch(async err => {
        if(err.status != 404) res.status(500).send(error);
        try {
            const result = await buildProfileData(username);
            console.log("result is "+result);

            if(result){
                await buildCollectionLogData(username);

                const docs = await db.allDocs({include_docs: true});
                docs["rows"].forEach(async doc => {
                    doc["doc"].selected = false;
                    await db.put(doc);
                });

                await db.put(profile);

                res.send({"result": true});
            } else {
                // invalid profile
                res.send({"result": false}); 
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

exports.delete = function(req, res){

}

exports.edit = function(req, res){

}

exports.switchProfile = function(req, res){

}

exports.getCurrentProfile = function(req, res){
    db.allDocs({
        include_docs: true
    }).then(docs => {
        let selectedProfile = "";

        docs["rows"].forEach(doc => {
            if(doc["doc"].selected){
                selectedProfile = doc["doc"].username;
            }
        })

        res.send({"selectedProfile": selectedProfile});
    }).catch(err => res.status(500).send(err));
}

exports.getAllProfiles = function(req, res){
    db.allDocs({
        include_docs: true
    }).then(docs => {
        let profiles = [];

        // todo how to order returned profiles (some internal ordering attribute?)
        // definitely going to use a find() and sort on date
        // so add a datelastviewed to the profile model and sort on that
        docs["rows"].forEach(doc => {
            profiles.unshift(doc["doc"].username);
        })

        res.send(profiles);
    }).catch(err => res.status(500).send(err));
}