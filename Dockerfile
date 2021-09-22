FROM node:10.13

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

## Install package dependencies
RUN apt-get update

# Install app dependencies
COPY . /usr/src/app/

# TODO: Apply production environments
# RUN mv .env.production .env

RUN npm install
RUN npm run build

# Copy robots.txt for SEO
COPY robots.txt /usr/src/app/.next

# Bundle app source
WORKDIR /usr/src/app/.next

ENV PORT 3000
EXPOSE 3000

CMD ["npm", "start"]
