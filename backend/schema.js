
import { makeExecutableSchema } from 'graphql-tools';
import courseResolver from './resolvers/course-resolver';
import carResolver from './resolvers/car-resolver';

const typeDefs = [`
  type Course {
    id: String
    title: String
    author: String
    description: String
    topic: String
    url: String
    voteCount: Int
  }
  type Car {
    id: String
    brand: String
    model: String
    imageUrl: String
  }
  type Query {
    allCourses(searchTerm: String): [Course]
    course(id: String!): Course
    allCars(searchTerm: String): [Car]
    car(id: String): Car
  }
  type Mutation {
    addCourse(
      title: String!, author: String!, description: String!, topic: String, url: String
    ): Course
    upvote(id: String!): Course
    downvote(id: String): Course
    addCar(
      brand: String!, model: String!, imageUrl: String
    ): Car
  }
`];

const resolvers = {
  Query: (Object.assign(carResolver.Query, courseResolver.Query)),
  Mutation: (Object.assign(carResolver.Mutation, courseResolver.Mutation))
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
