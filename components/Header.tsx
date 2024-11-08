'use client'

import { useBoardStore } from '@/store/BoardStore'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/16/solid'
// import { Avatar } from '@nextui-org/avatar'

import Image from 'next/image'
import React from 'react'


function Header() {

  const searchString = useBoardStore((state) => state.searchString)
  const setSearchString = useBoardStore((state) => state.setSearchString)

  return (
    <header>
        <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/20'>

            <div className="absolute top-0 left-0 -z-50 opacity-80 blur-3xl w-full h-96 bg-gradient-to-br from-emerald-400 to-indigo-400 "/>

            <Image 
                src='https://links.papareact.com/c2cdd5'
                alt='Trello Logo'
                width={150}
                height={100} 
                className='w-36 md:w-44 pl-3 pb-10 md:pb-0 object-contain'
            />
            <div className='flex items-center flex-1 justify-end space-x-2 w-full'>
                <form className='flex flex-1 md:flex-initial items-center space-x-3 bg-white rounded-md shadow-md p-2 '>
                    <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
                    <input
                    type='text'
                    placeholder='Search'
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    className='flex-1 p-2 outline-none' 
                    />
                    <button type='submit' hidden>
                        Search
                    </button>
                    
                </form>

                {/* <Avatar name='SB' className=' text-white w-14 h-14 rounded-full bg-blue-600' /> */}
                {/* <Avatar 
                    name="User" 
                    size="50" 
                    round color="#0055D1"
                /> */}
                
            </div>
        </div>
        <div className='flex items-center justify-center px-5 py-2 md:py-5'>
            <p className='flex items-center gap-1 p-4 font-light shadow-lg rounded-lg w-fit bg-white max-w-3xl text-blue-600'>
                <UserCircleIcon className='h-8 w-8 text-blue-600' />
                Your tasks below...
            </p>
        </div>
    </header>
  )
}

export default Header