import { CommandInteraction, InteractionReplyOptions } from "discord.js";
import fetch from "node-fetch";

const intro = async (interaction: CommandInteraction) => {
  const authCode = interaction.options.get('authcode');
  if (!authCode?.value || !authCode) return interaction.reply('You must provide an auth code');
  if (typeof authCode.value !== "string") return interaction.reply('You must provide a string auth code');
  if (authCode.value.length !== 32) return interaction.reply('You must provide a 32 character auth code');

  const login = await fetch('https://worker-typescript-template.gratenes.workers.dev/api/stwlogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${authCode.value}`
    }
  }
  );
  const loginData = await login.json();

  if (login.status !== 200) {
    console.log(loginData);
    if (loginData.errorMesssage) return interaction.reply(loginData.errorMesssage);
    return interaction.reply('Invalid auth code');
  };

  let finalMessage: InteractionReplyOptions = {
    "content": null,
    "embeds": [
      {
        "title": "as",
        "description": "asd",
        "color": 16777215
      }
    ],
    "attachments": []
  };

  if (!finalMessage.embeds) return interaction.reply('Could not claim reward');
  if (loginData.daysLoggedIn) {
    finalMessage.embeds[0].title = 'Successfully claimed reward!';
  }

  finalMessage.embeds[0].description = `You have logged in for **${loginData.daysLoggedIn}** days!`;
  finalMessage.embeds[0].description += '\n';
  finalMessage.embeds[0].description += '\n';

  /* The items length are the rewards claimed, if it is 0 the reward has already been claimed or the user does not have any more rewards (this is after 365 days i think) */
  if (loginData.length > 0) finalMessage.embeds[0].description += `Todays reward is **${loginData.claimedItem || 'Not supposed to see this....'}** `;
  else finalMessage.embeds[0].description += 'The reward has already been claimed!';

  return interaction.reply(finalMessage);
};

export default intro;