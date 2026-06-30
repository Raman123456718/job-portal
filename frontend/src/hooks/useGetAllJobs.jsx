import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery, filters = {} } = useSelector((store) => store.job) || {};

    // Serialize filters to a stable string to avoid infinite re-renders
    const filtersKey = useMemo(() => JSON.stringify(filters), [filters]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchAllJobs = async () => {
            try {
                const currentFilters = JSON.parse(filtersKey);
                const params = new URLSearchParams();
                if (searchedQuery) params.append('keyword', searchedQuery);
                if (currentFilters?.location) params.append('location', currentFilters.location);
                if (currentFilters?.industry) params.append('industry', currentFilters.industry);

                if (currentFilters?.salary) {
                    if (currentFilters.salary === '$0-6') {
                        params.append('minSalary', '0');
                        params.append('maxSalary', '6');
                    } else if (currentFilters.salary === '$6-12') {
                        params.append('minSalary', '6');
                        params.append('maxSalary', '12');
                    } else if (currentFilters.salary === '$12-25') {
                        params.append('minSalary', '12');
                        params.append('maxSalary', '25');
                    } else if (currentFilters.salary === '$25+') {
                        params.append('minSalary', '25');
                    }
                }

                const queryString = params.toString();
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get${queryString ? `?${queryString}` : ''}`,
                    { withCredentials: true, signal: controller.signal }
                );

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.log(error);
                }
            }
        };

        const delay = searchedQuery ? 300 : 0;
        const timer = setTimeout(() => {
            fetchAllJobs();
        }, delay);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [searchedQuery, filtersKey, dispatch]);
};

export default useGetAllJobs;