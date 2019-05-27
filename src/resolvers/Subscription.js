/**
  * @desc In the postedBy resolver, you’re first fetching the Link using the prisma client instance and then invoke postedBy on it.
  * Notice that the resolver needs to be called postedBy because it resolves the postedBy field from the Link type in schema.graphql.
*/

function newLinkSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node()
  }

  const newLink = {
    subscribe: newLinkSubscribe,
    resolve: payload => {
      return payload
    },
  }

  function newVoteSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node()
  }

  const newVote = {
    subscribe: newVoteSubscribe,
    resolve: payload => {
      return payload
    },
  }

  module.exports = {
    newLink,
    newVote,
  }