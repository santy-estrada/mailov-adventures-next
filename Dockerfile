ARG NODE_VERSION=22.14.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS base

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package.json package-lock.json ./

# Install dependencies.
RUN npm install --legacy-peer-deps --frozen-lockfile

# Copy the rest of the source files.
COPY . .

# Run the build script.
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies.
FROM node:${NODE_VERSION}-alpine AS final

# Set working directory for final runtime.
WORKDIR /usr/src/app

# Use production node environment by default.
ENV NODE_ENV=production

# Copy only necessary files from the base image.
COPY --from=base /usr/src/app/package.json .
COPY --from=base /usr/src/app/next.config.ts .
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/.next ./.next
COPY --from=base /usr/src/app/public ./public

# Change ownership of the working directory to the node user.
RUN chown -R node:node /usr/src/app

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "start"]
