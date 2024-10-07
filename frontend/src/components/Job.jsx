import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ApplyJobDialog } from './ApplyJobDialog';
import { Avatar, AvatarImage } from './ui/avatar';

const Job = ({ job }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentDate = new Date();
        const timeDifference = currentDate - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 3600));
    };

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 w-full max-w-md mx-auto md:max-w-full'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button size='icon' className='rounded-full' variant='secondary'>
                    <Bookmark />
                </Button>
            </div>

            {/* Company Info */}
            <div className='flex flex-col sm:flex-row items-center gap-4 my-2'>
                <Button size='icon' variant='outline' className='p-6'>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div className='text-center sm:text-left'>
                    <h1 className='font-medium text-lg md:text-xl'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            {/* Job Title & Description */}
            <div>
                <h1 className='font-bold text-lg md:text-xl my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            {/* Job Details - Positions, Job Type, Salary */}
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant='ghost'>
                    {job?.position} positions
                </Badge>
                <Badge className='text-[#F83002] font-bold' variant='ghost'>
                    {job?.jobType}
                </Badge>
                <Badge className='text-[#7209b7] font-bold' variant='ghost'>
                    {job?.salary}LPA
                </Badge>
            </div>

            {/* Buttons - Details & Save for Later */}
            <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant='outline'
                    className='w-full sm:w-auto rounded-lg'
                >
                    Details
                </Button>
                <Button className='w-full sm:w-auto bg-[#7209b7] rounded-lg'>Save For Later</Button>
            </div>

            {/* Apply Job Dialog */}
            <div>
                <ApplyJobDialog open={open} setOpen={setOpen} />
            </div>
        </div>
    );
};

export default Job;
