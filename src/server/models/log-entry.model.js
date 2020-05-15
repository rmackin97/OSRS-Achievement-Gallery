module.exports = class LogEntry {
    constructor(username, category, activity, item, image){
        this.entry = { 
            "_id": formatId(username, category.name, activity.name, item.name),
            "username": username,
            "category": {
                "name": category.name,
                "order": category.order
            },
            "activity": {
                "name": activity.name,
                "order": activity.order
            },
            "item": {
                "name": item.name,
                "obtained": item.obtained,
                "dateObtained": null
            },
            "image": {
                "src": image.src,
                "order": image.order
            }
        }
    }
}

function formatId(username, category, activity, item){
    return username+"-"+category+"-"+activity.replace(/ /g, "_").toLowerCase()+"-"+item.toLowerCase();
}