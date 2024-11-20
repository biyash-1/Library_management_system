<script lang="ts">
    import ModeToogle from "../lib/components/ui/modeToogle.svelte";
    import { goto } from "$app/navigation";
    import Button from "../lib/components/ui/button/button.svelte";
    import { authStore, clearAuth } from "$lib/stores/authStore"; // Directly use `$authStore` to make it reactive

  // Check if the user is logged in
  let isLoggedIn = false;
    authStore.subscribe((auth) => {
        isLoggedIn = !!auth.token;
    });

    // Handle login redirection
    const handleLogin = () => {
        goto("/login");
    };

    // Handle logout: clear token and update store, redirect to homepage
    const handleLogout = () => {
        clearAuth();
        goto("/");
    };

    const handleSignup = () => {
        goto("/signup");
    };
</script>

<nav
    class="p-2 flex justify-between items-center h-16 border-b-2 light:bg-blue-100"
>
    <div class="flex items-center">
        <div class="logo">
            <h1>Todos</h1>
        </div>
    </div>
    <div class="flex-grow flex justify-center">
        <div class="flex gap-4">
            <a href="/">Home</a> <a href="/allbooks">Books</a>
            <a href="/issued">Issued Books</a>
        </div>
    </div>
    <div class="flex gap-4">
        {#if isLoggedIn}
            <Button on:click={handleLogout} variant="outline">Logout</Button>
        {:else}
            <button on:click={handleSignup}>Signup</button>
            <Button on:click={handleLogin} variant="outline">Login</Button>
        {/if}

        <ModeToogle />
    </div>
</nav>
