import React from 'react'
import LatestJobCard from './LatestJobCards';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#FF5722]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                {
                    allJobs && allJobs.slice(0, 6).map(job => (
                        <Link key={job._id} to={`/description/${job?._id}`}>
                            <LatestJobCard job={job} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}   

export default LatestJobs