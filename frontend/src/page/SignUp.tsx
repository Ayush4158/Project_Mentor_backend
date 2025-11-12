import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'

type SignupFormInput = {
  username: string
  email: string
  password: string
}

const handleUserSignup = async (newUser: SignupFormInput) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
      newUser
    )
    return data
  } catch (err: any) {
    console.log(err)
    const message =
      err.response?.data?.message ||
      err.message ||
      'Something went wrong. Please try again.'
    throw new Error(message)
  }
}

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInput>()

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: handleUserSignup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      navigate('/login')
    },
    onError: (error) => {
      console.error('❌ Signup failed:', error)
    },
  })

  const onSubmit = (formData: SignupFormInput) => {
    console.log('hello')
    mutate(formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex justify-center items-center ">
      <div className=" backdrop-blur-2xl rounded-3xl shadow-2xl flex overflow-hidden w-[90%]  max-w-5xl">
        
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex flex-col justify-center items-center text-white p-10 rounded-l-4xl max-sm:hidden">
            <h1 className="text-3xl font-bold mb-4">Start Your Journey with Us</h1>
            <p className="text-lg text-center opacity-90">Tired of endless tutorials? Let’s break the cycle together!</p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 max-sm:w-full bg-white/70 backdrop-blur-md  p-10 flex flex-col justify-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 text-center">Get Started Now</h2>
          <p className="text-center text-sm md:text-md lg:text-lg text-gray-500 mb-6">Let’s create your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            {/* Username */}
            <div>
              <label className="text-sm font-semibold text-gray-700">Username</label>
              <input
                {...register('username', { required: 'Username is required' })}
                type="text"
                placeholder="john"
                className="w-full p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
            </div>

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
              {isPending ? 'Registering...' : 'Register'}
            </button>

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </form>

          {isError && <p className="text-red-500 max-sm:text-xs text-center mt-2">{(error)?.message}</p>}
          {isSuccess && <p className="text-green-600 text-center mt-2">Account created successfully!</p>}

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to={'/login'} className="text-purple-600 font-semibold cursor-pointer hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
