<script lang="ts">
  import "../../app.css"
    import Sidebar from '$lib/components/sidebar.svelte';
import { clearAuth } from '$lib/stores/authStore'; // Import the clearAuth function to handle logout
    let errorMessage = '';
  
    const handleLogout = () => {
      try {
        clearAuth(); // Clear the auth store and remove token
        window.location.href = '/login'; // Redirect to login page after logout
      } catch (error) {
        errorMessage = 'An error occurred during logout.';
      }
    };
  </script>
  
 
    <!-- Header Section -->
    <header class= "w-full admin-header mt-1 bg-gray-800 text-white flex justify-around items-center p-2 shadow-md">
      <h1 class="text-xl font-semibold mx-auto">Library Management System</h1>
      <button on:click={handleLogout} class="logout-button bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-200">
        Logout
      </button>
      {#if errorMessage}
        <div class="error-message text-red-500 text-sm mt-2">{errorMessage}</div>
      {/if}
    </header>
    <div class="flex h-screen">
        <!-- Sidebar Section -->
        <div class="w-[300px] bg-gray-800 text-white border-r flex-shrink-0">
          <Sidebar /> <!-- Sidebar content goes here -->
        </div>
  
    <!-- Sidebar Section -->
    <main class=" flex-1 p-4">
        <slot /> <!-- This will load the current route's content -->
        </main>
    
</div>


  <!-- Sidebar content goes here -->
<!-- Main Content Section -->
  
  <style>
    /* Additional styling if needed */
  </style>
  