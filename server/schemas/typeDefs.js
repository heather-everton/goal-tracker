// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: Stringser
    friendCount: Int
    goals: [Goal]
    friends: [User]
  }
  type Goal {
    _id: ID
    goalTitle: String
    goalDescription: String
    goalType: String
    goalStatus: String
    dueDate: String
    createdAt: String
    username: String
    commentCount: Int
    comments: [Comment]
  }
  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    goals(username: String): [Gaol]
    goal(_id: ID!): Goal
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGoal(goalTitle: String!, goalDescription: String!, goalType: String!, dueDate: String): Goal
    addComment(goalId: ID!, commentBody: String!): Goal
    addFriend(friendId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
