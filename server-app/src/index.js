import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import {subscriptionManager, schema} from "./subscriptions";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
require("babel-polyfill");

// Create WebSocket server
const appWS = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

const subscriptionServer = new SubscriptionServer({
  onConnect: async(connectionParams) => {
    console.log('WebSocket connection established');
  },
  subscriptionManager: subscriptionManager
}, {
  server: appWS,
  path: '/'
});

appWS.listen(5000, () => {
  console.log(`Websocket listening on port 5000`)
});

// Init HTTP server and GraphQL Endpoints
const app = express();
app.use('*', cors());
app.use('/graphql', bodyParser.json(), graphqlExpress(request => ({schema})));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql', query: 'query { messages }'}));

app.listen(5060, () => {
  console.log(`Server listening on port 5060`);
});
