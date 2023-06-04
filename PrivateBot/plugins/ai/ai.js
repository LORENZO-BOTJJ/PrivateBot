exports.run = {
   usage: ['ai'],
   hidden: ['openai', 'chatgpt'],
   use: 'text',
   category: 'ai',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'Is Rendang Authentic Indonesian Food?'), m)
         client.sendReact(m.chat, '🕒', m.key)
         let message = await Api.ai(encodeURIComponent(text))
         let nowm = message.result.replace('_powered by: https://xznsenpai.xyz_', '*_Powered By: 𝙇𝙊𝙍𝙀𝙉𝙕𝙊*')
         client.reply(m.chat, nowm, m)
      } catch (e) {
         client.reply(m.chat, global.status.error+'\n\n' +e, m)
         console.log(e)
      }
   },
   error: false
}