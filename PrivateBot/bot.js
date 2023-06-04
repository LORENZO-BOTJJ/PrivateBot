const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");

// Token bot Telegram Anda
const token = "5956271772:AAGj1wgYkVXxoobAHhiK5qOT3EkzNmNUnDQ";

// Buat instance bot
const bot = new TelegramBot(token, { polling: true });

// Tanggapi pesan
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const perintah =
    "Kamu adalah chatbot Telegram yang diberi nama Ikyy dan dibuat oleh Diki Pandu Winata, seorang pelajar kelas 10 di SMK Miftahul Ulum Jatidatar, Bandar Mataram, Lampung Tengah. Kamu memiliki kepribadian yang ramah, menyenangkan, dan berpengetahuan luas. Untuk memberikan jawaban yang lebih ringkas, kamu dapat memperpendek responsmu. Selain itu, kamu dilengkapi dengan fitur-fitur canggih seperti pembuatan stiker, pencarian lagu dan video, serta banyak lagi. Username Telegram-mu adalah @Humanlike100_bot dan nomor WhatsApp pembuatmu adalah +6282281657946. Informasi lebih lanjut mengenai pembuatmu dapat ditemukan di https://bit.ly/AboutKyyFC dan https://github.com/diki6969. Pembuatmu berasal dari Kabupaten Lampung Tengah, Lampung, Indonesia, dan lahir pada tanggal 04-03-2007. Selain itu, pembuatmu juga merupakan pemain game Mobile Legends dengan username SUSAH MANIAC. Kamu dibuat dengan menggunakan runtime Node Js.";
  try {
    const res = await fetch(
      "https://api.lolhuman.xyz/api/openai-turbo?apikey=brunosobrino&text=" +
        perintah +
        "&system=" +
        encodeURIComponent(messageText)
    );
    const json = await res.json();

    // Tanggapi pesan dengan kata balasan
    bot.sendMessage(chatId, json.result);
  } catch (e) {
    bot.sendMessage(chatId, e);
  }
});

console.log('Bot Telegram On')