var Discord = require('discord.js');
var auth = require('../.secure/auth.json');

const prefix = '.';
const calcDust = (level, special, isNew) => {
    var baseOwned = 100;
    var baseUnowned = 20000;
    var baseOwnedSpecial = 20000;
    var baseUnownedSpecial = 1000000;
  
    var modifiers = {
      good : 1,
      great: 0.8,
      ultra: 0.08,
      best: 0.04
    }
    var dustBase = 0;
      
    if(!special && !isNew){
      return baseOwned; // special case
    }
    
    if(!special && isNew){
      dustBase = baseUnowned
    }
    
    if(special && !isNew){
      dustBase = baseOwnedSpecial
    }
    
    if(special && isNew){
      dustBase = baseUnownedSpecial
    }
    
    return modifiers[level] * dustBase;
  }


// Initialize Discord Bot
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "ping"){
        message.channel.send("pong!");
    }
    
    if(command === "dust"){
        // get the args
        let friend = args[0];
        let special = args[1] == "yes";
        let isNew = args[2] == "yes";
        
        var dust = calcDust(friend, special, isNew)
        message.channel.send("Dust calc... " + dust);
    }
  }
});


client.login(auth.token);