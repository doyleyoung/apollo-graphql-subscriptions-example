import React, { Component } from "react";
import { gql, graphql, withApollo } from "react-apollo";

//@withApollo - react-scripts do not yet support decorators - https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#can-i-use-decorators
class App extends Component {

  constructor() {
    super();
    this.state = {
      messageList: []
    };
  }

  subscribe = () => {
    let subOptions = {
      query: gql`
          subscription onNewMessage {
              newMessage
          }
      `,
      variables: {}
    };

    return this.props.client
    .subscribe(subOptions)
    .subscribe({
      error: (error) => {
        console.log(`Subscription error: ${error}`);
      },
      next: (result) => {
        console.log(`Subscription newMessage result: ${result.newMessage}`);
        this.onNewMessage(result.newMessage);
      }
    });
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      messageList: [...nextProps.data.messages]
    });
    this.subscription = this.subscribe();
    console.log(`Subscribed for new messages`);
  };

  componentWillUnmount = () => {
    this.subscription.unsubscribe();
  };

  onNewMessage = (message) => {
    this.setState({
      messageList: [...this.state.messageList, message]
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
            mutation {'{'} addMessage(message: "My message") {'}'}
            <br />
            <br />
            You should see a console entry in this window with the above message.
          </p>
        </header>
        { loading ? (<p>Loading…</p>) : (
          <ul> { this.state.messageList.map(entry => JSON.parse(entry)).map(entry => (
            <li key={entry.id}>{entry.message}</li>)) }
          </ul> )}
      </main>
    );
  }
}

export default graphql(
  gql`query {
      messages
  }`,
)(withApollo(App))
