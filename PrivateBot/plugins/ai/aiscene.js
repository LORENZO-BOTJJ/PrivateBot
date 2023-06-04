exports.run = {
   usage: ['aiscene'],
   hidden: ['scene', 'variation', 'variasi'],
   use: 'reply photo',
   category: 'ai',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
            let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
            let q = m.quoted ? m.quoted.message[type] : m.msg
            if (/image/.test(type)) {
           	client.sendReact(m.chat, '🕒', m.key)
               let img = await client.downloadMediaMessage(q)
               let image = await scrap.uploadImageV2(img)
               let json = await Api.aiscene(image.data.url)
               try {
               client.sendFile(m.chat, json, 'rot.jpg', '', m)
               } catch (e) {
                 m.reply('*The feature is currently limited, please try again in a few moments.*')
               }
            } else client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
         } else {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m)
            if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
            client.sendReact(m.chat, '🕒', m.key)
            let img = await q.download()
            let image = await scrap.uploadImageV2(img)
            let json = await Api.aiscene(image.data.url)
            try {
            client.sendFile(m.chat, json, 'yaah.jpg', '', m)
            } catch (e) {
              m.reply('*The feature is currently limited, please try again in a few moments.*')
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   premium: true
}