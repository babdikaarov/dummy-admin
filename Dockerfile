FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build arguments
ARG VITE_API_BASE_URL
ARG VITE_API_VERSION

# Set environment variables for build
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_API_VERSION=${VITE_API_VERSION}

# Build the project
RUN npm run build

# Expose port 4173
EXPOSE 4173

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "serve"]
