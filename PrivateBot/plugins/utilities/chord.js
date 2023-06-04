exports.run = {
   usage: ['chord'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'lathi'), m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Api.chord(text)
         if (json.result === 'error') {
           client.reply(m.chat, global.status.fail, m)
         } else {
         let k = ' • Title: ' +json.result.title +'\n'
         k += ' • Created: ' +json.result.created +'\n'
         k += ' • Chord:\n\n' +json.result.chord +'\n\n'
         k += global.footer
         client.reply(m.chat, k, m)
         }
      } catch {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   restrict: true
}