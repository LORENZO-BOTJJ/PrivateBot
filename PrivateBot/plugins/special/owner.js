exports.run = {
   usage: ['owner'],
   category: 'special',
   async: async (m, {
      client
   }) => {
      let nmb = await client.sendContact(m.chat, [{
         name: global.owner_name,
         number: global.owner,
         about: 'Owner & Creator'
      }], m, {
         org: 'Bot Whatsapp By LORENZO-MD',
         website: 'https://lorenzogame.epyzy.com',
         email: 'hddhhdhbdhdhd95@gmail.com'
      })
      await Func.delay(2000)
      await client.reply(m.chat, '*This is my owner contact.*', nmb)
   },
   error: false,
   cache: true,
   location: __filename
}