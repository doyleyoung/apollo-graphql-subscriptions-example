import { ApolloClient, createNetworkInterface } from "react-apollo";
import { addGraphQLSubscriptions, SubscriptionClient } from "subscriptions-transport-ws";

const uri = 'http://localhost:5060/graphql';

const authToken = Math.floor((Math.random() * 100000000) + 1);

// Subscriptions - Create WebSocket client
const wsClient = new SubscriptionClient('ws://localhost:5000', {
  reconnect: true,
  connectionParams: {
    authToken: authToken
  }
});

const authTokenMiddleware = {
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    req.options.headers['authToken'] = authToken;
    next();
  }
};

let networkInterface = addGraphQLSubscriptions(createNetworkInterface({uri}), wsClient);
networkInterface.use([authTokenMiddleware]);

const client = new ApolloClient({networkInterface});

export { client as default, authToken };