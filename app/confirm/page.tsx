import ConfirmEmailForm from '@/components/auth/confirm-email-form'
import React from 'react'

const confirmPage = () => {
  return (
    <div className=' lg:py-16 md:py-20 py-24  w-full h-screen flex items-center justify-center'>
      <ConfirmEmailForm/>
    </div>
  )
}

export default confirmPage