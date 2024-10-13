import React from 'react';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage } from './ui/avatar';

const LatestJobCard = ({ job }) => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer w-full max-w-md mx-auto md:max-w-full'>
            {/* Company Info with Logo */}
            <div className='flex items-center gap-2'>
                {/* Company Logo */}
                <Avatar>
                    <AvatarImage src={job?.company?.logo} alt="Company Logo" />
                </Avatar>
                <div>
                    <h1 className='font-medium text-lg md:text-xl'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            {/* Job Title and Description */}
            <div>
                <h1 className='font-bold text-lg md:text-xl my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            {/* Job Details Badges */}
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold' variant='ghost'>{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold' variant='ghost'>{job?.salary} LPA</Badge>
            </div>
        </div>
    );
};

export default LatestJobCard;
