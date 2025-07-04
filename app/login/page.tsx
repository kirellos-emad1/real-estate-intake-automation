import LoginForm from '@/components/auth/login-form'
import React from 'react'

const LoginPage = () => {
  return (
    <div className=' lg:py-16 md:py-20 py-24  w-full h-screen flex items-center justify-center'>
      <LoginForm/>
    </div>
  )
}

export default LoginPage