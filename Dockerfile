# Parent Image
FROM node:18-alpine

# Default Image Working Directory
WORKDIR /app

# Copy Everything Except Files Ignored By Dockerignore
COPY . .

# Install Node Modules
RUN npm i --silent --save-dev

# Expose Docker Port
# as defined in vite.config.js
EXPOSE 4444

# Start Vite Dev Server
CMD ["npm", "run", "serve"]
