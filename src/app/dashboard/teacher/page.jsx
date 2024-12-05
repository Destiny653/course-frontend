'use client'
import React, { useEffect, useState } from 'react'
import { Dbnavigation, Dbtemplate } from '@/app/components/Dbtemplate/Dbtemplate';
import '../gentem.css';
import { IoMdAdd } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() { 
    const [experience, setExperience] = useState(''); 
    const [qualification, setQualification] = useState(''); 
    const [data, setData] = useState({}) 
    const [level, setLevel] = useState('');
    const [department, setDepartment] = useState('');

    const navigation = useRouter()
    let userId;

    if(typeof window !== 'undefined'){ 
        userId = localStorage.getItem('userId')
        const localdata =  JSON.parse(localStorage.getItem('data'))
        !localdata.token && navigation.push('/')
    }   

    console.log("Userii: "+ userId);
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch('http://localhost:3000/levels/post',{ 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const request = await response.json()
            if(!response.ok){
                console.log('Error occurred while creating level, error: ' + request.message)
                alert('Error: '+ request.message);
            }
            alert('Level created successfully');
            localStorage.setItem('levelId', request.data._id)

            try {
                const levelId = localStorage.getItem('levelId')
                data.level = levelId
                const response = await fetch(` http://localhost:3000/users/teacher`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(data)
                })
    
                const request = await response.json()
    
                if (!response.ok) {
                    console.log('Error occurred while registering, error: ' + request.message)
                    alert('Error occurred while registering, error: ' + request.message);
                } else { 
                    alert(request.message); 
                    navigation.push('/dashboard/course') 
                }
    
            } catch (error) {
                console.error(error);
                alert('Error occurred', error);
    
            }
        } catch (error) {
            console.error(error);
            alert('Error occurred: '+ error);
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
                            <form onSubmit={handleSubmit} className='box-border flex flex-col justify-center items-center gap-[20px] form-reg px-[20px] w-[40%]' action="http://localhost:3000/api/auth/student" method='post'>
                                <h1 className='top-[20px] left-[60px] absolute font-[600] text-[#2196f3] text-[27px]'>Student Register</h1>
                                <label htmlFor="enrollement data">
                                    <span className='text-[#000]'>Years of experience</span>
                                    <input className='border-[1px] px-[20px] py-[9px] rounded-[10px] w-[350px] text-[#000] outline-none' type="number" id="enrollement data" name="Years of experience" placeholder="Enter here" value={experience} onChange={(e) => setExperience(e.target.value)} />
                                </label>
                                <label htmlFor="enrollement data">
                                    <span className='text-[#000]'>Qualifiction</span>
                                    <input className='border-[1px] px-[20px] py-[9px] rounded-[10px] w-[350px] text-[#000] outline-none' type="text" id="enrollement data" name="enrollement data" placeholder="Qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} />
                                </label>
                                <select name="" id="" onChange={e=>setLevel(e.target.value)}>
                                    <option value="">Select status</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                                <select name="" id="" onChange={e=>setDepartment(e.target.value)}>
                                    <option value="">Select department</option>
                                    <option value="Digital-Marketing">Digital marketing</option>
                                    <option value="Web-Developement">Web developement</option>
                                    <option value="Cyber-Security">Cyber security</option>
                                    <option value="Graphic-Design">Graphic designing</option>
                                </select>
                                <button type="submit" className='right-[30px] bottom-[60px] absolute bg-[#2196f3] px-[20px] py-[10px] rounded-[7px] text-[#fff] btn-opt'
                                    onClick={() => setData( 
                                        { 
                                             experience: experience,
                                             qualification: qualification,
                                             user: userId,
                                             level: level,
                                             department: department,
                                        }
                                    )}
                                >
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
