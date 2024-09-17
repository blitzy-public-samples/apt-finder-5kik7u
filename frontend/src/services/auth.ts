import { createAxiosInstance } from 'frontend/src/services/api';
import { UserSchema } from 'frontend/src/schema/user';

// HUMAN ASSISTANCE NEEDED
// The login function has a confidence level below 0.8. Please review and adjust as necessary.
export async function login(email: string, password: string): Promise<UserSchema> {
  const axios = createAxiosInstance();
  
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    
    if (response.data && response.data.token) {
      localStorage.setItem('jwtToken', response.data.token);
      
      // Note: Assuming UserSchema has a parse method to validate the user data
      const userData = UserSchema.parse(response.data.user);
      
      return userData;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  const axios = createAxiosInstance();
  
  try {
    await axios.post('/api/auth/logout');
  } catch (error) {
    console.error('Logout request failed:', error);
  } finally {
    localStorage.removeItem('jwtToken');
  }
}