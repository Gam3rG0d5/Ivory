const mineflayer = require('mineflayer')

// Bot configuration from environment variables
const botConfig = {
  host: process.env.SERVER_HOST || 'BOOOOOM69.aternos.me', // Fallback if not set
  port: parseInt(process.env.SERVER_PORT) || 57404, // Convert to number, fallback
  username: process.env.BOT_USERNAME || 'chotiadkrak', // Fallback
  version: false // Auto-detect server version (works with ViaBackwards)
}

// Create the bot
let bot = mineflayer.createBot(botConfig)

// Handle errors
bot.on('error', (err) => {
  console.log('Bot error:', err)
  if (err.code === 'ECONNRESET') {
    console.log('Connection reset by server. Retrying in 5 seconds...')
    setTimeout(() => {
      bot = mineflayer.createBot(botConfig) // Retry after 5 seconds
    }, 5000)
  }
})

// Handle disconnections
bot.on('end', () => {
  console.log('Bot disconnected. Reconnecting in 5 seconds...')
  setTimeout(() => {
    bot = mineflayer.createBot(botConfig) // Reconnect after 5 seconds
  }, 5000)
})

// Start movement on spawn
bot.on('spawn', () => {
  console.log('Bot spawned, starting movement...')
  startMovement()
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

// Log when the bot spawns (for confirmation)
bot.on('messagestr', (msg) => {
  if (msg.includes('Welcome') || msg.includes('joined the game')) {
    console.log('Bot successfully connected!')
  }
})
