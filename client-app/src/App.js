import React, { Component } from "react";
import { gql, graphql, withApollo } from "react-apollo";
import { authToken } from "./net_interface"

const GET_MESSAGES_QUERY = gql`query {
    messages
}`;

const ON_NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription onNewMessage($userId: Int!) {
        newMessage(userId: $userId)
    }
`;

const MUTATE_MESSAGE = gql`
    mutation AddMessage($message: String!, $broadcast: Boolean!) {
        addMessage(message: $message, broadcast: $broadcast)
    }
`;

//@withApollo - react-scripts do not yet support decorators - https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#can-i-use-decorators
class App extends Component {

  constructor() {
    super();
    this.state = {
      messageList: []
    };
    this.mutationMessage = "Hello Apollo GraphQL Subscriptions";
    this.broadcast = false;
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.data.loading) {

      this.setState({
        messageList: [...nextProps.data.messages]
      });

      if (this.subscription) {
        if (nextProps.data.messages !== this.props.data.messages) {
          // if the feed has changed, we need to unsubscribe before resubscribing
          this.subscription.unsubscribe();
        } else {
          // we already have an active subscription with the right params
          return;
        }
      }

      this.subscription = nextProps.data.subscribeToMore({
        document: ON_NEW_MESSAGE_SUBSCRIPTION,
        variables: {
          userId: authToken
        },
        // this is where the magic happens.
        updateQuery: this.updateQuery,
        onError: (err) => console.error(err),
      });
    }
  };

  componentWillUnmount = () => {
    this.subscription.unsubscribe();
  };

  updateQuery = (prev, {subscriptionData}) => {
    const newMessage = subscriptionData.data.newMessage;
    return this.onNewMessage(newMessage);
  };

  onNewMessage = (message) => {
    let messages = [...this.state.messageList, message];
    this.setState({
      messageList: messages
    });
    return messages;
  };

  updateMutationMessage = (event) => {
    this.mutationMessage = event.target.value;
  };

  updateBroadcastFlag = (event) => {
    this.broadcast = event.target.checked;
  };

  onMutationSubmit = () => {
     this.props.client.mutate({
       operationName: "AddMessage",
       mutation: MUTATE_MESSAGE,
       variables: { message: this.mutationMessage, broadcast: this.broadcast }
     });
  };

  render() {
    const {loading} = this.props.data;
    return (
      <main>
        <header>
          <h1>Apollo Client Subscription Example</h1>
          <p>
            Open <a href="http://localhost:5060/graphiql">GraphiQL</a> and submit the following mutation:
            <br />
            <br />
          </p>
          <pre>
            mutation AddMessage {'{\n    '}
              addMessage(message: "Hello Apollo Subscriptions", broadcast: true)
            {'\n}\n'}
          </pre>
          <p>
            <br />
            You should see a console entry in this window with the above message.
          </p>
        </header>

        <input type="text" onChange={this.updateMutationMessage.bind(this)} defaultValue={this.mutationMessage}/>
        <input type="button" onClick={this.onMutationSubmit.bind(this)} value="Mutate"/>
        <br />
        <span>Broadcast</span>
        <input type="checkbox" onChange={this.updateBroadcastFlag.bind(this)} defaultValue={this.broadcast}/>

        { loading ? (<p>Loading…</p>) : (
          <ul> { this.state.messageList.map(entry => JSON.parse(entry)).map(entry => (
            <li key={entry.id}>{entry.message}</li>)) }
          </ul> )}
      </main>
    );
  }
}

export default graphql(
  GET_MESSAGES_QUERY
)(withApollo(App))
