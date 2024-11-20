<script lang="ts">
  import { getClient } from '$lib/graphqlClient';
  import { ISSUE_BOOK_MUTATION } from '$lib/queries/bookQuery';

  let isbn = '';
  let studentId = '';
  let message = '';

  const issueBook = async () => {
    try {
      console.log('Attempting to issue book with ISBN:', isbn, 'and student ID:', studentId);
      const client = getClient();

      // Assert the type of response
      const response = await client.request<{
        issueBook: {
          message: string;
          student: string;
          issuedDate: string;
        };
      }>(ISSUE_BOOK_MUTATION, { bookISBN: isbn, sid: studentId });

      console.log('GraphQL response:', response);
      if (response.issueBook && response.issueBook.message) {
        message = `Book issued to ${response.issueBook.student}. Issue Date: ${response.issueBook.issuedDate}`;
      } else {
        throw new Error('Failed to issue the book. No response message received.');
      }
    } catch (error: any) {
      console.error('Error issuing book:', error);
      message = error.response?.errors?.[0]?.message || 'Failed to issue book. Please try again later.';
    }
  };
</script>



<div class="issue-book-form">
  <h2 class="text-xl font-bold">Issue Book</h2>
  <div>
    <label for="isbn">Book ISBN</label>
    <input
      type="text"
      id="isbn"
      bind:value={isbn}
      class="border p-2"
      placeholder="Enter ISBN"
    />
  </div>

  <div>
    <label for="studentId">Student ID</label>
    <input
      type="text"
      id="studentId"
      bind:value={studentId}
      class="border p-2"
      placeholder="Enter Student ID"
    />
  </div>

  <button on:click={issueBook} class="bg-blue-500 text-white p-2 mt-2">Issue Book</button>

  {#if message}
    <p class="mt-2">{message}</p>
  {/if}
</div>
