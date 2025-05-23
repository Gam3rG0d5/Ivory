# Use the official Node.js 18 slim image for a lightweight container
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the bot code
COPY aternos-bot.js ./

# Command to run the bot
CMD ["npm", "start"]

# Expose no ports (bot communicates outbound to Aternos, no inbound needed)
