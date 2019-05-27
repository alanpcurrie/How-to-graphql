


/**
  * @desc graphql-yoga is a fully-featured GraphQL server.
  * It is based on Express.js and a few other libraries to help you build production-ready GraphQL servers.
*/

const { GraphQLServer } = require('graphql-yoga')
/**
  * @desc This dependency is required to make the auto-generated Prisma client work.
  * Now you can attach the generated prisma client instance to the context so that your resolvers get access to it.
*/

const { prisma } = require('./generated/prisma-client')

/**
  * @desc The links variable is used to store the links at runtime. For now, everything is stored only in-memory rather than being persisted in a database.
  * @param string
*/

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

/**
  * @desc A new resolver for the feed root field. A resolver always has to be named after the corresponding field from the schema definition.
  * Three more resolvers for the fields on the Link type from the schema definition. We’ll discuss in a bit what the parent argument is that’s passed into the resolver here.
  * @return link
*/

const resolvers = {
  Query,
  Mutation,
  User,
  Link
}

/**
  * @desc Instead of attaching an object directly, you’re now creating the context as a function which returns the context.
  * The advantage of this approach is that you can attach the HTTP request that carries the incoming GraphQL query (or mutation) to the context as well.
  * This will allow your resolvers to read the Authorization header and validate if the user who submitted the request is eligible to perform the requested operation.
*/


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})


/**
  * @desc testing the server - run node src/index.js - the server is running on http://localhost:4000
  *  GraphQL Playground, a powerful “GraphQL IDE
*/

server.start(() => console.log(`hello from the server`))