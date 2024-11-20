import { getClient } from '$lib/graphqlClient.js';
import { GET_DASHBOARD_DATA_QUERY } from '$lib/queries/bookQuery.js';

interface DashboardData {
  totalBooks: number;
  issuedBooks: number;
  totalStudents: number;
}
interface GraphQLResponse {
  getDashboardData: DashboardData;
}

export async function load() {
  try {
    const client = getClient();
    const response: GraphQLResponse = await client.request(GET_DASHBOARD_DATA_QUERY);

    // Extract the data properly
    const data = response.getDashboardData;

    console.log("my dashbaor datas",data); // Check the structure of the returned data in the console

    return {
      dashboardData: data, // Ensure this matches the expected format in the Svelte component
    };
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    return {
      dashboardData: null, // Return null to trigger the "Failed to load" message
    };
  }
}
