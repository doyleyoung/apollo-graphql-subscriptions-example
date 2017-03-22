# Apollo Client Error Template

Welcome! If you are here then you were likely referred to this repo when reporting an error to [`apollographql/apollo-client`][1]. The core team is invested in making the best client for GraphQL possible, so when you hit an error it is important to the team that the error is resolved as soon as possible.

Unfortunately, describing an error in GitHub is often not enough to truly understand the reported issue. By creating a small reproduction test case using this template repo the Apollo Client team will be able to identify and fix your error much faster then they could without.

This repo was created with [`create-react-app`][2] for a great developer experience. If you are not using React then a small reproduction case with your framework of choice would go a long way.

To get started writing your error case just clone this repository to your GitHub account, install all dependencies with `npm install`, start the development server with `npm start`, make the changes that will reproduce this error locally, and push your changes to GitHub where the `apollo-client` team can see them.

To make changes in the GraphQL schema make sure to look at the `./src/graphql` folder where we define a GraphQL schema using [GraphQL.js][3] which will run in the browser.

[1]: https://github.com/apollographql/apollo-client
[2]: https://github.com/facebookincubator/create-react-app
[3]: http://graphql.org/graphql-js/
