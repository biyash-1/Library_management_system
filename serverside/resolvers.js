import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/userModel.js';
import Book from './models/bookModel.js';




const resolvers = {

  Query: {
    books: async () => {
      return await Book.find();
    },
    book: async (_, { id }) => {
      return await Book.findById(id);
    },
    users: async () => {
      return await User.find();
    },
    // New query to fetch issued books for a user
    getIssuedBooks: async (_, { userId }) => {
      if (!userId) {
        throw new Error('User ID is required');
      }
      console.log("Received User ID:", userId); // Debugging step
    
      try {
        // Query for books where issuedTo array contains the user's ObjectId
        const books = await Book.find({
          issuedTo: userId,
        }).exec();
    
        if (books.length === 0) {
          throw new Error('No books found for this user');
        }
    
        // Convert issuedDate to ISO string for each book
        return books;
      } catch (error) {
        throw new Error('Error retrieving issued books');
      }
    },  
    
    // getIssueBooks: async (_, { userId }) => {
    //   if (!userId) {
    //     throw new Error('User ID is required');
    //   }
    //   console.log("Received User ID:", userId);

    //   try {
    //     // Ensure userId is a valid ObjectId
      

    //     // Query for books where issuedTo array contains the user's ObjectId
    //     const books = await Book.find({
    //       issuedTo: userId,
    //     }).exec();

    //     if (books.length === 0) {
    //       throw new Error('No books found for this user');
    //     }

    //     return books;
    //   } catch (error) {
    //     throw new Error('Error retrieving issued books: ' + error.message);
    //   }
    // },
    getDashboardData: async () => {
      try {
        const totalBooks = await Book.countDocuments();
        const issuedBooks = await Book.countDocuments({ status: 'issued' });
        const totalStudents = await User.countDocuments({ role: 'user' });

        return {
          totalBooks,
          issuedBooks,
          totalStudents,
        };
      } catch (error) {
        throw new Error('Failed to fetch dashboard data: ' + error.message);
      }
    },

    
  },
  Mutation: {
    signup: async (_, { username, email, password, confirmPassword,sid, phone }) => {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        username,
        email,
        password: hashedPassword,
        sid,
        phone,
      });

      await user.save();

      const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

      return {
        token,
        user,
      };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return {
        token,
        user,
      };
    },
    addBook: async (_, { name, author, publishedYear, genre, ISBN, price, imageUrl }) => {
      try {
        const newBook = new Book({
          name,
          author,
          publishedYear,
          genre,
          ISBN,
          price: parseFloat(price),
          imageUrl
        });

        await newBook.save();
        return newBook;
      } catch (error) {
        throw new Error('Error adding book: ' + error.message);
      }
    },    deleteBook: async (_, { id }) => {
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        throw new Error('Book not found');
      }
      return book;
    },
    updateBook: async (_, { id, name, author, publishedYear, genre, ISBN, price, image }) => {
      const book = await Book.findByIdAndUpdate(
        id,
        { name, author, publishedYear, genre, ISBN, price, image },
        { new: true }
      );
      if (!book) {
        throw new Error('Book not found');
      }
      return book;
    },
    issueBook: async (_, { bookISBN, sid }) => {
      try {
        console.log('Attempting to issue book');
        console.log('Received ISBN:', bookISBN);
        console.log('Received Student ID:', sid);
    
        // Validate request
        if (!bookISBN || !sid) {
          console.error('Error: ISBN and student ID are required');
          throw new Error('ISBN and student ID are required');
        }
    
        // Find the book based on ISBN
        const book = await Book.findOne({ ISBN: bookISBN });
        if (!book) {
          console.error(`Error: Book with ISBN ${bookISBN} not found`);
          throw new Error(`Book with ISBN ${bookISBN} not found`);
        }
        console.log('Book found:', book);
    
        // Find the student using sid
        const student = await User.findOne({ sid });
        if (!student) {
          console.error(`Error: Student with sid ${sid} not found`);
          throw new Error(`Student with sid ${sid} not found`);
        }
        console.log('Student found:', student);
    
        // Check if the book is already issued to the same student
        if (book.issuedTo.includes(student._id)) {
          console.warn('Warning: This book is already issued to this student');
          throw new Error('This book is already issued to this student');
        }
    
        // Update the book status and issuedTo array
        book.status = 'issued';
        book.issuedTo.push(student._id);
        book.issuedDate = new Date();
        console.log('Updated book status and issuedDate:', {
          status: book.status,
          issuedTo: book.issuedTo,
          issuedDate: book.issuedDate,
        });
    
        // Log before saving the book
        console.log('Saving book with updated issuedDate:', book.issuedDate);
        await book.save();
        console.log('Book saved successfully');
    
        // Verify after save
        const savedBook = await Book.findOne({ ISBN: bookISBN });
        console.log('Verified saved book:', {
          status: savedBook?.status,
          issuedDate: savedBook?.issuedDate,
          issuedTo: savedBook?.issuedTo,
        });
    
        return {
          message: 'Book issued successfully',
          book,
          student: student.username,
          issuedDate: book.issuedDate.toISOString(),
        };
      } catch (error) {
        console.error('Error during issueBook operation:', error);
        throw new Error(error.message);
      }
    },

  },
};

export default resolvers;
