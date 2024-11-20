<script lang="ts">
  import { goto } from '$app/navigation';
  import { Label } from "../../../lib/components/ui/label";
  import { Input } from "../../../lib/components/ui/input";
  import { ADD_BOOK_MUTATION } from '$lib/queries/bookQuery'; // Import the query
  import { getClient } from '$lib/graphqlClient'; // Import your getClient function

  let name = '';
  let author = '';
  let publishedYear = '';
  let genre = '';
  let ISBN = '';
  let price = '';
  let imageFile: File | null = null;
  let loading = false; // Loading state

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    imageFile = target.files ? target.files[0] : null;
  };

  const handleSubmit = async () => {
    if (loading) return; // Prevent submission if already loading
    try {
      if (!imageFile) {
        alert('Please select an image');
        return;
      }

      loading = true; // Set loading state to true
      // Prepare FormData for image upload
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'bookimages'); // Your upload preset
      formData.append('folder', 'books'); // Optional: specify folder in Cloudinary

      // Send the file to Cloudinary
      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dr8hssrjw/upload';
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      console.log('Cloudinary upload response:', data);

      // Ensure image URL is available
      const imageUrl = data.secure_url;
      console.log('Image URL:', imageUrl); // This is the image URL you need

      if (!imageUrl) {
        throw new Error('Image upload did not return a valid URL');
      }

      // Create the mutation variables
      const variables = {
        name,
        author,
        publishedYear: String(publishedYear),
        genre,
        ISBN,
        price: String(price),
        imageUrl, // Use the URL here for the GraphQL mutation
      };

      console.log("variables", variables);

      // Send the mutation request to add the book
      const client = getClient();
      const result = await client.request(ADD_BOOK_MUTATION, variables);

      if (result) {
        alert('Book added successfully!');
        goto('/admin/allbook'); // Navigate to the books list page
      } else {
        throw new Error('Failed to add book');
      }
    } catch (error: any) {
      console.error('Error adding book:', error);
      alert(error.message);
    } finally {
      loading = false; // Set loading state to false once the request is complete
    }
  };
</script>

<div class="p-2 rounded-lg shadow-md w-[60vh] h-screen flex flex-col justify-center items-center">
  <h1 class="text-3xl font-bold text-center">Add New Book</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="mb-5">
      <Label for="name" class="text-sm font-semibold">Name</Label>
      <Input bind:value={name} id="name" type="text" required class="w-full" />
    </div>
    <div class="mb-5">
      <Label for="author" class="text-sm font-semibold">Author</Label>
      <Input bind:value={author} id="author" type="text" required class="w-full" />
    </div>
    <div class="mb-5">
      <Label for="publishedYear" class="text-sm font-semibold">Published Year</Label>
      <Input bind:value={publishedYear} id="publishedYear" type="number" required class="w-full" />
    </div>
    <div class="mb-5">
      <Label for="genre" class="text-sm font-semibold">Genre</Label>
      <Input bind:value={genre} id="genre" type="text" required class="w-full" />
    </div>
    <div class="mb-5">
      <Label for="ISBN" class="text-sm font-semibold">ISBN</Label>
      <Input bind:value={ISBN} id="ISBN" type="text" required class="w-full" />
    </div>
    <div class="mb-5">
      <Label for="price" class="text-sm font-semibold">Price</Label>
      <Input bind:value={price} id="price" type="number" step="0.01" required class="w-full" />
    </div>
    <div class="mb-5">
      <Label for="image" class="text-sm font-semibold">Book Image</Label>
      <input type="file" id="image" accept="image/*" on:change={handleFileChange} class="border p-2 w-full" />
    </div>
    <button 
      type="submit" 
      class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" 
      disabled={loading}
    >
      {#if loading}
        ⏳ Adding Book...
      {:else}
        Add Book
      {/if}
    </button>
  </form>
</div>
