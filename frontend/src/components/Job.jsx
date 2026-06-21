import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin } from 'lucide-react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div className='p-6 rounded-2xl bg-white border border-gray-100/85 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/20 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between min-h-[300px]'>
            <div>
                <div className='flex items-center justify-between gap-2 mb-3'>
                    <span className='text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wide'>
                        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </span>
                    <Button variant="ghost" className="text-gray-400 hover:text-rose-500 hover:bg-rose-50/50 border-none rounded-full h-8 w-8 p-0" size="icon">
                        <Bookmark size={16} />
                    </Button>
                </div>

                <div className='flex items-center gap-3.5 my-3'>
                    <div className='w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-indigo-600 shadow-sm overflow-hidden shrink-0'>
                        {job?.company?.logo ? (
                            <img src={job.company.logo} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                            <span className='text-sm'>{job?.company?.name?.charAt(0) || 'C'}</span>
                        )}
                    </div>
                    <div>
                        <h1 className='font-bold text-gray-800 text-sm leading-tight hover:text-indigo-600 transition-colors'>{job?.company?.name}</h1>
                        <p className='text-[10px] font-bold text-gray-400 inline-flex items-center gap-0.5 mt-0.5 uppercase tracking-wide'>
                            <MapPin size={10} className="text-gray-400" /> {job?.location || "India"}
                        </p>
                    </div>
                </div>

                <div>
                    <h1 className='font-bold text-gray-900 text-base leading-snug hover:text-indigo-600 transition-colors my-2'>{job?.title}</h1>
                    <p className='text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4'>{job?.description}</p>
                </div>
            </div>

            <div>
                <div className='flex flex-wrap items-center gap-1.5 pt-3 border-t border-gray-50 mb-4'>
                    <Badge className='bg-blue-50 text-blue-700 font-bold border-none px-2.5 py-1 text-[11px] rounded-lg hover:bg-blue-100 transition-colors' variant="flat">
                        {job?.position} Positions
                    </Badge>
                    <Badge className='bg-rose-50 text-rose-600 font-bold border-none px-2.5 py-1 text-[11px] rounded-lg hover:bg-rose-100 transition-colors' variant="flat">
                        {job?.jobType}
                    </Badge>
                    <Badge className='bg-violet-50 text-violet-700 font-bold border-none px-2.5 py-1 text-[11px] rounded-lg hover:bg-violet-100 transition-colors' variant="flat">
                        {job?.salary} LPA
                    </Badge>
                </div>
                <div className='flex items-center gap-3 w-full'>
                    <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline" className="border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/20 font-semibold rounded-xl text-sm py-4 h-auto flex-1 transition-all duration-200 hover:-translate-y-0.5">
                        Details
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 rounded-xl text-sm py-4 h-auto flex-1 transition-all duration-200 hover:-translate-y-0.5">
                        Save Job
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Job