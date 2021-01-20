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
    startDate: Date
    dueDate: Date
    createdAt: Date
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
    addUser(username: String!, email: String!, displayName: String!, firstName: String!, lastName: String!, password: String!, profilePhoto: String, interests: String): Auth
    editUser(username: String!, email: String!, displayName: String!, firstName: String!, lastName: String!, password: String!, profilePhoto: String): Auth
    addGoal(goalTitle: String!, goalDescription: String!, goalStatus: String!, goalCategory: String, startDate: Date!, dueDate: Date): Goal
    editGoal(goalTitle: String!, goalDescription: String!, goalStatus: String!, goalCategory: String, startDate: Date!, dueDate: Date): Goal
    addMilestone(goalId: ID!, milestoneTitle: String!): Goal
    deleteMilestone(milestoneId: ID!): Milestone
    addComment(goalId: ID!, commentBody: String!): Goal
    requestFriend(friendId: ID!): User
    acceptFriend(friendId: ID!): User
    deleteFriend(friendId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
