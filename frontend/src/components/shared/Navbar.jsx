import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='sticky top-0 z-50 backdrop-blur-md bg-white/75 border-b border-gray-100/50 shadow-sm transition-all duration-300'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
                <div>
                    <Link to="/">
                        <h1 className='text-2xl font-black font-display tracking-tight bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-500 bg-clip-text text-transparent cursor-pointer hover:opacity-90 transition-opacity'>
                            Job<span className='text-rose-500 font-extrabold'>Portal</span>
                        </h1>
                    </Link>
                </div>
                <div className='flex items-center gap-8'>
                    <ul className='flex font-semibold items-center gap-7 text-gray-600 text-sm'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className='hover:text-indigo-600 transition-colors py-2 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='hover:text-indigo-600 transition-colors py-2 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='hover:text-indigo-600 transition-colors py-2 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full'>Home</Link></li>
                                    <li><Link to="/jobs" className='hover:text-indigo-600 transition-colors py-2 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full'>Jobs</Link></li>
                                    <li><Link to="/browse" className='hover:text-indigo-600 transition-colors py-2 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full'>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button variant="ghost" className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 font-semibold transition-all duration-200">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-200 rounded-lg px-5">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="flex flex-col items-center cursor-pointer">
                                        <div className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center bg-white shadow-sm overflow-hidden">

                                            {user?.profile?.profilePhoto ? (
                                                <img
                                                    src={user?.profile?.profilePhoto}
                                                    alt="profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                // Prototype icon when no profile photo
                                                <User2 size={22} className="text-gray-500" />
                                            )}

                                        </div>

                                        <span className="text-xs mt-1 text-gray-700">Profile</span>
                                    </div>
                                </PopoverTrigger>

                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
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