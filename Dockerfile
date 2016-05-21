FROM node:4.4.2
MAINTAINER Eugene Westbrook

RUN useradd manifest

# build src and do npm install so to optimize docker cache
RUN mkdir /manifest
COPY package.json /manifest
RUN cd /manifest && npm install

# bring the app over to /manifest
COPY . /manifest
RUN chown -R manifest:manifest /manifest

# mountable config directory
RUN mkdir /config
RUN chown -R manifest:manifest /config
VOLUME /config

USER manifest
WORKDIR /manifest

ENV CONFIG_DIR=/config

CMD ["node_modules/gulp/bin/gulp.js", "build"]
