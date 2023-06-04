exports.run = {
  usage: ["tiktoksearch"],
  hidden: ["ttsearch", "searchtt"],
  use: "query",
  category: "downloader",
  async: async (m, { client, text, isPrefix, command }) => {
    try {
      if (!text)
        return client.reply(
          m.chat,
          Func.example(isPrefix, command, "AI Danger"),
          m
        );
      client.sendReact(m.chat, "🕒", m.key);
      const json = await Api.ttsearch(encodeURIComponent(text));
      if (json.length > 0) {
        for (let i in json) {
          let caption = `乂  *T T - S E A R C H*\n\n`;
          caption += `	◦  *Title* : ${json[i].title}\n`;
          caption += `	◦  *Author* : ${json[i].author.unique_id}\n`;
          caption += `	◦  *Duration* : ${json[i].duration}\n`;
          caption += `	◦  *view* : ${json[i].play_count}\n\n`;
          caption += global.footer;
          await Func.delay(2500);
          client.sendFile(
            m.chat,
            json[i].play,
            json[i].title + ".mp4",
            caption,
            m
          );
        }
      } else {
        client.reply(m.chat, global.status.fail, m);
      }
    } catch {
      client.reply(m.chat, "error", m);
    }
  },
  limit: true,
};
