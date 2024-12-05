'use client'
import React, { useReducer, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import '../gentem.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dbnavigation, Dbtemplate } from '@/app/components/Dbtemplate/Dbtemplate';
import Image from 'next/image';

export default function Page() {


    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('')
    const navigation = useRouter()

    let levelId = ''
    if (typeof window !== 'undefined') {
        levelId = localStorage.getItem('levelId')
        const localdata = JSON.parse(localStorage.getItem('data'))
        !localdata.token && navigation.push('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title: title,
            description: description,
            level: levelId
        }
        try {
            const response = await fetch(`https://course-backend-2u5r.onrender.com/courses/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const request = await response.json()
            if (!response.ok) {
                alert(request.message)
                return;
            } else {
                alert(request.message)
                setTitle('')
                navigation.push('/dashboard/listcourse')
            }
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    let updateId;
    let update;
    if (typeof window !== 'undefined') {
      update = JSON.parse(window.localStorage.getItem('update'))
      updateId = update?.updateId;
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = {
            title: title,
            description: description,
            level: update.level
        }

        try {
            const response = await fetch(`https://course-backend-2u5r.onrender.com/courses/` + updateId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const request = await response.json();
            
            if (!response.ok) {
                alert(request.message)
                localStorage.removeItem('update')
            }
            alert(request.message)
            localStorage.removeItem('update')
            navigation.push('/dashboard/listcourse')
        } catch (error) {
            alert("Error: " + error.message)
        }
    }


    return (
        <div className='flex w-full h-[100vh]'>
            <section className='bg-[#ffffff57] w-[17%]'>
                <Dbtemplate />
            </section>
            <section className='flex flex-col gap-[10px] bg-black w-[83%] text-[#fff]'>
                <Dbnavigation />
                <section className='box-border flex justify-between items-center px-[30px]'>
                    <h2 className='font-[600] text-[#2196f3] text-[24px]'>Adim Dashboard</h2>
                    <div className='flex justify-evenly gap-[20px]'>
                        <Link href={'/dashboard/registeruser'}>
                            <button className='bg-[#fffffff6] px-[20px] py-[6px] btn-opt-nav rounded-[20px] text-[#000]'>
                                <IoMdAdd size={20} />
                                Add new user
                            </button>
                        </Link>
                    </div>
                </section>
                <section className='flex justify-center items-center h-[100vh]'>
                    <div className='relative box-border flex justify-center items-center bg-[#fff] py-[30px] rounded-[15px] w-[900px] h-[500px]'>
                        <div className='flex justify-evenly items-center gap-[1px] w-full'>
                            <section className='bg-[gray] rounded-[15px] w-[50%] h-[300px] overflow-hidden'>
                                <Image className='w-full h-full' src={'/images/course.jpg'} alt='course management image' width={400} height={400} />
                            </section>
                            <form onSubmit={ updateId ? handleUpdate : handleSubmit} className='box-border flex flex-col justify-center items-center gap-[20px] form-reg px-[20px] w-[40%] h-[100%]'>
                                <h1 className='top-[20px] left-[60px] absolute font-[600] text-[#2196f3] text-[27px]'>Register Course</h1>
                                <label htmlFor="title">
                                    <span className='text-[#000]'>Title</span>
                                    <input type="text" id="title" name="title" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </label>
                                <label htmlFor="description">
                                    <span className='text-[#000]'>Description</span>
                                    <input type='text' id="duration" name="duration" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </label>
                                <button type="submit" className='right-[70px] bottom-[30px] absolute bg-[#2196f3] px-[20px] py-[10px] rounded-[7px] text-[#fff] btn-opt'>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}
