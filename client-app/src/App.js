import React, { Component } from "react";
import { gql, graphql, withApollo } from "react-apollo";

const GET_MESSAGES_QUERY = gql`query {
    messages
}`;

const ON_NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription onNewMessage($userId: Int!) {
        newMessage(userId: $userId)
    }
`;

const MUTATE_MESSAGE = gql`
    mutation AddMessage($message: String!) {
        addMessage(message: $message)
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
          userId: 111111111
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
    console.info('prev', prev);
    console.info('subData', subscriptionData.data);
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

  onMutationSubmit = () => {
     this.props.client.mutate({
       operationName: "AddMessage",
       mutation: MUTATE_MESSAGE,
       variables: { message: this.mutationMessage }
     });
  };

  render() {
    const {loading} = this.props.data;
    console.log(this.props);
    return (
      <main>
        <header>
          <h1>Apollo Client Subscription Example</h1>
          <p>
            Open <a href="http://localhost:5060/graphiql">GraphiQL</a> and submit the following mutation:
            <br />
            <br />
            mutation {'{'} addMessage(message: "My message") {'}'}
            <br />
            <br />
            You should see a console entry in this window with the above message.
          </p>
        </header>

        <input type="text" onChange={this.updateMutationMessage.bind(this)} defaultValue={this.mutationMessage}/>
        <input type="button" onClick={this.onMutationSubmit.bind(this)} value="Mutate"/>

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
