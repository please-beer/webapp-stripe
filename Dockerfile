FROM node:4
RUN mkdir /pleasebeer-stripe
ADD ./app/ /pleasebeer-stripe/
WORKDIR /pleasebeer-stripe
RUN npm install --no-optional
EXPOSE 80
ENTRYPOINT ["node", "server.js"]