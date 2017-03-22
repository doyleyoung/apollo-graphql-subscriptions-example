# ApolloClient GraphQL Issue

ApolloClient fails to provide subscription hook "subscribeToMore".

## Start server

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

See [net_interface.js](https://github.com/bmsantos/graphql_subscriptions_issue/blob/master/client-app/src/net_interface.js#L18) for issue.
