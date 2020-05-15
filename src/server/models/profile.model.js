module.exports = class Profile {
    constructor(username){
        this.model = { 
            "_id" : username.toLowerCase(),
            "username" : username,
            // "gamemode" : gamemode, //todo
            "selected" : true, // selects this profile by default on creation
        }
    }
}