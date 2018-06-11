
import mongoose from 'mongoose';
import uuid from 'uuid';

const Schema = mongoose.Schema;

const carSchema = new Schema({
    id: {type: String, default: uuid.v1},
    brand: String,
    model: String,
    imageUrl: String
});

carSchema.index({'$**': 'text'});

const model = mongoose.model('car', carSchema);

export default model;