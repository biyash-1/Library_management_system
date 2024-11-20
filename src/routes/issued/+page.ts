import {jwtDecode} from 'jwt-decode';
import { authStore } from '$lib/stores/authStore';
import { getClient } from '$lib/graphqlClient';
import { GET_ISSUED_BOOKS_QUERY } from '$lib/queries/bookQuery';

interface DecodedToken {
  userId: string;
  // Add other properties as needed
}

interface Book {
  id: string;
  name: string;
  author: string;
  publishedYear: number;
  genre: string;
  ISBN: string;
  price: number;
  imageUrl: string;
  issuedDate: string;
  
}

interface GetIssuedBooksResponse {
  getIssuedBooks: Book[];
}

export async function load() {
  let token: string | null = null;

  // Subscribe to authStore to get the token
  const unsubscribe = authStore.subscribe(auth => {
    token = auth.token;
  });

  // Unsubscribe after extracting the token
  unsubscribe();

  if (!token) {
    console.warn('Token is null or undefined');
    return { books: [], isAuthenticated: false };
  }

  // Decode the token to extract userId
  let userId: string | null = null;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    userId = decoded.userId;
    console.log('Extracted userId from token:', userId);
  } catch (error) {
    console.error('Error decoding token:', error);
    return { books: [], isAuthenticated: false };
  }

  // Check if userId was successfully extracted
  if (!userId) {
    console.warn('Failed to extract userId from token');
    return { books: [], isAuthenticated: false };
  }

  const client = getClient();

  try {
    const response = await client.request<GetIssuedBooksResponse>(GET_ISSUED_BOOKS_QUERY, { userId });
    console.log('Books response:', response);
  
    // Format the issuedDate for each book and create a new array
    const booksWithFormattedDate = response.getIssuedBooks.map(book => {
      return {
        ...book, // Copy all existing properties
        issuedDate: new Date(parseInt(book.issuedDate)).toLocaleDateString() // Format issuedDate
      };
    });
  
    // Log formatted books for verification
    console.log('Books with formatted issuedDate:', booksWithFormattedDate);
  
    // Return the updated books array
    return { books: booksWithFormattedDate, isAuthenticated: true };
  } catch (error) {
    console.error('Error fetching books:', error);
    return { books: [], isAuthenticated: false };
  }
}  
