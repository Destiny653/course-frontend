'use client'
import { Dbnavigation, Dbtemplate } from '@/app/components/Dbtemplate/Dbtemplate'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import '../gentem.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './course.css';


export default function Page() {


    const [data, setData] = useState([])
    const navigation = useRouter()
    const [courseId, setCourseId] = useState('')

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`https://course-backend-2u5r.onrender.com/courses`)
                const request = await response.json()
                if (!response.ok) {
                    alert(request.message)
                }
                setData(request)
                return;
            } catch (error) {
                alert('Error faild to fetch data ' + error.message)
                return;
            }
        }
        fetchData();
        return;
    }, [])

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://course-backend-2u5r.onrender.com/courses/` + courseId, {
                method: 'DELETE'
            })
            const request = await response.json()
            if (!response.ok) {
                alert(request.message)
            }
            alert(request.message)
        } catch (error) {
            alert("Error: " + error.message)
        }
    }


    console.log("Data ", JSON.stringify(data));


    return (
        <div className='flex gap-[20px] bg-black w-full h-[100vh]'>
            <section className='bg-[#ffffff57] w-[17%]'>
                <Dbtemplate />
            </section>
            <section className='flex flex-col gap-[10px] bg-black w-[80%] text-[#fff]'>
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
                <table>
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Level</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th className='text-center'>Delete</th>
                            <th className='text-center'>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.data?.map((level, index) => (
                                <tr key={index}>
                                    <td>{level?.level?.department}</td>
                                    <td>{level?.level?.level}</td>
                                    <td>{level?.title}</td>
                                    <td>{level?.description}</td>
                                    <td className='delete-btn' onClick={() => { handleDelete(); setCourseId(level._id) }}>Remove</td>
                                    <td className='update-btn' onClick={() => {
                                        localStorage.setItem('update', JSON.stringify(
                                            {
                                                updateId: level._id,
                                                level: level.level._id
                                            }
                                        ));
                                        navigation.push('/dashboard/course');
                                    }}>Edit</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}
