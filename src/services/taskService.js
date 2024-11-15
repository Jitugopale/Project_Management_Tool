import axios from 'axios';

// Base URL for your API (update the URL accordingly)
const API_URL = 'http://localhost:5000/api/tasks/get-tasks';

// Fetch all tasks from the backend
export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return the tasks data from the API
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return []; // Return an empty array if there is an error
    }
};

