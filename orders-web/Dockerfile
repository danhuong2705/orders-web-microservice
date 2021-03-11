# build stage
FROM node:13-alpine as build

ARG REACT_APP_BASE_API_URL
WORKDIR /app
COPY . .

RUN npm install  


RUN REACT_APP_BASE_API_URL=${REACT_APP_BASE_API_URL}
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
