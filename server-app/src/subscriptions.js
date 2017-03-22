import {PubSub, SubscriptionManager} from "graphql-subscriptions";
import {makeExecutableSchema} from "graphql-tools";

const pubsub = new PubSub();

// The DB
const messages = [
  'Hello from Subscription Server Example.',
  'GraphiQL is enabled. Use it with mutation { addMessage(message: "My message")} to add entries to this mem DB'
];

const typeDefs = `
type Query {
  messages: [String!]!
}
type Mutation {
  addMessage(message: String!): [String!]!
}
type Subscription {
  newMessage: String!
}
`;

const resolvers = {
  Query: {
    messages(root, {}, context) {
      return messages;
    }
  },
  Mutation: {
    addMessage(root, {message}) {
      messages.push(message);
      pubsub.publish('newMessage', message);
      return messages;
    },
  },
  Subscription: {
    newMessage(message) {
      return message;
    }
  },
};

const schema = makeExecutableSchema({typeDefs, resolvers});
const subscriptionManager = new SubscriptionManager({schema, pubsub});


export {subscriptionManager, pubsub, schema, resolvers};