FROM node:18-alpine AS app
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=app /app/dist/ /usr/share/nginx/html/
EXPOSE 6000
CMD ["nginx","-g","daemon off;"]
