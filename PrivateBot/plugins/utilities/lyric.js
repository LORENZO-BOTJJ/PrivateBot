exports.run = {
   usage: ['lyric'],
   hidden: ['lirik'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'bad liar'), m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Api.lyric(text.trim())
         const errorStatus = [404, 500, 403, 400, 401, 503, 'false', 402, 504]; if (errorStatus.includes(json.status))  return client.reply(m.chat, global.status.fail, m)
         let teks = `Searched song lyrics: ${text}\n`
         teks += `Lyrics:\n\n`
         teks += json.result
         client.reply(m.chat, teks, m)
      } catch {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   restrict: true
}