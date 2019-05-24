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

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

/**
  * @desc A new resolver for the feed root field. A resolver always has to be named after the corresponding field from the schema definition.
  * Three more resolvers for the fields on the Link type from the schema definition. We’ll discuss in a bit what the parent argument is that’s passed into the resolver here.
  * @return link
*/

const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: (root, args, context, info) => {
        return context.prisma.links()
      },
    },
    Mutation: {
      post: (root, args, context) => {
        return context.prisma.createLink({
          url: args.url,
          description: args.description,
        })
      },
    },
  }

/**
  * @desc  the schema and resolvers are bundled and passed to the GraphQLServer which is imported from graphql-yoga.
  * This tells the server what API operations are accepted and how they should be resolved.
*/

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma }
})
/**
  * @desc testing the server - run node src/index.js - the server is running on http://localhost:4000
  *  GraphQL Playground, a powerful “GraphQL IDE
*/

server.start(() => console.log(`hello from the server`))