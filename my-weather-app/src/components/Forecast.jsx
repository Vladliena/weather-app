import React from 'react';
import icon from './images/pngwing.com.png'

function Forecast ({title}) {
        return <div>
                <div className='flex items-center justify-start mt-6'>
                        <p className='text-white font-medium uppercase'>{title}</p>
                </div>
                <hr className='my-2'/>
                <div className='flex flew-row items-center justify-between text-white'>
                        <div className='flex flex-col items-center justify-center'>
                                <p className='font-light text-sm'>
                                        04:30 PM
                                </p>
                                <img src={icon} alt='icon' className='w-12 my-1'/>
                                <p className='font-medium'>22°</p>
                        </div>
                </div>
        </div>
}


export default Forecast