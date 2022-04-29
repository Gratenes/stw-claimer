import { CommandInteraction } from "discord.js";

const intro = (interaction:CommandInteraction) => {
  interaction.reply({
    embeds: [
      {
        'title': 'Welcome to the stw bot',
        'description': `This bot is a bot that can be used to claim stw rewards from the daily stw gifts.\n\nTo claim a reward, use the command 
        \`/claimreward\` with the following options:\n\n\`/claimreward 'authcode'\`\n\nThe auth code can be found by going [here](https://www.epicgames.com/id/logout?redirectUrl=https%3A%2F%2Fwww.epicgames.com%2Fid%2Flogin%3FredirectUrl%3Dhttps%253A%252F%252Fwww.epicgames.com%252Fid%252Fapi%252Fredirect%253FclientId%253Dec684b8c687f479fadea3cb2ad83f5c6%2526responseType%253Dcode).`,
      }
    ]
  });
}

export default intro