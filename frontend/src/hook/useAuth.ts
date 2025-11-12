import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useAuth = () => {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      console.log("Inside")
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
        withCredentials: true,
      })
      return data.data
    },
    retry: false, 
  })
}
