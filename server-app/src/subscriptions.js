import {PubSub, SubscriptionManager} from "graphql-subscriptions";
import {makeExecutableSchema} from "graphql-tools";

const pubsub = new PubSub();

// The DB
const messages = [];

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
      let entry = JSON.stringify({id: messages.length,  message: message});
      messages.push(entry);
      pubsub.publish('newMessage', entry);
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