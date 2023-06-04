const axios = require('axios')
const fetch = require('node-fetch')
exports.run = {
   usage: ['art'],
   use: 'query',
   category: 'ai',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, `panda`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         let json = await Api.diffusion(encodeURIComponent(text))
         try {
            client.sendFile(m.chat, json, 'dalle.png', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
         } catch (e) {
           m.reply('busuk')
         }
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true
}