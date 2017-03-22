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

// At this stage, client should have been injected with "subscribeToMore":
// https://github.com/apollographql/subscriptions-transport-ws#client-browser
client.subscribeToMore({
  document: gql`
      subscription onNewMessage {
          newMessage
      }
  `,
  variables: {},
  updateQuery: (previousResult, {subscriptionData}) => {
    console.log(`Previous Result: ${previousResult}`);
    console.log(`Subscription Data: ${subscriptionData}`);
    const newResult = subscriptionData.data.message;
    console.log(`New Result: ${subscriptionData.data.message}`);
    return newResult;
  },
});

export default client;