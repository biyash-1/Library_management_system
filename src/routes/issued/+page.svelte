<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import * as Table from "$lib/components/ui/table";

  export let data: {
    books: Array<{
      id: string;
      name: string;
      author: string;
      publishedYear: number;
      genre: string;
      ISBN: string;
      price: number;
      imageUrl: string;
      issuedDate: string;
    }>;
    isAuthenticated: boolean;
  };

  const { books, isAuthenticated } = data;

  // Check for authentication and redirect if not authenticated
  onMount(() => {
    if (!isAuthenticated) {
      goto("/login"); // Redirect to login page if not authenticated
    }
  });

  console.log("Books:", books);
</script>

<h1 class="text-3xl font-bold w-full text-center p-4">Your Issued Books</h1>

{#if books.length > 0}
  <Table.Root class="table-auto w-[75%] mx-auto">
    <Table.Header class="w-full dark:bg-slate-800 bg-rose-200">
      <Table.Row>
        <Table.Head class="w-[100px]">Name</Table.Head>
        <Table.Head>Image</Table.Head>
        <Table.Head>Author</Table.Head>
        <Table.Head>Published Year</Table.Head>
        <Table.Head>Genre</Table.Head>
        <Table.Head>ISBN</Table.Head>
        <Table.Head>Price</Table.Head>
        <Table.Head>Issued Date</Table.Head>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {#each books as book (book.id)}
        <Table.Row>
          <Table.Cell class="font-medium w-[200px]">{book.name}</Table.Cell>
          <Table.Cell class="w-[100px]">
            <img
              src={book.imageUrl}
              alt={book.name}
              class="object-cover w-16 h-16"
            />
          </Table.Cell>
          <Table.Cell>{book.author}</Table.Cell>
          <Table.Cell>{book.publishedYear}</Table.Cell>
          <Table.Cell>{book.genre}</Table.Cell>
          <Table.Cell>{book.ISBN}</Table.Cell>
          <Table.Cell>${book.price}</Table.Cell>
          <Table.Cell>{new Date(book.issuedDate).toLocaleDateString()}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
{:else}
  <p class="text-center text-xl font-semibold mt-6">No issued books found.</p>
{/if}
