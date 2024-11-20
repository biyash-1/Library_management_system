import { writable } from 'svelte/store';

interface AuthState {
  token: string | null;
  user: { id: string; username: string; email: string } | null;
}

// Helper function to validate the token (this is a placeholder; replace with real logic if needed)
const isValidToken = (token: string | null): boolean => {
  // Add your actual token validation logic here (e.g., checking expiry)
  return !!token;
};

// Clear `localStorage` for initial load to avoid auto-login if needed
if (typeof window !== 'undefined' && !localStorage.getItem('token_checked')) {
  localStorage.removeItem('token');
  localStorage.setItem('token_checked', 'true');
}

const initialToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const validInitialToken = isValidToken(initialToken) ? initialToken : null;

const initialState: AuthState = {
  token: validInitialToken,
  user: null, 
};

export const authStore = writable<AuthState>(initialState);

// In your authStore
export const setAuth = (token: string, user: AuthState['user']) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
  authStore.set({ token, user });
  console.log('authStore:', authStore);
  
};

export const clearAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
  authStore.set({ token: null, user: null });
};
