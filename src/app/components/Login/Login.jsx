'use client' 
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import '../../dashboard/gentem.css';
import { useRouter } from 'next/navigation' 
import { Dbnavigation, Dbtemplate } from '../Dbtemplate/Dbtemplate';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const navigation = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }
        try {
            const response = await fetch(`http://localhost:3000/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const request = await response.json()
 
            if (!response.ok) {
                console.log("Error: " +request);
                console.log("Error: " +response);
                alert("Error: " +request.message)
            } else { 
                alert("Success: " +request.message) 
                console.log("Success: " +request);
                console.log("Success: " +response);
                typeof window !== 'undefined' && window.localStorage.setItem('data', JSON.stringify({ firstName: request.firstName, lastName:request.lastName, mail: request.email, token: request.token }))
            } 
            setEmail('')
            setPassword('') 
        } catch (error) {
            console.error('Error :', error)
            alert('Error in registration ' + error)
        }
    }
    const data = JSON.parse(typeof window !== 'undefined' && localStorage.getItem('data'))



    return (
        <>
            {
                !data?.token ?

                    < div className='flex w-full h-[100vh]' >
                        <section className='flex justify-center items-center bg-black w-[100%] text-[#ffffffbb]'>
                            <section className='box-border flex flex-col justify-center items-center p-[px] w-full h-[100vh]'>
                                <div className='relative box-border flex justify-center items-center bg-[#fff] py-[30px] rounded-[15px] w-[900px] h-[500px]'>
                                    <section className='bg-[gray] rounded-[15px] w-[50%] h-[300px] overflow-hidden'>
                                        <Image className='w-full h-full' src={'/images/course.jpg'} alt='course management image' width={400} height={400} />
                                    </section>
                                    <form onSubmit={handleSubmit} className='box-border flex flex-col justify-center items-center gap-[20px] form-reg px-[20px] w-[40%]' action="http://localhost:3000/api/auth/student" method='post'>
                                        <h1 className='top-[20px] left-[60px] absolute font-[600] text-[#2196f3] text-[27px]'>User Login</h1>
                                        <label htmlFor="email">
                                            <span className='text-[#000]'>Email</span>
                                            <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </label>
                                        <label className='flex flex-col' htmlFor="password">
                                            <span className='text-[#000]'>Password</span>
                                            <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </label> 
                                        <p className='text-[#000]'>Don't have an account?: <a href="/dashboard/registeruser">Register</a></p>
                                        <button type="submit" className='right-[30px] bottom-[60px] absolute bg-[#2196f3] px-[20px] py-[10px] rounded-[7px] text-[#fff] btn-opt'>
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </section>
                        </section >
                    </div >
                    :
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
                                    <Link href={'/dashboard/course'}>
                                        <button className='bg-[#fffffff6] px-[20px] py-[6px] btn-opt-nav rounded-[20px] text-[#000]'>
                                            <IoMdAdd size={20} />
                                            Add new Course
                                        </button>
                                    </Link>
                                </div>
                            </section>
                            <section className='box-border flex flex-col justify-center items-center p-[px] w-full h-[100vh]'>
                                <div className='relative box-border flex justify-evenly items-center bg-[#fff] py-[30px] rounded-[15px] w-[900px] h-[500px]'>
                                    <section className='bg-[gray] rounded-[15px] w-[50%] h-[300px] overflow-hidden'>
                                        <Image className='w-full h-full' src={'/images/course.jpg'} alt='course management image' width={400} height={400} />
                                    </section>
                                    <section className='flex flex-col justify-center items-center gap-[15px] rounded-[15px] overflow-hidden'>
                                        <div className='flex flex-col justify-center items-center gap-[20px] bg-[#2196f3] rounded-full w-[200px] h-[200px] text-[#dce2e78a]'>
                                            <h1 className='font-[700] text-[100px]'>
                                                {data?.firstName.split("")[0].toUpperCase()+data?.lastName.split("")[0].toUpperCase()}
                                            </h1>
                                        </div>
                                        <p className='font-[600] text-[#000] text-[24px]'>Welcome, {data?.firstName+" "+data?.lastName}</p>
                                    </section>
                                </div>
                            </section>
                        </section >
                    </div >
            }
        </>
    )
}
