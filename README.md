# Apollo GraphQL Subscriptions Example

Apollo Client Subscriptions example

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
2. Open another browser window with [GraphiQL](http://localhost:5060/graphiql?operationName=&query=mutation+%7B+addMessage%28message%3A+%22Hello+from+Apollo+Susbcriptions%22%29%7D)

Your client page should now be displaying the new message.
