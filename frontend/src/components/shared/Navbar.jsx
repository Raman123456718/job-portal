import React from 'react'
import { Button } from '../ui/button'
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "../ui/avatar"

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "../ui/popover"
import { User2, LogOut } from "lucide-react"
import { Link } from 'react-router-dom'


const Navbar = () => {
    const user = false;
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>
                        Job<span className='text-[#F83002]'>Portal</span>
                    </h1>
                </div>

                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>
                    {
                        !user ? (
                            <div>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2]  hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage
                                                src="https://github.com/shadcn.png"
                                                alt="@shadcn"
                                            />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <h4 className='font-medium'>Jack Mernstack</h4>
                                            <p className='text-sm text-gray-500'>@jackmern</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-3text-gray-600'>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <div><Button variant="link">View Profile</Button></div>
                                        </div>

                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button variant="link">LogOut</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
