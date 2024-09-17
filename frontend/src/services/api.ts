import axios, { AxiosInstance } from 'axios';
import { ListingSchema } from 'frontend/src/schema/listing';
import { FilterSchema } from 'frontend/src/schema/filter';
import { UserSchema } from 'frontend/src/schema/user';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// HUMAN ASSISTANCE NEEDED
// The following function needs review for production readiness and error handling
const getListings = async (filter: FilterSchema): Promise<ListingSchema[]> => {
  const axiosInstance = createAxiosInstance();
  try {
    const response = await axiosInstance.get('/api/listings', { params: filter });
    // Validate response data against ListingSchema
    // This step might require additional implementation or a validation library
    return response.data as ListingSchema[];
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};