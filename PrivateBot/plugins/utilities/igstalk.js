exports.run = {
   usage: ['igstalk'],
   use: 'username',
   category: 'utilities',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'hosico_cat'), m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Api.igstalk(args[0])
         const errorStatus = [404, 500, 403, 400, 401, 503, 'false', 402, 504]; if (errorStatus.includes(json.status))  return client.reply(m.chat, Func.texted('bold', `🚩 Account not found.`), m)
         let caption = `乂  *I G - S T A L K*\n\n`
         caption += `	◦  *Name* : ${json.result.fullname}\n`
         caption += `	◦  *Username* : ${json.result.username}\n`
         caption += `	◦  *Posts* : ${json.result.posts}\n`
         caption += `	◦  *Followers* : ${json.result.followers}\n`
         caption += `	◦  *Followings* : ${json.result.following}\n`
         caption += `	◦  *Bio* : ${json.result.bio}\n\n`
         caption += global.footer
         client.sendMessageModify(m.chat, caption, m, {
            ads: false,
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.result.photo_profile)
         })
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}