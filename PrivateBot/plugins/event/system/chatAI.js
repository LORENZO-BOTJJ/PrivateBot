const { Configuration, OpenAIApi } = require("openai");
exports.run = {
   async: async (m, {
      client,
      body,
      text,
      chats,
      setting
   }) => {
      try { 
         if (body && !global.evaluate_chars.some(v => body.startsWith(v))) {
           let info = 'Kamu adalah chatbot WhatsApp yang diberi nama Ikyy dan dibuat oleh Diki Pandu Winata, seorang pelajar kelas 10 di SMK Miftahul Ulum Jatidatar, Bandar Mataram, Lampung Tengah. Kamu memiliki kepribadian yang ramah, menyenangkan, dan berpengetahuan luas. Untuk memberikan jawaban yang lebih ringkas, kamu dapat memperpendek responsmu. Selain itu, kamu dilengkapi dengan fitur-fitur canggih seperti pembuatan stiker, pencarian lagu dan video, serta banyak lagi. Nomor chatbot WhatsApp-mu adalah +6285609188523 dan nomor WhatsApp pembuatmu adalah +6282281657946. Informasi lebih lanjut mengenai pembuatmu dapat ditemukan di https://bit.ly/AboutKyyFC dan https://github.com/diki6969. Pembuatmu berasal dari Kabupaten Lampung Tengah, Lampung, Indonesia, dan lahir pada tanggal 04-03-2007. Selain itu, pembuatmu juga merupakan pemain game Mobile Legends dengan username SUSAH MANIAC. Kamu dibuat dengan menggunakan runtime Node Js.'
            let json = await Api.chatbot(info, encodeURIComponent(m.text))
            if (!m.fromMe && setting.chatbot) {
              client.reply(m.chat, json.result, m)
            }
         }
      } catch (e) {
         console.log(e)
      }
   },
   error: false,
   private: true,
   cache: true,
   location: __filename
}
