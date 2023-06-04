const {
  execSync
} = require('child_process')

exports.run = {

  usage: ['upload'],
  hidden: ['upl'],
  category: 'owner',
  async: async (m, {
    client
  }) => {
    await client.sendReact(m.chat, '🕒', m.key)
    var stdout = execSync('git config --global user.email "gendonmenjeng@gmail.com" && git config --global user.name "diki6969" && git add . && git commit -a -m "update" && git push')
    var output = stdout.toString()

    await client.reply(m.chat, `🚩 ${output.trim()}`, m)

  },
  owner: true,
  cache: true,
  location: __filename
}