import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import SavedJobsTable from './SavedJobsTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24 ring-4 ring-indigo-100">
                            <AvatarImage
                                src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                                alt="profile"
                            />
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-xl text-gray-900'>{user?.fullname}</h1>
                            <p className='text-gray-500 mt-1'>{user?.profile?.bio || "No bio added yet"}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                        <Pen size={16} />
                    </Button>
                </div>
                <div className='my-5 space-y-2'>
                    <div className='flex items-center gap-3 my-2 text-gray-700'>
                        <Mail size={18} className="text-indigo-500 shrink-0" />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2 text-gray-700'>
                        <Contact size={18} className="text-indigo-500 shrink-0" />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-semibold text-gray-800 mb-2'>Skills</h1>
                    <div className='flex flex-wrap items-center gap-2'>
                        {
                            user?.profile?.skills?.length > 0
                                ? user.profile.skills.map((item, index) => (
                                    <Badge key={index} className="bg-indigo-50 text-indigo-700 border-none font-semibold px-3 py-1">
                                        {item}
                                    </Badge>
                                ))
                                : <span className='text-gray-400 text-sm'>No skills added yet</span>
                        }
                    </div>
                </div>
                {
                    user?.role !== 'recruiter' && (
                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <Label className="text-md font-bold">Resume</Label>
                            {
                                user?.profile?.resume
                                    ? (
                                        <a
                                            target='_blank'
                                            rel="noreferrer"
                                            href={`https://docs.google.com/gview?url=${encodeURIComponent(user.profile.resume)}&embedded=true`}
                                            className='inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer text-sm font-medium'
                                        >
                                            <FileText size={16} />
                                            {user.profile.resumeOriginalName || "View Resume"}
                                        </a>
                                    )
                                    : <span className='text-gray-400 text-sm'>No resume uploaded</span>
                            }
                        </div>
                    )
                }
            </div>
            {
                user?.role !== 'recruiter' && (
                    <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                        {/* Applied Job Table */}
                        <AppliedJobTable />
                        
                        <h1 className='font-bold text-lg mt-10 my-5'>Saved Jobs</h1>
                        {/* Saved Job Table */}
                        <SavedJobsTable />
                    </div>
                )
            }
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile