
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative text-center overflow-hidden py-16 px-4'>
            {/* Ambient Background Glows */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-indigo-400/10 rounded-full blur-[130px] pointer-events-none -z-10" />
            <div className="absolute top-24 left-1/3 w-[300px] h-[300px] bg-rose-400/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className='flex flex-col gap-6 max-w-4xl mx-auto'>
                {/* Glass Tag with breathing pulse */}
                <span className='mx-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-gray-200/50 backdrop-blur-sm text-rose-500 font-bold text-xs tracking-wider uppercase shadow-sm'>
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                    No. 1 Job Portal Platform
                </span>

                {/* Main Heading & Subtitle */}
                <h1 className='text-5xl md:text-7xl font-black font-display tracking-tight text-gray-900 leading-[1.1]'>
                    Search, Apply & <br /> Get Your <span className='bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-500 bg-clip-text text-transparent'>Dream Jobs</span>
                </h1>
                
                <p className='max-w-2xl mx-auto text-base md:text-lg text-gray-500 mt-2 font-medium leading-relaxed'>
                    Discover open job opportunities from top-tier tech giants to hyper-growth startups. Secure your next role with a single click.
                </p>
                
                {/* Custom Glass Search Bar */}
                <div className='flex w-full max-w-2xl bg-white shadow-xl hover:shadow-2xl hover:shadow-indigo-500/5 border border-gray-200/60 p-2 rounded-2xl items-center gap-2 mx-auto mt-6 transition-all duration-300 group focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500'>
                    <Search className='h-5 w-5 text-gray-400 ml-3 group-focus-within:text-indigo-500 transition-colors' />
                    <input
                        type="text"
                        placeholder='Find your dream jobs by title, skills or keywords...'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full text-gray-800 placeholder-gray-400 font-medium text-sm md:text-base bg-transparent'
                    />
                    <Button onClick={searchJobHandler} className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-200 px-6 py-5">
                        Search
                    </Button>
                </div>

                {/* Credibility Stats */}
                <div className='grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-14 pt-8 border-t border-gray-100 w-full'>
                    <div>
                        <h3 className='text-3xl font-black text-indigo-600 font-display'>12K+</h3>
                        <p className='text-xs font-bold text-gray-400 uppercase tracking-wider mt-1'>Active Jobs</p>
                    </div>
                    <div>
                        <h3 className='text-3xl font-black text-rose-500 font-display'>8K+</h3>
                        <p className='text-xs font-bold text-gray-400 uppercase tracking-wider mt-1'>Companies</p>
                    </div>
                    <div>
                        <h3 className='text-3xl font-black text-emerald-500 font-display'>4.8★</h3>
                        <p className='text-xs font-bold text-gray-400 uppercase tracking-wider mt-1'>Rating</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
