# Apollo GraphQL Subscriptions Example

<p align="center">
  <img src="https://github.com/bmsantos/apollo-graphql-subscriptions-example/raw/filtering/subs.gif" />
</p>


Simple application used to demonstrate minimalistic setup for an Apollo GraphQL Subscriptions architecture.

## System Architecture

```text
  .---------.                            .--------.
  | Client  |-.        GET /             | Web    |
  | Browser | | -----------------------> | Server |
  '---------' |                          '--------'
    '---------'
         |
         |                               .---------.
         |          GET /graphiql        | GraphQL |
         '-----------------------------> | Server  |
                    Websocket            '---------'
```

 * Browser starts by connecting to Web App and fetch available messages
 * Web page opens websocket tunnel to GraphQL server and subscribes to new messages
 * GraphQL mutations can then be submitted to the GraphQL server and new messages submitted to websocket clients for browser update



## Start Susbcription Client and Server apps

In a terminal do:

```bash
cd server-app
yarn start
```

In another terminal

```bash
cd client-app
yarn start
```

## Test it

1. Open a browser window with the [client page](http://localhost:3000)
2. Open another browser window with [GraphiQL](localhost:5060/graphiql?operationName=AddMessage&query=mutation+AddMessage%28%24message%3A+String%21%2C+%24broadcast%3A+Boolean%21%29+%7B%0A+addMessage%28message%3A+%24message%2C+broadcast%3A+%24broadcast%29%0A%7D&variables=%7B%0A+%22message%22%3A+%22Kombucha%22%2C%0A+%22broadcast%22%3A+true%0A%7D) and press ►



Your client page should now be displaying the new message.

Using CURL to exercise GraphQL Mutation:
```bash
curl -k -H "Content-Type: application/json" -X POST -d '{ "operationName": null, "query": "mutation AddMessage { addMessage(message: \"My CURL message\", broadcast: false) }", "variables": "{}" }' http://localhost:5060/graphql
```

## Using the subscription Observable

Check the [observable](https://github.com/bmsantos/apollo-graphql-subscriptions-example/tree/observable) branch for the simplest subscription implementation.


## Using the withApollo decorator

For an example using the [***withApollo***](http://dev.apollodata.com/react/higher-order-components.html#withApollo) decorator see the [withApollo branch](https://github.com/bmsantos/apollo-graphql-subscriptions-example/tree/withApollo).


## Using Apollo's susbcribeToMore

Checkout [subscribeToMore branch](https://github.com/bmsantos/apollo-graphql-subscriptions-example/tree/subscribeToMore) for an example implementation using Apollo's [***subscribeToMore***](http://dev.apollodata.com/react/subscriptions.html#subscribe-to-more) subscription callback function.
