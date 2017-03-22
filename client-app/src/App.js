import React, { Component } from "react";
import { gql, graphql } from "react-apollo";
import { subsObservable } from "./net_interface";

class App extends Component {

  constructor() {
    super();
    this.state = {
      messageList: []
    };
    this.subscription = this.subscribe();
    console.log(`Subscribed for new messages with ID: ${this.subscription._networkSubscriptionId}`);
  }

  subscribe = () => {
    return subsObservable.subscribe({
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
)(App)
