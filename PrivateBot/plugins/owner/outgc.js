exports.run = {
  usage: ["outgc"],
  hidden: ["out"],
  category: "owner",
  async: async (m, { client, args }) => {
    try {
      if (args[0]) {
        await Func.delay(2000);
        await client.sendMessage(args[0] + "@g.us", {
          text: "*Never add this bot to a group without permission from the owner!!😡*\n\n*From now on, the bot will leave this group in 5 seconds*",
        });
        await Func.delay(5000);
        await client.groupLeave(args[0] + "@g.us");
        await client.reply(m.sender, "Success out of the kidnapping group", m);
      } else {
        await client.sendMessage(m.chat, {
          text: "*See you!! the bot will exit within 5 seconds*",
        });
        await Func.delay(5000);
        await client.groupLeave(m.chat);
      }
    } catch (e) {
      client.reply(m.chat, "error" + e, m);
    }
  },
  owner: true,
};
