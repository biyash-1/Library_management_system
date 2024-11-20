<script lang="ts">
  import { getClient } from '$lib/graphqlClient';
  import { SIGNUP_QUERY } from '$lib/queries/authQuery';
  
    let email: string = '';
    let username: string = '';
    let password: string = '';
    let confirmPassword: string = '';
    let sid: string = '';
    let phone: string = ''; // Added phone field
    let errorMessage: string = '';



    interface SignupResponse {
  signup: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}
    const handleSubmit = async (e: Event) => {
  e.preventDefault();

  // Validate form fields
  if (!email || !username || !password || !confirmPassword || !sid || !phone) {
    errorMessage = "Please fill in all fields.";
    return;
  }

  if (password !== confirmPassword) {
    errorMessage = "Passwords do not match.";
    return;
  }

  try {
    const client = getClient();
    const data: SignupResponse = await client.request<SignupResponse>(SIGNUP_QUERY, {
      email,
      username,
      password,
      confirmPassword,
      sid,
      phone,
    });

    if (!data || !data.signup) {
      throw new Error("Signup failed.");
    }

    // Redirect after successful signup
    window.location.href = '/login';
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
  
  <main class="flex justify-center items-center h-screen ">
    <div class="max-w-md w-full">
      <div class="space-y-4">
        <!-- Card Wrapper -->
        <div class="shadow-lg rounded-lg p-6">
          <!-- Card Content -->
          <h2 class="text-xl font-semibold text-center mb-4">Sign Up</h2>
  
          {#if errorMessage}
            <div class="text-red-600 text-center mb-4">{errorMessage}</div>
          {/if}
  
          <!-- Form -->
          <form on:submit|preventDefault={handleSubmit} class="space-y-4 p-3">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-slate-200">Email</label>
              <input 
                id="email" 
                type="email" 
                bind:value={email}
                placeholder="Enter your email"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            <!-- Username -->
            <div>
              <label for="username" class="block text-sm font-medium text-slate-200">Username</label>
              <input 
                id="username" 
                type="text" 
                bind:value={username}
                placeholder="Choose a username"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-slate-200">Password</label>
              <input 
                id="password" 
                type="password" 
                bind:value={password}
                placeholder="Enter your password"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            <!-- Confirm Password -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-slate-200">Confirm Password</label>
              <input 
                id="confirmPassword" 
                type="password" 
                bind:value={confirmPassword}
                placeholder="Confirm your password"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label for="roll" class="block text-sm font-medium text-slate-200">Rollno:

              </label>
              <input 
                id="confirmPassword" 
                type="password" 
                bind:value={sid}
                placeholder="Confirm your password"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            <!-- Phone -->
            <div>
              <label for="phone" class="block text-sm font-medium text-slate-200">Phone</label>
              <input 
                id="phone" 
                type="text" 
                bind:value={phone}
                placeholder="Enter your phone number"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            <!-- Submit Button -->
            <div class="mt-4">
              <button
                type="submit"
                class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </form>
  
          <div class="mt-4 text-center">
            <p class="text-sm">
              Already have an account? 
              <a href="/login" class="text-blue-600 hover:text-blue-700">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
  
  <style>
    /* Custom styles if needed */
  </style>
  