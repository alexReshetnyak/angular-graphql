
import mongoose from 'mongoose';
import carModel from '../models/course';

const resolvers = {
  Query: {
    allCars: (root, {searchTerm}) => {
      if (searchTerm !== '') {
        return courseModel.find({$text: {$search: searchTerm}}).sort({id: 'desc'});
      } else {
        return courseModel.find().sort({id: 'desc'});
      }
    },
    car: (root, {id}) => {
      return courseModel.findOne({id: id});
    }
  },
  Mutation: {
    addCar: (root, {brand, model, imageUrl}) => {
      const car = new carModel({brand, model, imageUrl});
      return car.save();
    }
  }
}

export default resolvers;
