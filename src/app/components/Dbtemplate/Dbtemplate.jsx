'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import './template.css'
import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { PiChalkboardTeacher } from "react-icons/pi";
import { GrUserAdmin } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoMdBook } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import Link from 'next/link';

export function Dbtemplate() {

  return (
    <div className='top-0 left-0 box-border sticky flex flex-col justify-between gap-[32px] bg-cyan-500 py-[10px] h-[100vh]'>
      <div className='flex flex-col gap-[30px]'>
        <h1 className='font-[600] text-[] text-[20px] text-center-[#fff]'>Course Management</h1>
        <ul className='flex flex-col nav-items'>
          <li>
            <LuLayoutDashboard className='text-[#000] text-center' />
            <span>Dashboard</span>
          </li>
          <Link href={'/'}>
            <li>
              <VscAccount className='text-[#000] text-center' />
              <span>Account</span>
            </li>
          </Link>
          <Link href={'/dashboard/listcourse'}>
            <li>
              <IoMdBook className='text-[#000] text-center' />
              <span>Courses</span>
            </li>
          </Link>
          <Link href={'/dashboard/users'}>
            <li>
              <VscAccount className='text-[#000] text-center' />
              <span>Users</span>
            </li>
          </Link>
        </ul>
      </div>
      <button className='bottom-[20px] absolute flex justify-center items-center gap-[5px] bg-[#2196f3] px-[24px] py-[8px] rounded-[15px] w-[150px] text-[#fff] btn-nav'
        onClick={() => {
          typeof window !== 'undefined' && window.localStorage.clear();
          typeof window !== 'undefined' && window.location.reload();

        }}
      >
        <RiLogoutCircleRLine className='text-[#fff] text-center' />
        Logout
      </button>
    </div>
  )
}

export function Dbnavigation() {

  let [data, setData] = useState({})
  useEffect(() => {
    data = JSON.parse(typeof window !== 'undefined' && window.localStorage.getItem('data'))
    setData(data)
  }, [])
  console.log("This data" + data);


  return (
    <div className='flex justify-evenly items-center mt-[15px]'>
      <div className='relative w-[50%]'>
        <input className='px-[40px] py-[8px] rounded-[30px] w-[100%] text-[#000] outline-none' type="search" name="search" />
        <IoSearchSharp className='top-[25%] left-[10px] absolute text-[#888282d2] text-center transform-[translateY(-50%)]' size={22} />
      </div>
      <section className='flex gap-[20px] width-[20%]'>
        <div className='relative flex justify-center items-center bg-[#fff] rounded-full w-[40px] h-[40px]'>
          <FaRegMessage className='text-[#000] text-center' size={18} />
          <span className='top-[-1px] right-[-10] absolute bg-[green] px-[5px] py-[0] rounded-full text-[10px]'>3</span>
        </div>
        <div className='relative flex justify-center items-center bg-[#fff] rounded-full w-[40px] h-[40px]'>
          <IoNotificationsOutline className='text-[#000] text-center' size={25} />
          <span className='top-[-1px] right-[-10] absolute bg-[green] px-[5px] py-[0] rounded-full text-[10px]'>3</span>
        </div>
        <div className='flex justify-center items-center gap-[5px]'>
          <section className='flex justify-center items-center bg-[#fff] rounded-full w-[40px] h-[40px] font-[600] text-[#2196f3] text-[20px]'>
            <span>{data?.name?.split("")[0].toUpperCase()}</span>
          </section>
          <section className='flex flex-col'>
            <strong>{data?.name}</strong>
            <span>{data?.mail}</span>
          </section>
        </div>
      </section>
    </div>
  )
}

