<script lang="ts">
  // Define the interface for the dashboard data
  interface DashboardData {
    totalBooks: number;
    issuedBooks: number;
    totalStudents: number;
  }

  // The data prop will be an object containing dashboardData or null
  export let data: { dashboardData: DashboardData | null };
  export let dashboardData: DashboardData | null = data.dashboardData; // Safely handle it as possibly null
</script>

{#if dashboardData}
<div class="flex flex-col items-center p-5 mx-auto text-center">
  <div class="p-6 rounded-lg  mb-8">
    <h1 class="text-3xl font-bold mb-4 text-center">Welcome Admin</h1>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-9">
    <!-- Card for Total Books -->
    <div class="p-6 rounded-lg shadow-xl h-[150px] w-[200px] border border-gray-200 bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-2xl hover:scale-105 transition-transform duration-300">
      <h2 class="text-lg font-bold mb-2">Total Books</h2>
      <p class="text-3xl font-semibold text-center">{dashboardData.totalBooks}</p>
    </div>

    <!-- Card for Issued Books -->
    <div class="p-6 rounded-lg shadow-xl border border-gray-200 bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-2xl hover:scale-105 transition-transform duration-300">
      <h2 class="text-lg font-bold mb-2">Issued Books</h2>
      <p class="text-3xl font-semibold text-center">{dashboardData.issuedBooks}</p>
    </div>

    <!-- Card for Total Students -->
    <div class="p-6 rounded-lg shadow-xl border border-gray-200 bg-gradient-to-r from-pink-500 to-red-500 text-white hover:shadow-2xl hover:scale-105 transition-transform duration-300">
      <h2 class="text-lg font-bold mb-2">Total Students</h2>
      <p class="text-3xl font-semibold text-center">{dashboardData.totalStudents}</p>
    </div>
  </div>
</div>
{:else}
  <p class="text-red-500">Failed to load dashboard data.</p>
{/if}