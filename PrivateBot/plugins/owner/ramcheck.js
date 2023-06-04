const {
  execSync
} = require('child_process')

exports.run = {

  usage: ['cekram'],
  hidden: ['ram'],
  category: 'owner',
  async: async (m, {
    client
  }) => {
    await client.sendReact(m.chat, '🕒', m.key)
    var stdout = execSync('node ram.js')
    var output = stdout.toString()

    await client.reply(m.chat, `🚩 ${output.trim()}`, m)

  },
  owner: true,
  cache: true,
  location: __filename
}