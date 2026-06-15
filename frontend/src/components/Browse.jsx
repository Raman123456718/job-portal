import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();

    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    // Filter jobs based on searchedQuery
    const filteredJobs = allJobs.filter((job) => {
        if (!searchedQuery) return true;

        return (
            job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.company?.name?.toLowerCase().includes(searchedQuery.toLowerCase())
        );
    });

    return (
        <div>
            <Navbar />

            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold text-2xl my-8">
                    Search Results ({filteredJobs.length})
                </h1>

                {filteredJobs.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg mt-10">
                        No jobs found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse;