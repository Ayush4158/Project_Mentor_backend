import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../app/authSlice'

type LoginFormInput = {
  email: string
  password: string
}

const handleUserLogin = async (loginData: LoginFormInput) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
      loginData,
      { withCredentials: true } 
    )

    return data
  } catch (err: any) {
    console.error('Login error:', err)
    const message =
      err.response?.data?.message ||
      err.message ||
      'Something went wrong. Please try again.'
    throw new Error(message)
  }
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInput>()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: handleUserLogin,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      dispatch(login(data.data))
      // navigate('/') 
       window.location.href = "http://localhost:7777/api/github/auth";
    },
    onError: (error) => {
      console.error('❌ Login failed:', error)
    },
  })

  const onSubmit = (formData: LoginFormInput) => {
    mutate(formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex justify-center items-center ">
      <div className="backdrop-blur-2xl rounded-3xl shadow-2xl flex overflow-hidden w-[90%]  max-w-5xl">
        
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex flex-col justify-center items-center text-white p-10 rounded-l-4xl max-sm:hidden">
          <h1 className="text-3xl font-bold mb-4">Restart Your Journey with Us</h1>
          <p className="text-lg text-center opacity-90">Sign in to continue where you left off</p>
        </div>

        {/* Right Section (Login Form) */}
        <div className="w-1/2 max-sm:w-full bg-white/70 backdrop-blur-md p-10 flex flex-col justify-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back!</h2>
          <p className="text-center text-sm md:text-md lg:text-lg text-gray-500 mb-6">Access your account and continue your progress</p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                placeholder="example@gmail.com"
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className={`${
                isPending ? 'opacity-50 cursor-not-allowed' : ''
              } bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold p-3 rounded-xl hover:opacity-90 transition`}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </button>

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </form>

          {/* ✅ Error / Success messages */}
          {isError && <p className="text-red-500 mx-sm:text-xs text-center mt-2">{(error as Error)?.message}</p>}
          {isSuccess && <p className="text-green-600 text-center mt-2">Login successful!</p>}

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to={'/signup'} className="text-purple-600 font-semibold cursor-pointer hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
