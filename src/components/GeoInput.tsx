import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { User } from '../types/validationSchema';

interface GeoInputProps {
    register: UseFormRegister<User>;
}

const GeoInput: React.FC<GeoInputProps> = ({ register }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                    Latitude
                </label>
                <input
                    type="text"
                    id="latitude"
                    {...register('address.geo.lat')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    readOnly
                />
            </div>
            <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                    Longitude
                </label>
                <input
                    type="text"
                    id="longitude"
                    {...register('address.geo.lng')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    readOnly
                />
            </div>
        </div>
    );
};

export default GeoInput;