<script lang="ts">

  import { getClient } from '$lib/graphqlClient';
  import * as Table from "$lib/components/ui/table";
  import Label from "$lib/components/ui/label/label.svelte";
  import Button from '$lib/components/ui/button/button.svelte';

  import {UPDATE_BOOK_MUTATION, DELETE_BOOK_MUTATION} from '$lib/queries/bookQuery';

  interface Book {
    id: string;
    name: string;
    author: string;
    publishedYear: number;
    genre: string;
    ISBN: string;
    price: number;
    imageUrl: string;
  }
  interface UpdateBookResponse {
  updateBook: Book;
}
  export let data;
  let books: Book[] = data.books;
  let errorMessage: string | null = null;

  let showModal = false;
  let currentBook: Book | null = null;

  let updatedBook = {
    author: '',
    publishedYear: 0,
    genre: '',
    price: 0,
  };

  let currentPage = 1;
  const itemsPerPage = 5;

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handleEdit = (book: Book) => {
    currentBook = book;
    updatedBook = {
      author: book.author,
      publishedYear: book.publishedYear,
      genre: book.genre,
      price: book.price,
    };
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
    currentBook = null;
  };

  const handleUpdate = async () => {
  if (currentBook) {
    try {
      console.log('Attempting to update book:', updatedBook); // Log the updated book data

      const client = getClient();
      const response = await client.request<UpdateBookResponse>(UPDATE_BOOK_MUTATION, {
        id: currentBook.id,
        author: updatedBook.author,
        publishedYear: updatedBook.publishedYear,
        genre: updatedBook.genre,
        price: updatedBook.price,
      });

      console.log('GraphQL response:', response); // Log the response

      const updated = response.updateBook;
      if (updated) {
        // Update the local books array with the updated book data
        books = books.map((book) => (book.id === updated.id ? updated : book));
        console.log('Updated books array:', books); // Log the updated books array

        closeModal();
        errorMessage = null; // Clear any previous error message
      } else {
        throw new Error('Update response is missing data');
      }
    } catch (error) {
      console.error('Error updating book:', error); // Log detailed error information
      errorMessage = 'Failed to update book. Please try again later.';
    }
  }
};
const handleDelete = async (bookId: string) => {
  try {
    console.log('Attempting to delete book with ID:', bookId); // Log the book ID being deleted

    const client = getClient();
    const response = await client.request<{ deleteBook: { id: string; message: string } }>(
      DELETE_BOOK_MUTATION,
      { id: bookId }
    );

    console.log('GraphQL response:', response); // Log the response

    if (response.deleteBook && response.deleteBook.id) {
      // Remove the book from the local books array
      books = books.filter((book) => book.id !== response.deleteBook.id);
      console.log('Updated books array after deletion:', books); // Log the updated books array
      errorMessage = null; // Clear any previous error message
    } else {
      throw new Error('Failed to delete the book. No ID returned.');
    }
  } catch (error) {
    console.error('Error deleting book:', error); // Log detailed error information
    errorMessage = 'Failed to delete book. Please try again later.';
  }
};
  const getPaginatedBooks = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return books.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    currentPage = newPage;
  };
</script>

<div class="p-6 min-h-screen items-center">
  <h1 class="text-3xl font-bold mb-6">All Books</h1>

  {#if errorMessage}
    <p class="text-red-500 italic">{errorMessage}</p>
  {:else if books.length > 0}
    <Table.Root class="table-auto w-full">
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[100px]">Image</Table.Head>
          <Table.Head>Name</Table.Head>
          <Table.Head>Author</Table.Head>
          <Table.Head>Published Year</Table.Head>
          <Table.Head>Genre</Table.Head>
          <Table.Head>ISBN</Table.Head>
          <Table.Head>Price</Table.Head>
          <Table.Head class="text-center">Actions</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each getPaginatedBooks() as book (book.id)}
          <Table.Row>
            <Table.Cell class="w-[100px]">
            <img src="{book.imageUrl}" alt={book.name} class="object-cover w-16 h-16" />
            </Table.Cell>
            <Table.Cell class="font-medium">{book.name}</Table.Cell>
            <Table.Cell>{book.author}</Table.Cell>
            <Table.Cell>{book.publishedYear}</Table.Cell>
            <Table.Cell>{book.genre}</Table.Cell>
            <Table.Cell>{book.ISBN}</Table.Cell>
            <Table.Cell class="text-right">${book.price}</Table.Cell>
            <Table.Cell class="flex gap-2 items-center justify-center mt-2">
              <Button on:click={() => handleEdit(book)}>Edit</Button>
              <Button on:click={() => handleDelete(book.id)}>Delete</Button>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>

    <!-- Pagination Controls -->
    <div class="flex justify-center mt-2">
      <Button on:click={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
      <span class="items-center mt-2 mx-1">{currentPage} / {totalPages}</span>
      <Button on:click={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
    </div>
  {:else}
    <p class="text-gray-500">No books available</p>
  {/if}
</div>

{#if showModal && currentBook}
  <!-- Modal -->
  <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div class="bg-slate-800 p-6 rounded-md w-2/3 flex gap-6">
      <img
        src={currentBook.imageUrl}
        alt={currentBook.name}
        class="w-1/3 object-cover rounded-md"
      />
      <div class="flex-1">
        <h2 class="text-xl font-bold mb-4">Edit Book</h2>
        <div class="mb-4">
          <Label class="text-sm font-medium">Author</Label>
          <input
            type="text"
            class="mt-2 p-2 border w-full rounded"
            bind:value={updatedBook.author}
          />
        </div>
        <div class="mb-4">
          <Label class="text-sm font-medium">Published Year</Label>
          <input
            type="number"
            class="mt-2 p-2 border w-full rounded"
            bind:value={updatedBook.publishedYear}
          />
        </div>
        <div class="mb-4">
          <Label class="text-sm font-medium">Genre</Label>
          <input
            type="text"
            class="mt-2 p-2 border w-full rounded"
            bind:value={updatedBook.genre}
          />
        </div>
        <div class="mb-4">
          <Label class="text-sm font-medium">Price</Label>
          <input
            type="number"
            class="mt-2 p-2 border w-full rounded"
            bind:value={updatedBook.price}
          />
        </div>
        <div class="flex gap-2 justify-end">
          <Button on:click={closeModal}>Cancel</Button>
          <Button on:click={handleUpdate}>Update</Button>
        </div>
      </div>
    </div>
  </div>
{/if}
