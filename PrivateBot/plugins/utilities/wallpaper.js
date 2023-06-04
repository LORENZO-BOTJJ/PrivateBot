exports.run = {
   usage: ['wallpaper'],
   hidden: ['wp'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, `panda`), m)
         client.sendReact(m.chat, '🕒', m.key)
         for (let i = 0; i < 5; i++) {
         let old = new Date()
         let json = await Api.wallpaper(text)
            client.sendFile(m.chat, json, 'ko.jpg', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
            await Func.delay(2500)
         }
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   restrict: true,
   cache: true,
   limit: true
}