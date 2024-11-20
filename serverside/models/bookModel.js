import mongoose from 'mongoose';
const { Schema } = mongoose;
// Define the Book schema
const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl:{
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['available', 'issued'],
    default: 'available',
  },
  issuedDate: {
    type: Date,
    default: null,
    
  },
  issuedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
});

export default mongoose.model('Book', bookSchema);

