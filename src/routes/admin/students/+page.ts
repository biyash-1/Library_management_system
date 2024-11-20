import { GET_ALL_STUDENTS_QUERY } from '$lib/queries/bookQuery.js';
import { getClient } from '$lib/graphqlClient.js';

interface Studenttype {
  id: string;
  username: string;  // Update to match component's expected field
  email: string;
  password: string;
  role: string;
  phone: string;  // Make sure this is available in the response
  sid: string;    // Ensure sid is part of the response
}

export async function load() {
  try {
    const client = getClient();
    const response: { users: Studenttype[] } = await client.request(GET_ALL_STUDENTS_QUERY);  // 'users' is expected from the API
    console.log("Loaded students response:", response);  // Log to check the response

    const students = response.users; 
    console.log("Loaded students:", students);
     // Use 'users' from the response
    return { students };  // Ensure 'students' is returned correctly
  } catch (error) {
    console.error("Error fetching students:", error);
    return { students: [] };  // Return an empty array in case of error
  }
}
