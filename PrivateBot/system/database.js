module.exports = (m) => {
   const isNumber = x => typeof x === 'number' && !isNaN(x)
   let user = global.db.users.find(v => v.jid == m.sender)
   if (user) {
      if (!isNumber(user.afk)) user.afk = -1
      if (!('afkReason' in user)) user.afkReason = ''
      if (!('name' in user)) user.name= m.sender
      if (!('banned' in user)) user.banned = false
      if (!isNumber(user.banTemp)) user.banTemp = 0
      if (!isNumber(user.banTimes)) user.banTimes = 0
      if (!isNumber(user.limit)) user.limit = global.limit
      if (!('premium' in user)) user.premium = false
      if (!isNumber(user.expired)) user.expired = 0
      if (!isNumber(user.lastseen)) user.lastseen = 0
      if (!isNumber(user.hit)) user.hit = 0
      if (!isNumber(user.spam)) user.spam = 0
      if (!isNumber(user.warning)) user.warning = 0
   } else {
      global.db.users.push({
         jid: m.sender,
     	afk: -1,
         afkReason: '',
         name: m.sender,
         banned: false,
         banTemp: 0,
         banTimes: 0,
         limit: global.limit,
         premium: false,
         expired: 0,
         lastseen: 0,
         hit: 0,
         spam: 0,
         warning: 0
      })
   }

   if (m.isGroup) {
      let group = global.db.groups.find(v => v.jid == m.chat)
      if (group) {
         if (!isNumber(group.activity)) group.activity = 0
         if (!('autoread' in group)) group.autoread = true
         if (!('antidelete' in group)) group.antidelete = true
         if (!('antilink' in group)) group.antilink = true
         if (!('antivirtex' in group)) group.antivirtex = true
         if (!('filter' in group)) group.filter = true
         if (!('left' in group)) group.left = true
         if (!('localonly' in group)) group.localonly = false
         if (!('mute' in group)) group.mute = false
         if (!('member' in group)) group.member = {}
         if (!('text_left' in group)) group.text_left = ''
         if (!('text_welcome' in group)) group.text_welcome = ''
         if (!('welcome' in group)) group.welcome = true
         if (!isNumber(group.expired)) group.expired = 0
         if (!('stay' in group)) group.stay = false
      } else {
         global.db.groups.push({
            jid: m.chat,
            activity: 0,
            autoread: true,
            antidelete: true,
            antilink: true,
            antivirtex: true,
            filter: true,
            left: true,
            localonly: false,
            mute: false,
            member: {},
            text_left: '',
            text_welcome: '',
            welcome: true,
            expired: 0,
            stay: false
         })
      }
   }

   let chat = global.db.chats.find(v => v.jid == m.chat)
   if (chat) {
      if (!isNumber(chat.chat)) chat.chat = 0
      if (!isNumber(chat.lastchat)) chat.lastchat = 0
      if (!isNumber(chat.lastseen)) chat.lastseen = 0
      if (!isNumber(chat.command)) chat.command = 0
   } else {
      global.db.chats.push({
         jid: m.chat,
         chat: 0,
         lastchat: 0,
         lastseen: 0,
         command: 0
      })
   }

   let setting = global.db.setting
   if (setting) {
  	if (!('autodownload' in setting)) setting.autodownload = true
  	if (!('debug' in setting)) setting.debug = false
      if (!('chatbot' in setting)) setting.chatbot = true
      if (!('error' in setting)) setting.error = []
      if (!('pluginDisable' in setting)) setting.pluginDisable = []
      if (!('groupmode' in setting)) setting.groupmode = false
      if (!('sk_pack' in setting)) setting.sk_pack = 'sᴛɪᴄᴋᴇʀ ʙʏ\nɪᴋʏʏ ʙᴏᴛ'
      if (!('sk_author' in setting)) setting.sk_author = 'ʙᴏᴛ ʙʏ\nɪᴋʏʏ ᴏғғɪᴄɪᴀʟ'
      if (!('self' in setting)) setting.self = false
      if (!('mimic' in setting)) setting.mimic = []
      if (!('noprefix' in setting)) setting.noprefix = true
      if (!('multiprefix' in setting)) setting.multiprefix = true
      if (!('prefix' in setting)) setting.prefix = ['.', '/', '!', '#']
      if (!('toxic' in setting)) setting.toxic = ["ajg", "ajig", "anjas", "anjg", "anjim", "anjing", "anjrot", "anying", "asw", "autis", "babi", "bacod", "bacot", "bagong", "bajingan", "bangsad", "bangsat", "bastard", "bego", "bgsd", "biadab", "biadap", "bitch", "bngst", "bodoh", "bokep", "cocote", "coli", "colmek", "comli", "dajjal", "dancok", "dongo", "fuck", "gelay", "goblog", "goblok", "guoblog", "guoblok", "hairul", "henceut", "idiot", "itil", "jamet", "jancok", "jembut", "jingan", "kafir", "kanjut", "kanyut", "keparat", "kntl", "kontol", "lana", "loli", "lont", "lonte", "mancing", "meki", "memek", "ngentod", "ngentot", "ngewe", "ngocok", "ngtd", "njeng", "njing", "njinx", "oppai", "pantek", "pantek", "peler", "pepek", "pilat", "pler", "pornhub", "pucek", "puki", "pukimak", "redhub", "sange", "setan", "silit", "telaso", "tempek", "tete", "titit", "toket", "tolol", "tomlol", "tytyd", "ʟᴏʀᴇɴᴢᴏ", "xnxx"]
      if (!('online' in setting)) setting.online = true
      if (!('onlyprefix' in setting)) setting.onlyprefix = '+'
      if (!('owners' in setting)) setting.owners = ['6285894094841']
      if (!isNumber(setting.lastReset)) setting.lastReset = new Date * 1
      if (!('msg' in setting)) setting.msg = 'Hello +tag +greeting😄! I am a WhatsApp bot which comes with cool features like creating stickers, sending songs, searching videos and much more. I am here to help you in a variety of ways, including submitting.\n\n◦ *Database* : +db\n◦ *Library* : Baileys +version\n\n If you find an error or want to upgrade to premium, you can contact the owner.\n\nMy owner: LORENZO'
      if (!isNumber(setting.menuStyle)) setting.menuStyle = 4
      if (!('cover' in setting)) setting.cover = 'https://telegra.ph/file/8e1a4a469f122b27374aa.jpg'
      if (!('link' in setting)) setting.link = 'https://chat.whatsapp.com/EFLND5hqyy73IxzlH4JUDJ'
      if (!('count' in setting)) setting.count = 0
      if (!('autobio' in setting)) setting.autobio = '0'
   } else {
      global.db.setting = {
         autodownload: true,
         chatbot: true,
         debug: false,
         error: [],
         pluginDisable: [],
         groupmode: false,
         sk_pack: 'sᴛɪᴄᴋᴇʀ ʙʏ\nʟᴏʀᴇɴᴢᴏʙᴏᴛ',
         sk_author: 'ʙᴏᴛ ʙʏ\nʟᴏʀᴇɴᴢᴏʙᴏᴛ/ ᴏғғɪᴄɪᴀʟ',
         self: false,
         mimic: [],
         noprefix: true,
         multiprefix: true,
         prefix: ['.', '#', '!', '/'],
         toxic: ["ajg", "ajig", "anjas", "anjg", "anjim", "anjing", "anjrot", "anying", "asw", "autis", "babi", "bacod", "bacot", "bagong", "bajingan", "bangsad", "bangsat", "bastard", "bego", "bgsd", "biadab", "biadap", "bitch", "bngst", "bodoh", "bokep", "cocote", "coli", "colmek", "comli", "dajjal", "dancok", "dongo", "fuck", "gelay", "goblog", "goblok", "guoblog", "guoblok", "hairul", "henceut", "idiot", "itil", "jamet", "jancok", "jembut", "jingan", "kafir", "kanjut", "kanyut", "keparat", "kntl", "kontol", "lana", "loli", "lont", "lonte", "mancing", "meki", "memek", "ngentod", "ngentot", "ngewe", "ngocok", "ngtd", "njeng", "njing", "njinx", "oppai", "pantek", "pantek", "peler", "pepek", "pilat", "pler", "pornhub", "pucek", "puki", "pukimak", "redhub", "sange", "setan", "silit", "telaso", "tempek", "tete", "titit", "toket", "tolol", "tomlol", "tytyd", "ʟᴏʀᴇɴᴢᴏ", "xnxx"],
         online: true,
         onlyprefix: '+',
         owners: ['6285894094841'],
         lastReset: new Date * 1,
         msg: 'Hello +tag +greeting😄! I am a WhatsApp bot which comes with cool features like creating stickers, sending songs, searching videos and much more. I am here to help you in a variety of ways, including submitting.\n\n◦ *Database* : +db\n◦ *Library* : Baileys +version\n\n If you find an error or want to upgrade to premium, you can contact the owner.\n\nMy owner: LORENZO',
         menuStyle: 4,
         cover: 'https://telegra.ph/file/8e1a4a469f122b27374aa.jpg',
         link: 'https://chat.whatsapp.com/EFLND5hqyy73IxzlH4JUDJ',
         count: 0,
         autobio: '0'
      }
   }
}