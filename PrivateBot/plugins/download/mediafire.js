const { decode } = require('html-entities')
exports.run = {
   usage: ['mediafire'],
   hidden: ['mf'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://www.mediafire.com/file/1fqjqg7e8e2v3ao/YOWA.v8.87_By.SamMods.apk/file'), m)
         if (!args[0].match(/(https:\/\/www.mediafire.com\/)/gi)) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Api.mediafire(args[0])
         const errorStatus = [404, 500, 403, 400, 401, 503, 'false', 402, 504]; if (errorStatus.includes(json.status))  return client.reply(m.chat, Func.jsonFormat(json), m)
         let text = `乂  *M E D I A F I R E*\n\n`
         text += '	◦  *Name* : ' + unescape(decode(json.result.filename)) + '\n'
         text += '	◦  *Size* : ' + json.result.filesize + '\n'
         text += '	◦  *Extension* : ' + json.result.filetype + '\n'
         text += '	◦  *Uploaded* : ' + json.result.uploaded + '\n\n'
         text += global.footer
         let chSize = Func.sizeLimit(json.result.filesize, global.max_upload)
         if (chSize.oversize) return client.reply(m.chat, `💀 File size (${json.result.filesize}) exceeds the maximum limit, download it by yourself via this link : ${await (await scrap.shorten(json.result.link)).data.url}`, m)
         client.sendMessageModify(m.chat, text, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/fcf56d646aa059af84126.jpg')
         }).then(async () => {
           let buff = await Func.fetchBuffer(json.result.link)
           client.sendFile(m.chat, buff, json.result.filename, '', m)
         })
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}