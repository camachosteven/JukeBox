FROM node:12

# Environment Variables
ENV ENVIRONMENT=development
ENV PORT=8000
ENV HOST=0.0.0.0

# make port public
EXPOSE ${PORT}
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