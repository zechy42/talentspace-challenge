# specify a base image
FROM node:alpine

# setup working directory
WORKDIR '/usr/src/nest'

ADD package.json /usr/src/nest/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install --legacy-peer-deps

ADD . /usr/src/nest

EXPOSE 4000

CMD ["npm", "run", "start"]