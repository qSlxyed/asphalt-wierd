const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const fetch = require('node-fetch');  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ],
});

bot.login(process.env.BOT_TOKEN);

app.use(express.static('public'));  


app.get('/stats', async (req, res) => {
  const guilds = bot.guilds.cache.size;
  const onlineMembers = bot.guilds.cache
    .reduce((total, guild) => 
      total + guild.members.cache.filter(member => member.presence?.status === 'online').size, 
      0
    );

  res.json({
    servers: guilds,
    onlineMembers: onlineMembers,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


bot.on('ready', () => {
  console.log(`Bot is ready and logged in as ${bot.user.tag}`);
});


async function fetchBotStats() {
  try {
    const response = await fetch('/stats');  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    document.getElementById('servers').innerText = data.servers;  
    document.getElementById('online').innerText = data.onlineMembers;  
  } catch (error) {
    console.error('Error fetching bot stats:', error);
    document.getElementById('servers').innerText = 'Error loading data';
    document.getElementById('online').innerText = 'Error loading data';
  }
}


fetchBotStats();
