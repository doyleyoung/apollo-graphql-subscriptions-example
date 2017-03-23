# Apollo GraphQL Subscriptions Example

Apollo Client Subscriptions example

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


 * Browser starts by connecting to Web App
 * Web page opens websocket tunnel to GraphQL server and subscribes to new messages
 * GraphQL mutations can then be submitted to the GraphQL server (e.g. using GraphiQL, CURL or any other HTTP client that can POST)


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
2. Open another browser window with [GraphiQL](http://localhost:5060/graphiql?operationName=&query=mutation+%7B+addMessage%28message%3A+%22Hello+from+Apollo+Susbcriptions%22%29%7D) and press ►

Your client page should now be displaying the new message.

Using CURL:
```bash
curl -k -H "Content-Type: application/json" -X POST -d '{ "operationName": null, "query": "mutation { addMessage(message: \"My CURL message\") }", "variables": "{}" }' http://localhost:5060/graphql
```