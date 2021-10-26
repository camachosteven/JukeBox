FROM node:12

# Environment Variables
# *Heroku specifies PORT*
ENV ENVIRONMENT=production
ENV HOST=0.0.0.0

# Create a separate folder *WITHIN* Image
WORKDIR /app
# Copy the .json files into the working directory of the image
COPY [ "package.json", "package.lock.json*", "./" ]
# install the node modules
RUN npm install 
# copy the entire source code
COPY . .

# run the server
CMD [ "node", "server.js" ]