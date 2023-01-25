//mongoose models
const Trainer = require("../models/Trainer.js");
const Client = require("../models/Client.js");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const TrainerType = new GraphQLObjectType({
  name: "Trainer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    certifications: { type: GraphQLString },
    training: { type: GraphQLString },
    /*client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },*/
  }),
});

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    goals: { type: GraphQLString },
    experience: { type: GraphQLString },
    trainer: {
      type: TrainerType,
      resolve(parent, args) {
        return Trainer.findById(parent.trainerId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    trainers: {
      type: new GraphQLList(TrainerType),
      resolve(parent, args) {
        return Trainer.find();
      },
    },
    trainer: {
      type: TrainerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Trainer.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTrainer: {
      type: TrainerType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        certifications: { type: GraphQLNonNull(GraphQLString) },
        training: {
          type: new GraphQLEnumType({
            name: "TrainingType",
            values: {
              lifestyle: { value: "Lifestyle" },
              sports: { value: "Sports" },
              bodybuilding: { value: "Bodybuilding" },
              powerlifting: { value: "Powerlifting" },
            },
          }),
          defaultValue: "Lifestyle",
        },
      },
      resolve(parent, args) {
        const trainer = new Trainer({
          name: args.name,
          email: args.email,
          phone: args.phone,
          certifications: args.certifications,
          training: args.training,
        });
        return trainer.save();
      },
    },

    deleteTrainer: {
      type: TrainerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Client.find({ trainerId: args.id }).then((clients) => {
          clients.forEach((client) => {
            client.remove();
          });
        });
        return Trainer.findByIdAndRemove(args.id);
      },
    },

    updateTrainer: {
      type: TrainerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        certifications: { type: GraphQLNonNull(GraphQLString) },
        training: {
          type: new GraphQLEnumType({
            name: "UpdateTrainingType",
            values: {
              lifestyle: { value: "Lifestyle" },
              sports: { value: "Sports" },
              bodybuilding: { value: "Bodybuilding" },
              powerlifting: { value: "Powerlifting" },
            },
          }),
          defaultValue: "Lifestyle",
        },
      },
      resolve(parent, args) {
        return Trainer.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              phone: args.phone,
              certifications: args.certifications,
              training: args.training,
            },
          },
          { new: true }
        );
      },
    },

    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        goals: { type: GraphQLNonNull(GraphQLString) },
        experience: {
          type: new GraphQLEnumType({
            name: "ExperienceType",
            values: {
              novice: { value: "Novice" },
              intermediate: { value: "Intermediate" },
              advanced: { value: "Advanced" },
            },
          }),
          defaultValue: "Novice",
        },
        trainerId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
          goals: args.goals,
          experience: args.experience,
          trainerId: args.trainerId,
        });
        return client.save();
      },
    },

    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },

    updateClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        goals: { type: GraphQLNonNull(GraphQLString) },
        experience: {
          type: new GraphQLEnumType({
            name: "UpdateExperienceType",
            values: {
              novice: { value: "Novice" },
              intermediate: { value: "Intermediate" },
              advanced: { value: "Advanced" },
            },
          }),
          defaultValue: "Novice",
        },
        trainerId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              phone: args.phone,
              goals: args.goals,
              experience: args.experience,
              trainerId: args.trainerId,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
