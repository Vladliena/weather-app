import React from "react";
import icon from "./images/pngwing.com.png"
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from "@iconscout/react-unicons";
import {iconUrlFromCode} from "../services/weatherService";

function TemperatureAndDetails({weather:{
    details,icon,temp,speed,humidity,feels_like
}}) {
    return <div>
        <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
            <p>{details}</p>
        </div>

        <div className='flex flex-row items-center justify-between text-white py-3'>
            <img src={iconUrlFromCode(icon)}
                 alt='icon'
            className='w-20'/>
            <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
            <div className='flex flex-col space-y-2'>
                <div className='flex font-light items-center text-sm justify-center'>
                    <UilTemperature size={18} className='mr-1' />
                    Real fell:
                    <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
                </div>
                <div className='flex font-light items-center text-sm justify-center'>
                    <UilTear size={18} className='mr-1' />
                    Humidity:
                    <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
                </div>
                <div className='flex font-light items-center text-sm justify-center'>
                    <UilWind size={18} className='mr-1' />
                    Wind:
                    <span className='font-medium ml-1'>{`${speed.toFixed()}km/h`}</span>
                </div>
            </div>
        </div>
    </div>
}

export default TemperatureAndDetails
