require('./system/config'), require('events').EventEmitter.defaultMaxListeners = 50
const pino = require('pino'),
   path = require('path'),
   colors = require('@colors/colors/safe'),
   qrcode = require('qrcode-terminal'),
   axios = require('axios'),
   stable = require('json-stable-stringify'),
   spinnies = new(require('spinnies'))(),
   fs = require('fs'),
   baileys = fs.existsSync('./node_modules/baileys') ? 'baileys' : fs.existsSync('./node_modules/@adiwajshing/baileys') ? '@adiwajshing/baileys' : 'bails'
const { useMultiFileAuthState, DisconnectReason, makeInMemoryStore, msgRetryCounterMap, delay } = require(baileys)
const { execSync } = require('child_process')
global.component = new (require('@neoxr/neoxr-js'))
const { Extra, MongoDB, PostgreSQL } = component
const { Socket, Serialize, Scandir } = Extra
if (process.env.DATABASE_URL) MongoDB.db = global.database
global.props = (process.env.DATABASE_URL && /mongo/.test(process.env.DATABASE_URL)) ? MongoDB : (process.env.DATABASE_URL && /postgres/.test(process.env.DATABASE_URL)) ? PostgreSQL : new(require('./system/localdb'))(global.database)

const store = makeInMemoryStore({
   logger: pino().child({
      level: 'silent',
      stream: 'store'
   })
})

// don't rename "neoxr_store.json" to avoid error!!
store.readFromFile('./session/neoxr_store.json')
setInterval(() => {
   store.writeToFile('./session/neoxr_store.json')
}, 10000)

const connect = async () => {
   const { state, saveCreds } = await useMultiFileAuthState('session')
   global.db = {users:[], chats:[], groups:[], statistic:{}, sticker:{}, setting:{}, ...(await props.fetch() ||{})}
   await props.save(global.db)
   global.client = Socket({
      logger: pino({
         level: 'silent'
      }),
      printQRInTerminal: true,
      patchMessageBeforeSending: (message) => {
         const requiresPatch = !!(
            message.buttonsMessage ||
            message.templateMessage ||
            message.listMessage
         );
         if (requiresPatch) {
            message = {
               viewOnceMessage: {
                  message: {
                     messageContextInfo: {
                        deviceListMetadataVersion: 2,
                        deviceListMetadata: {},
                     },
                     ...message,
                  },
               },
            }
         }
         return message
      },
      browser: ['@neoxr / neoxr-bot', 'safari', '1.0.0'],
      auth: state,
      getMessage: async (key) => {
         if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg.message || undefined
         }
         return {
            conversation: 'hello'
         }
      },
      // To see the latest version : https://web.whatsapp.com/check-update?version=1&platform=web
      version: [2, 2308, 7]
   })

   store.bind(client.ev)
   client.ev.on('connection.update', async (update) => {
      const {
         connection,
         lastDisconnect,
         qr
      } = update
      if (lastDisconnect == 'undefined' && qr != 'undefined') {
         qrcode.generate(qr, {
            small: true
         })
      }
      if (connection === 'connecting') {
       spinnies.add('start', {
         text: 'Connecting . . .'
      })
     } else if (connection === 'open') {
         spinnies.succeed('start', {
            text: `Connected, you login as ${client.user.name || client.user.verifiedName}`
         })
      } else if (connection === 'close') {
         if (lastDisconnect.error.output.statusCode == DisconnectReason.loggedOut) {
            spinnies.fail('start', {
               text: `Can't connect to Web Socket`
            })
            await props.save()
            process.exit(0)
         } else {
            connect().catch(() => connect())
         }
      }
   })

   client.ev.on('creds.update', saveCreds)
   client.ev.on('messages.upsert', async chatUpdate => {
      try {
         m = chatUpdate.messages[0]
         if (!m.message) return
         Serialize(client, m)
         require('./system/database')(m)
         if (!global.db.setting.online) await client.sendPresenceUpdate('unavailable', m.chat)
         if (global.db.setting.online) await client.sendPresenceUpdate('available', m.chat)
         const files = await Scandir('./plugins')
         const plugins = Object.fromEntries(files.filter(v => v.endsWith('.js')).map(file => [path.basename(file).replace('.js', ''), require(file)]))
         require('./system/baileys'), require('./handler')(client, m, plugins, store)
      } catch (e) {
         console.log(e)
      }
   })

   client.ev.on('contacts.update', update => {
      for (let contact of update) {
         let id = client.decodeJid(contact.id)
         if (store && store.contacts) store.contacts[id] = {
            id,
            name: contact.notify
         }
      }
   })

   client.ev.on('group-participants.update', async (room) => {
      let meta = await (await client.groupMetadata(room.id))
      let member = room.participants[0]
      let text_welcome = `Thanks +tag for joining into +grup group.`
      let text_left = `+tag left from this group for no apparent reason.`
      let groupSet = global.db.groups.find(v => v.jid == room.id)
      try {
         pic = await Func.fetchBuffer(await client.profilePictureUrl(member, 'image'))
      } catch {
         pic = await Func.fetchBuffer(await client.profilePictureUrl(room.id, 'image'))
      }
      if (room.action == 'add') {
         if (groupSet && groupSet.localonly) {
            if (global.db.users.some(v => v.jid == member) && !global.db.users.find(v => v.jid == member).whitelist && !member.startsWith('62') || !member.startsWith('62')) {
               client.reply(room.id, Func.texted('bold', `Sorry @${member.split`@`[0]}, this group is only for indonesian people and you will removed automatically.`))
               client.updateBlockStatus(member, 'block')
               return await Func.delay(2000).then(() => client.groupParticipantsUpdate(room.id, [member], 'remove'))
            }
         }
         let txt = (groupSet && groupSet.text_welcome != '' ? groupSet.text_welcome : text_welcome).replace('+tag', `@${member.split`@`[0]}`).replace('+grup', `${meta.subject}`)
         if (groupSet.welcome) client.sendMessageModify(room.id, txt, null, {
            largeThumb: true,
            thumbnail: pic,
            url: global.db.setting.link
         })
      } else if (room.action == 'remove') {
         let txt = (groupSet && groupSet.text_left != '' ? groupSet.text_left : text_left).replace('+tag', `@${member.split`@`[0]}`).replace('+grup', `${meta.subject}`)
         if (groupSet.left) client.sendMessageModify(room.id, txt, null, {
            largeThumb: true,
            thumbnail: pic,
            url: global.db.setting.link
         })
      }
   })

   client.ws.on('CB:call', async json => {
      if (json.content[0].tag == 'offer') {
         let object = json.content[0].attrs['call-creator']
         await Func.delay(2000)
         await client.updateBlockStatus(object, 'block')
      }
   })
   // Auto restart if ram usage has reached the limit, if you want to use enter the ram size in bytes
   const ramCheck = setInterval(() => {
     var bytes = process.memoryUsage()
      var ramUsage = bytes.rss + bytes.heapTotal + bytes.heapUsed + bytes.external + bytes.arrayBuffers
      if (ramUsage >= 600000000) { // 600 MB
         clearInterval(ramCheck)
         process.send('reset')
      }
   }, 60 * 1 * 1000) // Checking every 1 minute
   
   setInterval(async () => {
      const tmpFiles = fs.readdirSync('./temp')
      if (tmpFiles.length > 0) {
         tmpFiles.map(v => fs.unlinkSync('./temp/' + v))
      }
      const storeFile = await Func.getFile('./session/neoxr_store.json')
      let chSize = Func.sizeLimit(storeFile.size, 2)
      if (chSize.oversize) {
         fs.writeFileSync('./session/neoxr_store.json', stable({"chats":[],"contacts":{},"messages":{}}))
      }
   }, 60 * 1000 * 5)

   setInterval(async () => {
      if (global.db) await props.save(global.db)
   }, 30000)
   
   setInterval(async () => {
     global.db.setting.autobio += 1000;
   }, 1000)
   
   setInterval(async () => {
     let groupList = async () => Object.entries(await client.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
      let groups = await groupList()
     client.updateProfileStatus(konver(global.db.setting.autobio)+global.db.users.length+' User || '+groups.length+' Group')
   }, 5000)
   
   setInterval(async () => {
      await props.save()
      process.send('reset')
   }, 10 * 60 * 1000)

   return client
}

function konver(milliseconds) {
  // Hitung jumlah milidetik dalam setiap unit waktu
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day; // Asumsi setiap bulan memiliki 30 hari

  // Hitung jumlah bulan, hari, jam, menit, dan detik
  const months = Math.floor(milliseconds / month);
  milliseconds %= month;

  const days = Math.floor(milliseconds / day);
  milliseconds %= day;

  const hours = Math.floor(milliseconds / hour);
  milliseconds %= hour;

  const minutes = Math.floor(milliseconds / minute);
  milliseconds %= minute;

  const seconds = Math.floor(milliseconds / second);

  // Mengembalikan hasil dalam bentuk objek
  const result = {
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };

  return `IKYY BOT || ${months}months ${days}days ${hours}hours ${minutes}minutes ${seconds}seconds || `
}

connect().catch(() => connect())