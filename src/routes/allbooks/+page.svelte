<script lang="ts">
  export let data: {
    books: Array<{
      id: string;
      name: string;
      author: string;
      publishedYear: number;
      genre: string;
      ISBN: string;
      price: number;
      issuedDate: string | null;
      imageUrl: string;
    }>;
  };

  // Extracting books from the data object
  let books = data.books;
  console.log('Books data:', books); 

  let searchQuery = '';
  
  function filterBooks() {
    if (!searchQuery.trim()) {
      return books; // Return all books if the query is empty
    }
    return books.filter((book) =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }// Ensure books array is available
</script>

<div class="p-8">
  <h1 class="text-4xl font-bold text-center mb-8">Library Books</h1>
  <div class="mb-5 flex justify-center">
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search by book name, author, or genre..."
      class="w-1/2 max-w-lg p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
    />
  </div>

  <!-- Grid container for the cards -->
  {#if books && books.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {#each filterBooks() as book (book.id)}
        <div class="w-[250px] rounded-lg shadow-lg overflow-hidden border-2 flex flex-col items-center justify-center transform transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl dark:hover:bg-slate-900 hover:bg-red-200">
          <!-- Image at the top of the card -->
          <img
            src={book.imageUrl}
            alt={`Cover of ${book.name}`}
            class="w-full h-[250px] object-contain"
          />
          
          <div class="p-3 flex flex-col items-center">
            <h3 class="text-xl font-semibold">{book.name}</h3>
            <p class="text-gray-600 mt-2">{book.author}</p>
            <p class="text-lg font-bold text-pink-600 mt-2">${book.price}</p>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p>No books available.</p>
  {/if}
</div>
