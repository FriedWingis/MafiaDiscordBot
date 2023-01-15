function loadEvents(client) {
  const fs = require("fs");

  const folders = fs.readdirSync("./src/events");
  for (const folder of folders) {
    const files = fs
      .readdirSync(`./src/events/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const event = require(`../events/${folder}/${file}`);

      if (event.rest) {
        if (event.once)
          client.rest.once(event.name, (...args) =>
            event.execute(...args, client)
          );
        else
          client.rest.on(event.name, (...args) =>
            event.execute(...args, client)
          );
      } else {
        if (event.once)
          client.once(event.name, (...args) => event.execute(...args, client));
        else client.on(event.name, (...args) => event.execute(...args, client));
      }

      global.events.push(file);
      log(`Successfully loaded event ${file}`);

      continue;
    }
  }
}

function log(what) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] [INFO-LOG] ${what}`);
}

module.exports = { loadEvents };
