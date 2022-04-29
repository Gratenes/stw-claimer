import { CommandInteraction, InteractionReplyOptions } from "discord.js";
import { Response } from "node-fetch";
import Fortnite from "../fnApi";
import itmes from "../random/items";

const intro = async (interaction: CommandInteraction) => {
  const authCode = interaction.options.get('authcode');
  if (!authCode?.value || !authCode) return interaction.reply('You must provide an auth code');
  if (typeof authCode.value !== "string") return interaction.reply('You must provide a string auth code');
  if (authCode.value.length !== 32) return interaction.reply('You must provide a 32 character auth code');

  //interaction.reply('Claiming reward...');
  const f = new Fortnite();
  const token = await f.getToken(authCode.value) as Response;

  if (token.status !== 200) return interaction.reply('Could not get token for auth code');
  const tokenData = await token.json(); //as publicAccount;
  if (!tokenData.access_token) return interaction.reply('Could not get token for auth code');
  if (!tokenData.account_id) return interaction.reply('Could not get account id for auth code');

  const claim = await f.claimReward(tokenData.access_token, tokenData.account_id) as Response;
  if (claim.status !== 200) return interaction.reply('Could not claim reward');
  const claimData = await claim.json(); //as publicService;

  // Above is the claiming of the reward and below is the reply (not usefull)

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
  if (claimData.notifications) {
    finalMessage.embeds[0].title = 'Successfully claimed reward!';
  }

  const streak = new String(claimData.notifications[0].daysLoggedIn).toString();
  finalMessage.embeds[0].description = `You have logged in for **${streak}** days!`;
  finalMessage.embeds[0].description += '\n';
  finalMessage.embeds[0].description += '\n';

  /* The items length are the rewards claimed, if it is 0 the reward has already been claimed or the user does not have any more rewards (this is after 365 days i think) */
  // @ts-ignore stupid ts
  if (claimData.notifications[0].items.length > 0) finalMessage.embeds[0].description += `Todays reward is **${itmes[streak] || 'Not supposed to see this....'}** `;
  else finalMessage.embeds[0].description += 'The reward has already been claimed!';
  
  return interaction.reply(finalMessage);
};

export default intro;