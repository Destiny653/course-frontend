'use client'
import { Dbnavigation, Dbtemplate } from '@/app/components/Dbtemplate/Dbtemplate'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import '../gentem.css';
import './user.css';
import Link from 'next/link';
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';


export default function Page() {

    const [data, setData] = useState([])
    const navigation = useRouter()



    useEffect(() => {
        const handleSearch = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users`)
                const request = await response.json()
                console.log(response)
                if (!response.ok) {
                    alert(request.message)
                    return;
                }
                setData(request.users)
                console.log(data);
                return;
            } catch (error) {
                alert('Error: ' + error.message)
                return;
            }
        }
        handleSearch();
    }, [])
    console.log("Data: " + JSON.stringify(data));

    return (
        <div className='relative flex gap-[2%] bg-[#000] w-full min-h-[100vh]'>
            <section className='top-0 left-0 sticky w-[17%]'>
                <Dbtemplate />
            </section>
            <section className='flex flex-col gap-[50px] col-start-auto bg-[#000] w-[80%] text-[#fff]'>
                <div>
                    <Dbnavigation />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    )
}
