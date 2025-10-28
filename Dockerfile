FROM node:20-bullseye
WORKDIR /app
COPY package*.json ./
RUN npm install -g expo-cli
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npx", "expo", "start", "--tunnel"]

