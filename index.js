// Import the ApolloServer class from apollo-server
const { ApolloServer } = require("apollo-server"); 

// Import the importSchema function to load the GraphQL schema from a file
const { importSchema } = require("graphql-import");

// Import the custom EtherDataSource class 
const EtherDataSource = require("./datasource/ethDatasource");

// Load the GraphQL schema from the schema.graphql file
const typeDefs = importSchema("./schema.graphql"); 

// Load environment variables from .env file
require("dotenv").config();

// Define the resolvers map, with a Query field that calls methods on the data source
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Call etherBalanceByAddress() on the data source
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Call totalSupplyOfEther() on the data source  
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Call getLatestEthereumPrice() on the data source
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Call getBlockConfirmationTime() on the data source
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create the ApolloServer instance, passing typeDefs, resolvers, and dataSources
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Instantiate the EtherDataSource
  }), 
});

// Set timeout to 0 (no timeout)
server.timeout = 0; 

// Start the server on port 9000
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});
