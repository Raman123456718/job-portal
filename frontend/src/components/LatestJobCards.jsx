import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-6 rounded-2xl bg-white border border-gray-100/85 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/20 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between min-h-[220px]'
        >
            <div>
                <div className='flex items-center gap-3 mb-3'>
                    <div className='w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-indigo-600 shadow-sm overflow-hidden shrink-0'>
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
                    <h1 className='font-bold text-gray-900 text-base my-2 leading-snug hover:text-indigo-600 transition-colors'>{job?.title}</h1>
                    <p className='text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4'>{job?.description}</p>
                </div>
            </div>
            <div className='flex flex-wrap items-center gap-1.5 pt-3 border-t border-gray-50'>
                <Badge className='bg-blue-50 text-blue-700 font-bold border-none px-2.5 py-1 text-[11px] rounded-lg hover:bg-blue-100 transition-colors' variant="flat">
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-rose-50 text-rose-600 font-bold border-none px-2.5 py-1 text-[11px] rounded-lg hover:bg-rose-100 transition-colors' variant="flat">
                    {job?.jobType}
                </Badge>
                <Badge className='bg-violet-50 text-violet-700 font-bold border-none px-2.5 py-1 text-[11px] rounded-lg hover:bg-violet-100 transition-colors' variant="flat">
                    ${job?.salary}
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards