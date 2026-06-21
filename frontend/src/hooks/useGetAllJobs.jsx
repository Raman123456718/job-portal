import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery, filters = {} } = useSelector((store) => store.job) || {};

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const params = new URLSearchParams();
                if (searchedQuery) params.append('keyword', searchedQuery);
                if (filters?.location) params.append('location', filters.location);
                if (filters?.industry) params.append('industry', filters.industry);

                if (filters?.salary) {
                    if (filters.salary === '$0-6') {
                        params.append('minSalary', '0');
                        params.append('maxSalary', '6');
                    } else if (filters.salary === '$6-12') {
                        params.append('minSalary', '6');
                        params.append('maxSalary', '12');
                    } else if (filters.salary === '$12-25') {
                        params.append('minSalary', '12');
                        params.append('maxSalary', '25');
                    } else if (filters.salary === '$25+') {
                        params.append('minSalary', '25');
                    }
                }

                const queryString = params.toString();
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get${queryString ? `?${queryString}` : ''}`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };

        const timer = setTimeout(() => {
            fetchAllJobs();
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [searchedQuery, filters, dispatch]);
};

export default useGetAllJobs;