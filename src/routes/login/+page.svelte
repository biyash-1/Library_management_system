<script lang="ts">
  import { getClient } from '$lib/graphqlClient';
  import { LOGIN_QUERY } from '$lib/queries/authQuery';
  import { setAuth } from '$lib/stores/authStore';

  let email: string = '';
  let password: string = '';
  let errorMessage: string = '';

  interface LoginResponse {
  login: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      role: string; // Add any additional fields as needed
    };
  };
}


const handleSubmit = async (e: Event) => {
  e.preventDefault();

  if (!email || !password) {
    errorMessage = 'Please fill in all fields.';
    return;
  }

  try {
    const client = getClient();
    const data: LoginResponse = await client.request<LoginResponse>(LOGIN_QUERY, { email, password });

    if (!data || !data.login) {
      throw new Error('Login failed.');
    }

    const { token, user } = data.login;

    // Now call setAuth with the token and the user object
    setAuth(token, user);

    console.log('Logged in successfully:', token, user);
    let userId = user.id;
    console.log("User ID:", userId);
    
    // Redirect based on role
    if (user.role === 'admin') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/';
    }
  } catch (error: any) {
    // Check if the error has a structured response with the error message
    if (error.response && error.response.errors && error.response.errors[0] && error.response.errors[0].message) {
      errorMessage = error.response.errors[0].message;
    } else {
      errorMessage = 'An error occurred. Please try again.';
    }
  }
};

</script>

<main class="flex justify-center items-center h-screen">
  <div class="max-w-md w-full">
    <div class="space-y-4">
      <div class="shadow-lg rounded-lg p-6">
        <h2 class="text-xl font-semibold text-center mb-4">Login</h2>
        {#if errorMessage}
          <div class="text-red-600 text-center mb-4">{errorMessage}</div>
        {/if}

        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              bind:value={email}
              placeholder="Enter your email"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              bind:value={password}
              placeholder="Enter your password"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div class="mt-4">
            <button
              type="submit"
              class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>

        <div class="mt-4 text-center">
          <p class="text-sm">
            Don't have an account?
            <a href="/signup" class="text-blue-600 hover:text-blue-700">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</main>
