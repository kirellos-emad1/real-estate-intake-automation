import BookViewForm from '@/components/book-a-viewing/book-view-form'
import Image from 'next/image'
import React from 'react'

const BookViewPage = () => {
    return (
        <section className="h-[100dvh]  lg:py-16 md:py-20 py-24  flex items-center justify-center">
            <div className='grid lg:grid-cols-6 md:grid-cols-6 grid-cols-1 max-w-7xl   gap-10 mt-12 '>
                <div className='w-full lg:col-span-2 md:md:col-span-3   '>

                    <BookViewForm />
                </div>
                <div className='w-full lg:flex md:flex hidden   h-full lg:col-span-4 md:col-span-3 relative '
                >
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPwpZhZxL7TgYdFzezHTQdi0xxwFzfjC3eXDwOX40BedldYvsEddajZz38cFouzPHl0xXo2MLtnT3M59xqXCy1JLQZgfFfgxpE3zBDNTDkS5TJ2bEVXt1LRC-23Zqysdvj4CJdkPy4mcs4YjDcqmSWp3V1ZRHcJxKcnWpaX3b1YjeAukTh02MypQGxciWmc2Bj4GZMpFzJwhWX5z1OfBmmDbdtKUv8pYGHwT4wKm64Or4RAl98SyaMdO1vOe2yHBPKGyKAMvkL-_DD"
                        alt="Background Image" layout="fill" className='rounded-2xl' objectFit="cover" />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl'></div>
                    <div className='absolute top-[10%] left-[10%] flex flex-col  gap-8  text-2xl font-semibold z-20'>
                    <h1 className='font-bold text-5xl max-w-lg z-30 capitalize text-amber-400'>find your dream house by us</h1>
                    <p className='max-w-md font-light text-white'>Let us help you discover the perfect home that fits your lifestyle and budget.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookViewPage