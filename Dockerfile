# Use Node.js 16 with Debian Bullseye (non-EOL)
FROM node:16-bullseye

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Remove node-sass and install dependencies, then add sass as replacement
RUN sed -i '/"node-sass":/d' package.json && \
    yarn install --ignore-engines && \
    yarn add sass sass-loader@^7.3.1 --ignore-engines

# Copy project files
COPY . .

# Expose ports
# 1337 for backend API
# 8080 for webpack dev server
EXPOSE 1337 8080

# Start the development server
CMD ["yarn", "start"]
