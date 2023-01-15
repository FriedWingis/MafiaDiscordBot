const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const { handleLogs } = require("./handlers/logsHandler");
const { loadEvents } = require("./handlers/eventHandler");
const { loadCommands } = require("./handlers/commandHandler");

global.config = require("./config.json");
global.commands = [];
global.events = [];

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

client.commands = new Collection();

client.login(config.token).then(() => {
  handleLogs(client);
  loadCommands(client);
  loadEvents(client);
});
