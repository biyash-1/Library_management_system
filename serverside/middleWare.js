import jwt from 'jsonwebtoken';
import User from './models/userModel.js';

const authenticate = async ({ req }) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  // If there's no token, allow the request to proceed as an unauthenticated request
  if (!token) {
    return { user: null }; // Return null for unauthenticated user
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    return { user };
  } catch (error) {
    console.error("Authentication error:", error);
    return { user: null }; // Handle invalid token by setting user as null
  }
};

export default authenticate;
