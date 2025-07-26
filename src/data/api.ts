import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';  // Use environment variable or fallback to localhost

// Function to fetch data (replace the endpoint with your actual backend route)
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/respondents/`);  // Adjust endpoint as needed
    return response.data; // Return the data from the backend
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error('Error fetching users from the backend');
  }
};

// Function to fetch a single user by reference number (replace the endpoint with your actual backend route)
export const fetchUserByReferenceNumber = async (referenceNumber: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/respondents/${referenceNumber}`);  // Adjust endpoint as needed
    return response.data;  // Return the user's data
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error('Error fetching user data from the backend');
  }
};

// Function to send form data to the backend
export const submitFormData = async (formData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/respondents/`, formData); // Replace with your backend API endpoint
    return response.data;  // Return the response from the backend
  } catch (error) {
    console.error("Error submitting form data:", error);
    throw new Error('Error submitting form data');
  }
};
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return response.data; // Will contain the JWT token
  } catch (error: any) {
    console.error("Login error:", error);
    throw new Error(error.response?.data?.msg || 'Login failed');
  }
};