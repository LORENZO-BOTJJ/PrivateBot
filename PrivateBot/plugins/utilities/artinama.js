exports.run = {
   usage: ['artinama'],
   hidden: ['nama'],
   use: 'name',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'megawati'), m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Api.nama(text)
         const errorStatus = [404, 500, 403, 400, 401, 503, 'false', 402, 504]; if (errorStatus.includes(json.status))  return client.reply(m.chat, global.status.fail, m)
         client.reply(m.chat, json.result, m)
      } catch {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   restrict: true
}