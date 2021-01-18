const { AuthenticationError } = require('apollo-server-express');
const { User, Goal } = require('.');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('goals')
            .populate('friends');
        
            return userData;
        }
        
        throw new AuthenticationError('Not logged in');
      },
      // get all users
      users: async () => {
        return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('goals');
      },
      // get a user by username
      user: async (parent, { username }) => {
        return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('goals');
      },
      goals: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Goal.find(params).sort({ createdAt: -1 });
      },  
      Goal: async (parent, { _id }) => {
        return Goal.findOne({ _id });
      }          
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
        },
        addGoal: async (parent, args, context) => {
            if (context.user) {
              const goal = await Goal.create({ ...args, username: context.user.username });
          
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { goals: goal._id } },
                { new: true }
              );
          
              return goal;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },
        addComment: async (parent, { goalId, commentBody }, context) => {
            if (context.user) {
              const updatedGoal = await Ggoal.findOneAndUpdate(
                { _id: goalId },
                { $push: { comments: { commentBody, username: context.user.username } } },
                { new: true, runValidators: true }
              );
          
              return updatedGoal;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        }          
    }
};
  
module.exports = resolvers;
  