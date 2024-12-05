'use client'
import { Dbnavigation, Dbtemplate } from '@/app/components/Dbtemplate/Dbtemplate';
import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import '../gentem.css';
import Link from 'next/link';

export default function Page() {
 

    const [courseTitle, setCourseTitle] = useState('');
    const [duration, setDuration] = useState('');

    let urlParams;
    let id;
    if(typeof window !== 'undefined' ){
        urlParams = new URLSearchParams( window.location.search);
        id = urlParams.get('id')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title: courseTitle,
            duration: duration,
            level: window.localStorage.getItem('levelId'),
        }
        try {
            const response = await fetch(`https://course-backend-2u5r.onrender.com/api/courses/update/` + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const request = await response.json()
            if (!response.ok) {
                alert('Failed to add course ' + request.message)
                return;
            } else {
                alert('Course added successfully')
                setCourseTitle('')
            }
        } catch (error) {
            console.error(error)
            alert('Failed to add course', error)
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
                        <Link href={'/dashboard/admin'}>
                            <button className='bg-[#fffffff6] px-[20px] py-[6px] btn-opt-nav rounded-[20px] text-[#000]'>
                                <IoMdAdd size={20} />
                                Add new user
                            </button>
                        </Link>
                        <Link href={'/dashboard/course'}>
                            <button className='bg-[#fffffff6] px-[20px] py-[6px] btn-opt-nav rounded-[20px] text-[#000]'>
                                <IoMdAdd size={20} />
                                Add new Course
                            </button>
                        </Link>
                    </div>
                </section>
                <section className='flex justify-center items-center h-[100vh]'>
                    <div className='relative box-border flex justify-center items-center bg-[#fff] py-[30px] rounded-[15px] w-[900px] h-[500px]'>
                        <form onSubmit={handleSubmit} className='box-border flex flex-col justify-center items-center gap-[6%] form-reg px-[20px] w-[800px] h-[100%]'>
                            <h1 className='top-[20px] left-[60px] absolute font-[600] text-[#2196f3] text-[27px]'>Register Course</h1>
                            <div className='flex justify-center items-center gap-[8%] w-full'>
                                <label htmlFor="course title">
                                    <span className='text-[#000]'>Title</span>
                                    <input type="text" id="course-title" name="course-title" placeholder="Course Title" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                                </label>
                                <label htmlFor="course title">
                                    <span className='text-[#000]'>Duration</span>
                                    <input type='datatime' id="duration" name="duration" placeholder="Course duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                                </label>
                            </div>
                            <button type="submit" className='right-[70px] bottom-[40px] absolute bg-[#2196f3] px-[20px] py-[10px] rounded-[7px] text-[#fff] btn-opt'>
                                Submit
                            </button>
                        </form>
                    </div>
                </section>
            </section>
        </div>
    )
}
