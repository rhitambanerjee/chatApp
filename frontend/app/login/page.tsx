import { Mail } from 'lucide-react'
import React from 'react'

const Login = () => {
  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center p-4'>
        <div className='max-w-md w-full '>
            <div className='bg-gray-800 border border-gray-700 rounded-lg p-8'>
                <div className='text-center mb-8'>
                    <div className='mx-auto w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mb-6'>
                        <Mail size={40} className='text-white'/>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-3 ">
                        Welcome to ChatApp
                    </h1>
                    <p className="text-gray-300 text-lg">Enter your email to continue your journey</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login