const mineflayer = require('mineflayer')

// Bot configuration
const botConfig = {
  host: 'mrgoldmc.aternos.me', // Your Aternos server IP
  port: 40454, // Your server port
  username: 'chotiadkrak', // Bot's username
  password: 'uzair@1111', // Password for /login command
  version: false // Auto-detect server version (works with ViaBackwards)
}

// Create the bot
let bot = mineflayer.createBot(botConfig)

// Handle errors and disconnections
bot.on('error', (err) => {
  console.log('Bot error:', err)
})

bot.on('end', () => {
  console.log('Bot disconnected. Reconnecting in 2 seconds...')
  setTimeout(() => {
    bot = mineflayer.createBot(botConfig) // Reconnect after 2 seconds
  }, 2000)
})

// Handle login plugin (e.g., AuthMe)
bot.on('spawn', () => {
  console.log('Bot spawned, attempting to login...')
  // Send /login command with the provided password
  bot.chat(`/login ${botConfig.password}`)
  
  // Start movement and jumping after 3 seconds to ensure login is complete
  setTimeout(startMovement, 3000)
})

// Movement and jumping logic
function startMovement() {
  console.log('Starting movement and jumping...')
  
  // Jump every 5-10 seconds
  setInterval(() => {
    bot.setControlState('jump', true)
    setTimeout(() => bot.setControlState('jump', false), 300)
  }, Math.random() * 5000 + 5000)
  
  // Move in random directions every 3-7 seconds
  setInterval(() => {
    const directions = ['forward', 'back', 'left', 'right']
    const randomDirection = directions[Math.floor(Math.random() * directions.length)]
    
    // Stop all movement first
    bot.clearControlStates()
    
    // Move in the chosen direction for 1-2 seconds
    bot.setControlState(randomDirection, true)
    setTimeout(() => bot.setControlState(randomDirection, false), Math.random() * 1000 + 1000)
  }, Math.random() * 4000 + 3000)
}

// Log when the bot is kicked (for debugging)
bot.on('kicked', (reason) => {
  console.log('Bot kicked:', reason)
})

// Log when the bot logs in successfully
bot.on('messagestr', (msg) => {
  if (msg.includes('Successfully authenticated') || msg.includes('Logged in')) {
    console.log('Bot successfully logged in!')
  }
})
