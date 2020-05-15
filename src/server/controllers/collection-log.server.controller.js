"use strict";

const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));
const db = new PouchDB("http://localhost:5984/collection-log");

exports.getLogs = function(req, res){
  const category = req.params.category;
  const username = req.params.username;

  // responds with all documents from the specified category
  db.find({
    selector: { 
      "username": username,
      "category.name": category, 
      "activity.order": { $gte: null } 
    },
    sort: ["activity.order"]
  }).then(result => {
    const data = result["docs"];
    // gets every activity for this category
    let activities = [];
    Object.values(data).forEach(entry => {
      if(!activities.includes(entry["activity"].name)){
        activities.push(entry["activity"].name);
      }
    });
    // groups all log entries that share the same activity
    let logs = {};
    activities.forEach(activity => {
      logs[activity] = {"entry": Object.values(data).filter(entry => {
        if(entry["activity"].name == activity){
          return true;
        } else{
          return false;
        }
      })};
    });
    // computes stats for every log
    activities.forEach(activity => {
      let total = 0;
      let obtained = 0;
      Object.values(data).forEach(entry => {
        if(entry["activity"].name == activity){
          total++;
          if(entry["item"].obtained){
            obtained++;
          }
        }
      });
      logs[activity]["stats"] = {
        "total": total, 
        "obtained": obtained,
        "completed": obtained == total ? true : false
      };
    });
    // todo somewhere in here ill have to ask the profile-overview database for
    // this activies kc (if applicatble -- logic inside profile-overview controller probs)
    // this is where I would use the CONSTANTS js file and search by all aliases of the 
    // activity name

    res.send(logs);
  }).catch(err => res.status(500).send(err));
}

// updates all logs containing the requested item
exports.updateLogs = function(req, res){
  const item = req.body.item;
  const username = req.params.username;;

  db.find({
    selector: { 
      "username": username,
      "item.name": item 
    }
  }).then(result => {
    // updates documents containing this item
    result["docs"].forEach(doc => {
        let obtained = !doc["item"].obtained;
        doc["item"].obtained = obtained;
        obtained ? doc["item"].dateObtained = Date.now() : doc["item"].dateObtained = null;
        db.put(doc);
    });

    res.send({"result": true});
  }).catch(err => res.status(500).send(err));
}

exports.getStats = function(req, res){
  const username = req.params.username;
  // responds with all documents from each category
  db.find({
    selector: { 
      "username": username,
      "category.name" : { $gte: null }, 
      "category.order": {$gte: null } 
    },
    sort: ["category.order"]
  }).then(result => {
    const data = result["docs"];
    // gets every category
    let categories = [];
    Object.values(data).forEach(entry => {
      if(!categories.includes(entry["category"].name)){
        categories.push(entry["category"].name);
      }
    });
    // computes stats for every category
    let stats = {};
    let overallTotal = 0;
    let overallObtained = 0;
    categories.forEach(category => {
      let total = 0;
      let obtained = 0;
      Object.values(data).forEach(entry => {
        if(entry["category"].name == category){
          total++;
          if(entry["item"].obtained){
            obtained++;
          }
        }
      });
      overallTotal += total;
      overallObtained += obtained;

      stats[category] = {
        "total": total, 
        "obtained": obtained,
        "completed": obtained/total * 100
      };
    });
    stats["all"] = {
      "total": overallTotal,
      "obtained": overallObtained,
      "completed": overallObtained/overallTotal * 100
    }

    res.send(stats);
  }).catch(err => res.status(500).send(err));
}

exports.getRecentUniques = function(req, res) {
  const username = req.params.username;

  db.find({
    selector: { 
      "username": username,
      "item.dateObtained" : { $gt: null }
    },
    sort: [{"item.dateObtained": "desc"}]
  }).then(result => {
    const data = result["docs"];
    let count = 0;
    let items = {};
    Object.values(data).forEach(entry => {
      if(!items.hasOwnProperty(entry["item"].name) && count < 5){
        count++;
        items[entry["item"].name] = entry;
      }
    });

    res.send(items);
  }).catch(err => res.status(500).send(err));
}