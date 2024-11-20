
<script>
    import Button from  "$lib/components/ui/button/button.svelte"
</script>

<div class="h-[100vh] flex flex-col justify-center items-center p-8">
    <div class="flex flex-col md:flex-row items-center gap-6 justify-evenly w-full h-full">
      
      <div class="flex flex-col items-start max-w-lg text-center md:text-left mb-11">
        <h1 class="text-4xl font-bold mb-4">
          Library Management System
        </h1>
        <p class="text-lg text-gray-400">
          Manage your library efficiently with our system. Keep track of books,
          manage inventories, and organize your collection seamlessly. Our
          application allows you to browse, borrow, and return books with ease.
          Stay on top of your library operations in an organized and hassle-free way.
        </p>
        <Button href="/allbooks" class="mt-4"  >
          Explore Books
        </Button>
      </div>
  
      <!-- Removed Next.js Image and added regular img -->
      <div class="flex items-center justify-between mt-8 md:mt-0">
        <img
          src="/library.jpg" 
          alt="Library"       
          class="w-[400px] h-[400px] rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
  