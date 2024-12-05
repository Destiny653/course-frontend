import React from 'react';
import './navbar.css';
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { SlHeart } from "react-icons/sl";
import { VscSearch } from "react-icons/vsc";

export default function Navbar() {
    return (
        <div className='box-border my-1 nav-p'>
             <section className='box-border w-full b-[#40abdd4d] nav-menu'>
                <section className='flex gap-[8px]'>
                    <div className='box-border flex flex-col justify-evenly items-center bg-[#8d5f0b56] py-[3px] rounded-md w-[46px] h-[42px]'>
                        <section className='bg-white rounded-xl w-[32px] h-[3px]' ></section>
                        <section className='bg-white rounded-xl w-[28px] h-[3px]' ></section>
                        <section className='bg-white rounded-xl w-[32px] h-[3px]' ></section>
                    </div>
                    <h1 className='font-[600] text-[27px]'>GENI~I</h1>
                </section>
                <section className='relative box-border flex justify-center'>
                    <input className='px-[20px] py-[12px] border rounded-lg w-[80%] placeholder:text-[14px]' type="text" placeholder='Search products...'  />
                    <VscSearch className='top-[15%] right-[11%] box-border absolute bg-[#8d5f0b56] p-[5px] rounded-full w-[30px] h-[30px] text-[#000] text-[30px]' />
                </section>
                <section className='flex justify-between'>
                    <div className='flex justify-center items-center gap-[4px]'>
                        <section className='flex justify-center items-center bg-[#8d5f0b56] rounded-lg w-12 h-12'>
                            <CiUser className='w-[60%] h-[60%]' color="#000" />
                        </section>
                        <section>
                            <ul className='text-[14px]'>
                                <li>Hello...</li>
                                <li>Sign in or Register</li>
                            </ul>
                        </section>
                    </div>
                    <div className='relative flex justify-center items-center bg-[#8d5f0b56] rounded-lg w-12 h-12'> 
                        <span className='top-[-15%] left-[60%] absolute flex justify-center items-center bg-[#7bce5bf6] rounded-full w-[45%] h-[47%] text-[#fff] text-[13px]'>15</span>
                        <CiShoppingCart className='w-[60%] h-[60%]' color="#000" />
                    </div>
                    <div className='relative flex justify-center items-center bg-[#8d5f0b56] rounded-lg w-12 h-12'>
                        <span className='top-[-15%] left-[60%] absolute flex justify-center items-center bg-[red] rounded-full w-[45%] h-[47%] text-[#fff] text-[13px]'>10</span>
                        <SlHeart className='w-[47%] h-[47%]' color="#000" />
                    </div>
                </section>
            </section>
            <section className='nav-link-b'>
                <nav className='w-full nav-link-c'>
                    <ul className='box-border flex items-center gap-[20px] py-[10px] nav-link-p'>
                        <button className='bg-[#8d5f0b56] px-[20px] py-[12px] rounded-md text-white'>All Categories</button>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="#">About</Link></li>
                        <li><Link href="#">Services</Link></li>
                        <li><Link href="#">Contact</Link></li>
                        <li><Link href="/dashboard/create">Dashboard</Link></li>
                    </ul>
                    <p className='text-[#8d600bb9]'>+237-675-456-389</p>
                </nav>
            </section>
           
        </div>
    )
}
