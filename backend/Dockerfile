FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install ts-node --save-dev   # Install ts-node

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]