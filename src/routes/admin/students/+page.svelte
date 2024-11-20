<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { getClient } from '$lib/graphqlClient';
  import { GET_ISSUED_BOOKS_QUERY } from '$lib/queries/bookQuery';

  interface Student {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    sid: string;
  }

  // Define a type for the issued books response
  interface IssuedBook {
    id: string;
    name: string;
    author: string;
    ISBN: string;
    price: number;
    issuedDate: string;
  }

  interface GetIssuedBooksResponse {
    getIssuedBooks: IssuedBook[];  // Correcting the field name to match the response
}


  export let data;
  console.log(data);
  let students: Student[] = data.students;

  let modalOpen = false;
  let issuedBooks: IssuedBook[] = [];
  let selectedStudentId = '';

  // Toggle modal visibility
  const openModal = (studentId: string) => {
    selectedStudentId = studentId;
    modalOpen = true;
    viewIssuedBooks(studentId);
  };

  const closeModal = () => {
    modalOpen = false;
    issuedBooks = [];
  };

  // Fetch issued books for a student
  const viewIssuedBooks = async (studentId: string) => {
  const client = getClient();
  try {
    // Fetch the data from the API
    const response = await client.request<GetIssuedBooksResponse>(GET_ISSUED_BOOKS_QUERY, { userId: studentId });
    console.log('Issued books:', response);

    // Format issuedDate for each book
    issuedBooks = response.getIssuedBooks.map(book => {
      return {
        ...book, // Copy all properties of the book
        issuedDate: new Date(parseInt(book.issuedDate)).toLocaleDateString() // Convert issuedDate
      };
    });

  } catch (error) {
    console.error(error);
  }
};

</script>

<div class="p-8">
  <h1 class="text-4xl font-bold text-center mb-8">All students</h1>

  <Table.Root class=" ">
    <Table.Header>
      <Table.Row>
        <Table.Head class="w-[100px]">Name</Table.Head>
        <Table.Head>Student ID</Table.Head>
        <Table.Head>Email</Table.Head>
        <Table.Head>Phone</Table.Head>
        <Table.Head>Actions</Table.Head>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {#each students as student (student.id)}
        <Table.Row>
          <Table.Cell class="font-medium">{student.username}</Table.Cell>
          <Table.Cell>{student.sid}</Table.Cell>
          <Table.Cell>{student.email}</Table.Cell>
          <Table.Cell>{student.phone}</Table.Cell>
          <Table.Cell class="flex gap-2">
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" on:click={() => openModal(student.id)}>
              View issued books
            </button>
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>

<!-- Modal for Displaying Issued Books -->
<!-- Modal for Displaying Issued Books -->
{#if modalOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-slate-800 p-8 rounded-lg shadow-lg w-[90%] md:w-[60%] h-[60%]">
      <h2 class="text-2xl font-semibold mb-4 text-center">Issued Books</h2>
      
      <!-- Table for displaying issued books -->
      {#if issuedBooks.length === 0}
        <p>No books found for this student.</p>
      {:else}
        <Table.Root class="w-full">
          <Table.Header>
            <Table.Row>
              <Table.Head class="">Book Name</Table.Head>
              <Table.Head>Author</Table.Head>
              <Table.Head>ISBN</Table.Head>
              <Table.Head>Price</Table.Head>
              <Table.Head>Issued Date</Table.Head>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {#each issuedBooks as book (book.id)}
              <Table.Row>
                <Table.Cell>{book.name}</Table.Cell>
                <Table.Cell>{book.author}</Table.Cell>
                <Table.Cell>{book.ISBN}</Table.Cell>
                <Table.Cell>{book.price}</Table.Cell>
                <Table.Cell>{book.issuedDate}</Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      {/if}

      <div class="mt-4 flex justify-end">
        <button class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700" on:click={closeModal}>Close</button>
      </div>
    </div>
  </div>
{/if}
