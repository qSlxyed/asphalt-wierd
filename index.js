const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');  


dotenv.config();


const bot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences],
});


bot.login(process.env.BOT_TOKEN);  


bot.on('ready', () => {
  console.log(`Bot is logged in as ${bot.user.tag}`);
});
