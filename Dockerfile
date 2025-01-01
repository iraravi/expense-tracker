# Use an official Nginx image as a base
FROM nginx:latest

# Copy the built Angular app into the Nginx HTML directory
COPY ./dist/expense-tracker /usr/share/nginx/html

# Expose port 80
EXPOSE 4200

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
