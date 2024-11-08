'use client'
import { FormEvent, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore'
import { useBoardStore } from '@/store/BoardStore'
import TaskTypeRadioGroup from './TaskTypeRadioGroup'
import Image from 'next/image'
import { PhotoIcon } from '@heroicons/react/16/solid'

function Modal() {
    const isOpen = useModalStore((state) => state.isOpen)
    const closeModal = useModalStore((state) => state.closeModal)
    const newTaskInput = useBoardStore((state) => state.newTaskInput)
    const setNewTaskInput = useBoardStore((state) => state.setNewTaskInput)
    const image = useBoardStore((state) => state.image)
    const setImage = useBoardStore((state) => state.setImage)
    const addTask  = useBoardStore((state) => state.addTask)
    const newTaskType = useBoardStore((state) => state.newTaskType)

    const imagePickerRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!newTaskInput) return

        addTask(newTaskInput, newTaskType, image)
        setImage(null)
        closeModal()
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog 
                as='form'
                onSubmit={handleSubmit}
                className='relative z-10'
                onClose={closeModal}
            >
                <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className='fixed inset-0 bg-black bg-opacity-25'/>
                </Transition.Child>
                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>   
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 pb-2'>
                                    Add a task
                                </Dialog.Title>
                                <div className='mt-2'>
                                    <input 
                                      type='text'
                                      value={newTaskInput}
                                      onChange={(e) => setNewTaskInput(e.target.value)}
                                      placeholder='Enter a task...'
                                      className='w-full border border-gray-300 rounded-md outline-none p-5'
                                    />
                                </div>
                                <TaskTypeRadioGroup />
                                <div className='mt-2'>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            imagePickerRef.current?.click()
                                        }} 
                                        className='w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
                                        <PhotoIcon
                                            className='h-6 w-6 mr-2 inline-block'
                                        />
                                        Upload Image
                                    </button>
                                    {image && (
                                        <Image 
                                            alt='uploaded image'
                                            width={200}
                                            height={200}
                                            src={URL.createObjectURL(image)}
                                            className='w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed'
                                            onClick={() => {
                                                setImage(null)
                                            }}
                                        />
                                    )}
                                    <input 
                                        type='file'
                                        ref={imagePickerRef}
                                        hidden
                                        onChange={(e) => {
                                            if(!e.target.files![0].type.startsWith('image/')) return
                                            setImage(e.target.files![0])
                                        }}
                                    />
                                </div>
                                <div className='mt-4'>
                                <button
                                    type='submit'
                                    disabled={!newTaskInput}
                                    className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium
                                    text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
                                    focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed'
                                    // onClick={}
                                >
                                    Add Task
                                </button>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal