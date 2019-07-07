# Copies in our code and runs NPM Install
FROM node:latest AS base
WORKDIR /usr/src/app
COPY ./ .
RUN ["npm", "ci"]

# Lints Code
FROM base AS linting
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ .
RUN ["npm", "run", "lint"]

# Gets Sonarqube Scanner from Dockerhub and runs it
FROM newtmitch/sonar-scanner:latest AS sonarqube
COPY --from=base /usr/src/app/src /usr/src
CMD ["sonar-scanner -Dsonar.projectBaseDir=/usr/src"]

# Runs Unit Tests
FROM base AS unit-tests
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ .
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/chrome.list
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN apt-get update && apt-get install -y google-chrome-stable
ENV CHROME_BIN /usr/bin/google-chrome
RUN ["npm", "run", "test"]

# Runs Build
FROM base AS build
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ .
RUN ["npm", "run", "build"]

# Starts and Serves Web Page
FROM nginx:stable
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
