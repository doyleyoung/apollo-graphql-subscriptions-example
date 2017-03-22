import { ApolloClient, createNetworkInterface, gql } from "react-apollo";
import { SubscriptionClient, addGraphQLSubscriptions } from "subscriptions-transport-ws";

const uri = 'http://localhost:5060/graphql';

// Subscriptions - Create WebSocket client
const wsClient = new SubscriptionClient('ws://localhost:5000', {
  reconnect: true,
  connectionParams: {}
});

let networkInterface = addGraphQLSubscriptions(createNetworkInterface({uri}), wsClient);

const client = new ApolloClient({ networkInterface });

let subOptions = {
  query: gql`
      subscription onNewMessage {
          newMessage
      }
  `,
  variables: {}
};

// The subscribe method seems to be creating an Observable to be subscribed to
let subsObservable = client.subscribe(subOptions);

export { client, subsObservable };