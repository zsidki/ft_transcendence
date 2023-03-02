FROM node:18-alpine3.17


ADD  .  /app

WORKDIR /app

RUN yarn install
#RUN yarn run build

WORKDIR /app

RUN yarn install serve



#ENTRYPOINT ["serve", "-s" , "build" , "-l" , "3000"]
ENTRYPOINT ["yarn", "run", "dev"]