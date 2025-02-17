# Gunakan image Node.js resmi
FROM node:22.14.0-alpine

# Set work directory
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode aplikasi
COPY . .

# Expose port (sesuaikan dengan aplikasi)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
