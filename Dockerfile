FROM node:carbon as crafter
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN yarn install
COPY . /usr/src/app
RUN yarn build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=crafter /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
RUN chown nginx.nginx /usr/share/nginx/html/ -R