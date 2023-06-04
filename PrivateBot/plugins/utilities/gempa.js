exports.run = {
   usage: ['gempa'],
   category: 'utilities',
   async: async (m, {
      client
   }) => {
      try {
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Api.gempa()
         const errorStatus = [404, 500, 403, 400, 401, 503, 'false', 402, 504]; if (errorStatus.includes(json.status))  return client.reply(m.chat, global.status.fail, m)
         let caption = `乂  *G E M P A*\n\n`
         caption += `	◦  *Koordinat* : ${json.result.koordinat}\n`
         caption += `	◦  *Skala* : ${json.result.magnitude}\n`
         caption += `	◦  *Kedalaman* : ${json.result.kedalaman}\n`
         caption += `	◦  *Waktu* : ${json.result.waktu}\n`
         caption += `	◦  *Pusat Gempa* : ${json.result.lokasi}\n`
         caption += ` ◦  *Potensi* : ${json.result.potensi}\n\n`
         caption += global.footer
         client.sendFile(m.chat, json.result.map, json.result.lokasi +'.jpg', caption, m)
      } catch {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false
}