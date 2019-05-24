/**
  * @desc graphql-yoga is a fully-featured GraphQL server.
  * It is based on Express.js and a few other libraries to help you build production-ready GraphQL servers.
*/

const { GraphQLServer } = require('graphql-yoga')


/**
  * @desc The typeDefs constant defines your GraphQL schema
  * @param string This field has the type String!. The exclamation mark in the type definition means that this field can never be null.
*/

const typeDefs = `
type Query {
    info: String!
}
`

/**
  * @desc The resolvers object is the actual implementation of the GraphQL schema.
  * The structure is identical to the structure of the type definition inside typeDefs: Query.info.
  * @param string
  * @return string
*/

const resolvers = {
    Query: {
        info: () => `this is the API of a Hackernews clone`
        // info: () => null,
    }
}

/**
  * @desc  the schema and resolvers are bundled and passed to the GraphQLServer which is imported from graphql-yoga.
  * This tells the server what API operations are accepted and how they should be resolved.
*/

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})
/**
  * @desc testing the server - run node src/index.js - the server is running on http://localhost:4000
  *  GraphQL Playground, a powerful “GraphQL IDE
*/

server.start(() => console.log(`hello from the server`))