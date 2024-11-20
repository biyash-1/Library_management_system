import { getClient } from '$lib/graphqlClient';
import { GET_ALL_BOOKS_QUERY } from '$lib/queries/bookQuery';

interface Book {
    id: string;
    name: string;
    author: string;
    publishedYear: number;
    genre: string;
    ISBN: string;
    price: any;
    imageUrl: string;
}
export async function load() {
  const client = getClient();

  try {
    // Use the GraphQL client to send the query
    const response: { books: Book[] } = await client.request(GET_ALL_BOOKS_QUERY);
    
    // The structure of the response will depend on your schema
    const books = response.books;
    console.log('Fetched books in books page:', books);

    return { books };
  } catch (err: any) {
    console.error('Error fetching books:', err);
    throw new Error('Unable to load books. Please try again later');
  }
}
