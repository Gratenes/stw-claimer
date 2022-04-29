import { Client, CommandInteraction, InteractionReplyOptions, MessagePayload } from 'discord.js';

const client = new Client({
  allowedMentions: {
    parse: ['everyone'],
  },
  intents: [],
});

client.on('ready', async () => {
  client.user?.setActivity('daily stw gifts', { type: 'WATCHING' });
  //client.guilds.cache.get('guildId').commands.set
  if (!client.application) return console.log('No application found');
  await client.application.commands.set([
    {
      'name': 'claimreward',
      'description': 'Claims a reward from the daily stw gifts',
      'options': [{
        'name': 'authcode',
        'type': 'STRING',
        'required': true,
        'description': 'The authorization code from the daily stw gifts',
      }]
    },
    {
      'name': 'intro',
      'description': 'Shows how to use claimreward',
      'options': [],
    }
  ]);
})

client.on('interactionCreate', async (i:any) => {
  const interaction = i as CommandInteraction;
  if(!i.isCommand) return;

  switch (interaction.commandName) {
    case 'claimreward':
      return import('./commands/claim').then((z) => z.default(interaction));
  
    case 'intro':
      return import('./commands/intro').then((z) => z.default(interaction));
  }
})

client.login("OTY5MDI1MTE5ODkwNTk5OTk2.YmnY-A.CyN_2pY7hBDNPbRlUyGUot22fN0");