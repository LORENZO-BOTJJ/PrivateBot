exports.run = {



   usage: ['tourl'],

   use: 'reply photo/video',
   category: 'tool',
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
            if (/image|video/.test(type)) {
           	client.sendReact(m.chat, '🕒', m.key)
               let img = await client.downloadMediaMessage(q)
               let image = await scrap.uploadImageV2(img)
               m.reply(`✅ *Result* : ${image.data.url}`)
            } else client.reply(m.chat, Func.texted('bold', `🚩 Only for photo/video.`), m)
         } else {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Reply photo/video.`), m)
            if (!/image\/(jpe?g|png)|video\/mp4/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Only for photo/video.`), m)
            client.sendReact(m.chat, '🕒', m.key)
            let img = await q.download()
            let image = await scrap.uploadImageV2(img)
            m.reply(`✅ *Result* : ${image.data.url}`)
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true
}