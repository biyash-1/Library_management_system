import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import authenticate from './middleWare.js';
import connectToDatabase from './dbcon.js';
import dotenv from 'dotenv';
import express from 'express';

import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


connectToDatabase();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-apollo-operation-name', 'apollo-require-preflight'], // Add your required headers
  credentials: true,
  csrfPrevention: true,
}));



app.post('/upload', async (req, res) => {
  try {
    const file = req.files?.file; // Assume `file` is obtained from a form submission

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'books', // Optional: specify folder
    });

    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});


// Attach the Express app to the Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const { user } = await authenticate({ req });
    return { user }; // Pass user to resolvers
  },
  cors: { origin: 'http://localhost:5173' },
  credentials: true,
  expressApp: app,
});

console.log(`🚀 Server ready at: ${url}`);
