const axios = require('axios')
const yts = require('yt-search')
exports.run = {
   usage: ['play'],
   hidden: ['lagu', 'song'],
   use: 'query',
   category: 'downloader',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'lathi'), m)
         client.sendReact(m.chat, '🕒', m.key)
         let results = await yts(text)
  //let video = results.videos[Math.floor(Math.random() * results.videos.length)]
  if (results.videos.length < 0) return client.reply(m.chat, '*Not found*', m)
  var randomIndex = getRandomIndex()
  let video = results.videos[randomIndex]
         const json = await Api.play(video.url)
         if (!json.status || !json.data.url) return client.reply(m.chat, global.status.fail, m)
         let caption = `乂  *Y T - P L A Y*\n\n`

            caption += `	◦  *Title* : ${json.title}\n`

            caption += `	◦  *Size* : ${json.data.size}\n`
            caption += `	◦  *Duration* : ${json.duration}\n`
            caption += `	◦  *Bitrate* : ${json.data.quality}\n\n`
            caption += global.footer
         let chSize = Func.sizeLimit(json.data.size, global.max_upload)

            if (chSize.oversize) return client.reply(m.chat, `💀 File size (${json.data.size}) exceeds the maximum limit, download it by yourself via this link : ${await (await scrap.shorten(json.data.url)).data.url}`, m)

            client.sendMessageModify(m.chat, caption, m, {
               largeThumb: true,
               thumbnail: await Func.fetchBuffer(json.thumbnail)
            }).then(async () => {
               client.sendFile(m.chat, json.data.url, json.data.filename, '', m)
            })
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}
function getRandomIndex() {
  return Math.floor(Math.random() * 10);
}