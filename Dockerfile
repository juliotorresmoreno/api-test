FROM node:lts

ADD . /api-test
WORKDIR /api-test
RUN chmod +x build.sh
RUN ./build.sh

ENTRYPOINT [ "npm", "start" ];