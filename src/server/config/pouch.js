"use strict";

const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));

// database collections
const profileDB = new PouchDB("http://localhost:5984/profile");
const overviewDB = new PouchDB("http://localhost:5984/overview");
const collectionLogDB = new PouchDB("http://localhost:5984/collection-log");

PouchDB.on("created", db => {
    console.log("Connected to "+db);

    buildDatabases(db);

    // profileDB.destroy().then(res => console.log(res)).catch(err => console.log(err));
    // overviewDB.destroy().then(res => console.log(res)).catch(err => console.log(err));
    // collectionLogDB.destroy().then(res => console.log(res)).catch(err => console.log(err));
});

function buildDatabases(name){
    console.log("Building "+name+"...");

    if(name == "http://localhost:5984/profile"){
        buildProfileDB();
    } else if(name == "http://localhost:5984/overview") {
        buildOverviewDB();
    } else if(name == "http://localhost:5984/collection-log"){
        buildCollectionLogDB();
    }
}

function destroyDB(name){

}



// publishes and creates indexes on the collection log database
async function buildCollectionLogDB() {
    try {
        let result = await collectionLogDB.info();
        await collectionLogDB.createIndex({
            index: {
                fields: ["username"],
                name: "username-index"
            }
        });
        await collectionLogDB.createIndex({
            index: {
                fields: ["category.name"],
                name: "category-name-index"
            }
        });
        await collectionLogDB.createIndex({
            index: {
                fields: ["category.order"],
                name: "category-order-index"
            }
        });
        await collectionLogDB.createIndex({
            index: {
                fields: ["activity.order"],
                name: "activity-order-index"
            }
        });
        await collectionLogDB.createIndex({
            index: {
                fields: ["item.name"],
                name: "item-name-index"
            }
        });
        await collectionLogDB.createIndex({
            index: {
                fields: ["item.dateObtained"],
                name: "item-dateObtained-index"
            }
        });

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// publishes and creates indexes on the profile hiscores database
async function buildOverviewDB() {
    try {
        let result = await overviewDB.info();

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

async function buildProfileDB(){
    try {
        let result = await profileDB.info();

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

