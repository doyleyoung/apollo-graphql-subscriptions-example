import { ApolloClient, createNetworkInterface } from "react-apollo";
import { addGraphQLSubscriptions, SubscriptionClient } from "subscriptions-transport-ws";

const uri = 'http://localhost:5060/graphql';

// Subscriptions - Create WebSocket client
const wsClient = new SubscriptionClient('ws://localhost:5000', {
  reconnect: true,
  connectionParams: {}
});

let networkInterface = addGraphQLSubscriptions(createNetworkInterface({uri}), wsClient);

const client = new ApolloClient({networkInterface});

export default client;