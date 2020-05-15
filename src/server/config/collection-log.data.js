"use strict";
/**
 * Builds initial collection log data for a user* TODO
 */

const fs = require("fs");
const path = require("path");

// web scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

// database
const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));
const db = new PouchDB("http://localhost:5984/collection-log");

//models
const LogEntry = require("../models/log-entry.model");

const baseUrl = "https://oldschool.runescape.wiki";

// buildCollectionLogData("R3ltl0rd");

module.exports = async function buildCollectionLogData(username){
    const { data } = await axios.get("https://oldschool.runescape.wiki/w/Collection_log");
    const $ = cheerio.load(data);

    let logEntries = [];
    let categoryOrder = 0;

    // gets each collection log category
    $("h2 span[class='mw-headline']").each((i, category) => {
        categoryOrder++;

        let currCategory = $(category).text();
        let activityOrder = 0;

        if(currCategory == "Changes"){
            return;
        }
        //console.log("Category ------------------------------> "+currCategory);

        // gets each collection log activity
        $(category).parent("h2").nextAll("h3").filter((i, activity) => {
            if($(activity).prevAll("h2").children().first().text() == currCategory){
                return true;
            } else{
                return false;
            }
        }).each((i, activity) => {
            activityOrder++;

            let currActivity = $(activity).children().first().text();
            let imageOrder = 0;

            //console.log("-----> "+currActivity);

            // gets each collection log item (and image)
            let table = $(activity).nextAll("table").first();
            $(table).find("img").each((i, image) => {
                let item = $(image).attr("alt");

                // todo look inside this projects root folder at public/images/collection-log/<currCategory>/<currActivity>/<item>
                let imageSrc = baseUrl+$(image).attr("src");
                imageOrder++;

                // creates the new database document entry
                let logEntry = new LogEntry(
                    formatUsername(username), 
                    { "name": formatCategoryName(currCategory), "order": categoryOrder },
                    { "name": currActivity, "order": activityOrder }, 
                    { "name": formatItemName(item), "obtained": false },
                    { "src": imageSrc, "order": imageOrder }
                ).entry;
                logEntries.push(logEntry);
            })
         });
    });

    // writes all log entries into database
    db.bulkDocs(logEntries).then(result => {
        console.log(result);
    }).catch(err => {
        console.error(err);
    });

    // console.log(logEntries);
}

function formatUsername(username){
    return username.toLowerCase();
}

function formatCategoryName(category){
    return category.toLowerCase();
}

function formatItemName(item){
    let words = item.split(" ");
    for(let i = 0; i < words.length; i++){
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join("_").replace(".png", "");
}