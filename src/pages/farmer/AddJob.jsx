import { useEffect, useState } from 'react';
import axios from 'axios';


function defaultJob(){
    return{
        
jobCategoryID:'',
farmerID:localStorage.getItem('userID'),
description:'',
wagePerDay:0,
duration:0,
quantity:0,
//date:'',
// isActive:true,
    }
}

export default function AddJob(){
    const [jobCategory,setJobCategory] =useState([]);

    useEffect(()=>{
        axios.get(import.meta.env.VITE_SERVER_URL +'/api/job/category')
        .then((response)=>{
            setJobCategory(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    },[]);

    const [job,setJob] =useState(defaultJob());

    const handleFormChange= (event) =>{
        const {name,value} =  event.target;
        setJob((prevJob)=>({...prevJob,[name]:value}));
    }

    const handleFormSubmit =(event)=>{
        event.preventDefault();
        axios.post(import.meta.env.VITE_SERVER_URL +'/api/job',job)
        .then((response)=>{
            console.log(response);
            setJob(defaultJob());
        })
        .catch((error)=>{
            console.log(error);
        });

    }

    return (
        <>
        <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Job Offers</h3>
              <p className="mt-1 text-sm text-gray-600">Add the job for which you need a worker</p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleFormSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    

                    {/* JOb category dropdown */}
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="jobCategoryID" className="block text-sm font-medium text-gray-700">
                        Job Category
                      </label>

                      <select
                        name="jobCategoryID"
                        id="jobCategoryID"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleFormChange}
                        value={job.jobCategoryID}
                      >
                        <option value="" disabled>Select a job category</option>
                        {jobCategory.map((jobCategory) => (
                          <option
                            key={jobCategory._id}
                            value={jobCategory._id}
                          >
                            {jobCategory.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="job@example.com"
                          onChange={handleFormChange}
                          value={job.description}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description of the job. URLs are hyperlinked.
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="wagePerDay" className="block text-sm font-medium text-gray-700">
                        Wage Per Day
                      </label>
                      <input
                        type="text"
                        name="wagePerDay"
                        id="wagePerDay"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleFormChange}
                        value={job.wagePerDay}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                        Duration
                      </label>
                      <input
                        type="number"
                        name="duration"
                        id="duration"
                        min={1}
                        autoComplete="duration"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleFormChange}
                        value={job.duration}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        min={1}
                        autoComplete="quantity"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={handleFormChange}
                        value={job.quantity}
                      />
                    </div>

                    <br />

                    

                    
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
        
        </>
    )
}