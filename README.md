# Apollo GraphQL Subscriptions Example

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
2. Open another browser window with [GraphiQL](http://localhost:5060/graphiql?operationName=&query=mutation+AddMessage+%7B+addMessage%28message%3A+%22Hello+from+Apollo+Susbcriptions%22%29%7D) and press ►

Your client page should now be displaying the new message.

Using CURL to exercise GraphQL Mutation:
```bash
curl -k -H "Content-Type: application/json" -X POST -d '{ "operationName": null, "query": "mutation { addMessage(message: \"My CURL message\") }", "variables": "{}" }' http://localhost:5060/graphql
```

## Using the withApollo decorator

For an example using the [***withApollo***](http://dev.apollodata.com/react/higher-order-components.html#withApollo) decorator see the [withApollo branch](/bmsantos/apollo-graphql-subscriptions-example/tree/withApollo).


## Using Apollo's susbcribeToMore

Checkout [subscribeToMore branch](/bmsantos/apollo-graphql-subscriptions-example/tree/subscribeToMore) for an example implementation using Apollo's [***subscribeToMore***](http://dev.apollodata.com/react/subscriptions.html#subscribe-to-more) subscription callback function.
