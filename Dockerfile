FROM node:4.4.2
MAINTAINER Eugene Westbrook

RUN useradd manifest

# build src and do npm install so to optimize docker cache
RUN mkdir /src
COPY package.json /src
RUN cd /src && npm install

# bring the app over to /src
COPY . /src
RUN chown -R manifest:manifest /src

# mountable config directory
RUN mkdir /config
RUN chown -R manifest:manifest /config
VOLUME /config

USER manifest
WORKDIR /src

ENV CONFIG_DIR=/config

CMD ["node_modules/gulp/bin/gulp.js", "build"]
