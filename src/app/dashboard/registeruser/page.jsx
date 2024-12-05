'use client' 
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoMdAdd } from "react-icons/io";
import '../gentem.css';
import { useRouter } from 'next/navigation'

export default function Login() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const navigation = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: role,
            email: email, 
        }
        try {
            const response = await fetch(`http://localhost:3000/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const request = await response.json()

            if (!response.ok) {
                alert(request.message)
            }  
            console.log("Request register is: "+ JSON.stringify(request));
            
            typeof window !== 'undefined' && window.localStorage.setItem('userId', request.data._id)
            alert(request.message) 
            if(role == 'student'){
                navigation.push('/dashboard/student')
            }
            else if(role == 'teacher'){
                navigation.push('/dashboard/teacher')
            }
        } catch (error) {
            console.error('Error :', error)
            alert('Error in registration ' + error)
        }
    } 



    return (
        <>
            < div className='flex w-full h-[100vh]' >
                <section className='flex justify-center items-center bg-black w-[100%] text-[#fff]'>
                    <section className='box-border flex flex-col justify-center items-center p-[px] w-full h-[100vh]'>
                        <div className='relative box-border flex justify-center items-center bg-[#fff] py-[30px] rounded-[15px] w-[900px] h-[500px]'>
                            <section className='bg-[gray] rounded-[15px] w-[50%] h-[300px] overflow-hidden'>
                                <Image className='w-full h-full' src={'/images/course.jpg'} alt='course management image' width={400} height={400} />
                            </section>
                            <form onSubmit={handleSubmit} className='box-border flex flex-col justify-center items-center gap-[20px] form-reg px-[20px] w-[40%]' action="http://localhost:3000/api/auth/student" method='post'>
                                <h1 className='top-[20px] left-[60px] absolute font-[600] text-[#2196f3] text-[27px]'>User register</h1>
                                <label htmlFor="first name">
                                    <span className='text-[#000]'>First Name</span>
                                    <input type="text" id="email" name="text" placeholder="first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </label>
                                <label htmlFor="last name">
                                    <span className='text-[#000]'>Last Name</span>
                                    <input type="text" id="email" name="email" placeholder="last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </label>
                                <label htmlFor="email">
                                    <span className='text-[#000]'>Email</span>
                                    <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </label>
                                <label className='flex flex-col' htmlFor="password">
                                    <span className='text-[#000]'>Password</span>
                                    <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </label>
                                <label htmlFor="role">
                                     <span className='text-[#000]'>Role</span>
                                    <select className='options' id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="">Select Role</option>
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                    </select> 
                                </label>
                                <button type="submit" className='bottom-[50px] left-[30px] absolute bg-[#2196f3] px-[20px] py-[10px] rounded-[7px] text-[#fff] btn-opt'>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </section>
                </section >
            </div >
        </>
    )
}
