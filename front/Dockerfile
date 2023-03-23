# Use the official Nginx image as the base image
FROM nginx:latest

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy the index.html and script.js files to the Nginx html directory
COPY index.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Expose port 80 for HTTP
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
# Stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/angular-app /usr/share/nginx/html

# FROM node:17-alpine3.14
# ENV NODE_ENV=production
# ENV PORT=3005

# EXPOSE $PORT

# WORKDIR /app

# COPY package.json .

# COPY --from=builder  /app/dist/ ./dist/assets
# FROM nginx:latest

# # Copy the build output to replace the default nginx contents.
# COPY --from=builder /app/dist/fuse /usr/share/nginx/html

# # Expose port 80
# EXPOSE 3005







