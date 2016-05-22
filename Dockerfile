FROM node:4.4.2
MAINTAINER Eugene Westbrook

RUN useradd manifest

# build src and do npm install so to optimize docker cache
RUN mkdir /manifest
COPY package.json /manifest
RUN cd /manifest && npm install

# mountable config directory
RUN mkdir /config
RUN chown -R manifest:manifest /config

# bring the app over to /manifest
COPY galleries /manifest/galleries
COPY gulpfile.js /manifest
COPY manifest_builder.js /manifest
RUN chown -R manifest:manifest /manifest

USER manifest

ENV CONFIG_DIR=/config
RUN cd /manifest && node_modules/gulp/bin/gulp.js build

CMD ["/bin/bash"]
