import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'

const SavedJobsTable = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/saved-jobs`, { withCredentials: true });
                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchSavedJobs();
    }, []);

    const removeSavedJob = async (jobId) => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/saved-jobs/${jobId}`, {}, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setSavedJobs(savedJobs.filter(job => job._id !== jobId));
                dispatch(setUser({
                    ...user,
                    profile: {
                        ...user.profile,
                        savedJobs: res.data.savedJobs
                    }
                }));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to remove saved job");
        }
    };

    if (loading) return <div>Loading saved jobs...</div>

    return (
        <div>
            <Table>
                <TableCaption>A list of your saved jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date Saved</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        savedJobs.length <= 0 ? <span>You haven't saved any jobs yet.</span> : savedJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="font-medium cursor-pointer hover:text-indigo-600 hover:underline" onClick={() => navigate(`/description/${job._id}`)}>
                                    {job?.title}
                                </TableCell>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell className="text-right flex gap-2 justify-end">
                                    <Button onClick={() => navigate(`/description/${job._id}`)} variant="outline" size="sm">View</Button>
                                    <Button onClick={() => removeSavedJob(job._id)} variant="destructive" size="sm">Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default SavedJobsTable
