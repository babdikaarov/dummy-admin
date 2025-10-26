FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy pre-built dist directory
COPY dist ./dist

# Expose port 4173
EXPOSE 4173

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "server"]
