import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import GooglePlacesAutocomplete, {geocodeByPlaceId} from 'react-google-places-autocomplete';
import {userSchema, User} from '../types/validationSchema';

interface UserFormProps {
    onSubmit: (data: User) => void;
    initialValues?: User;
}

const GOOGLE_PLACES_API_KEY = import.meta.env.GOOGLE_PLACES_API_KEY;

const UserForm: React.FC<UserFormProps> = ({onSubmit, initialValues}) => {
    const [useGooglePlaces, setUseGooglePlaces] = useState(!!initialValues?.address);
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<User>({
        resolver: zodResolver(userSchema),
        defaultValues: initialValues,
    });

    const handleAddressChange = async (place: any) => {
        if (place && place.label) {
            const placeDetails = await geocodeByPlaceId(place.value.place_id);
            const { lat, lng } = placeDetails[0].geometry.location;
            setValue('address', {
                city: place.value.terms[2]?.value || '',
                street: place.value.structured_formatting.main_text || '',
                geo: {
                    lat: lat(),
                    lng: lng(),
                },
            });
        } else {
            setValue('address', {
                city: '',
                zipcode: '',
                street: '',
                geo: {
                    lat: null,
                    lng: null,
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    {useGooglePlaces ? (
                        <div
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <GooglePlacesAutocomplete
                                apiKey={GOOGLE_PLACES_API_KEY}
                                selectProps={{
                                    onChange: handleAddressChange,
                                    isClearable: true,
                                }}
                            />
                        </div>
                    ) : (
                        <input
                            type="text"
                            id="address"
                            {...register('address.street')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    )}
                    {errors.address?.street && <span className="text-red-500 text-sm">{errors.address.street.message}</span>}
                </div>
            </div>
            <div>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={useGooglePlaces}
                        onChange={(e) => setUseGooglePlaces(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Use Google Location</span>
                </label>
            </div>
            {useGooglePlaces && (
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
            )}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        {...register('username')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                </div>
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        {...register('address.city')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.address?.city && <span className="text-red-500 text-sm">{errors.address.city.message}</span>}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>
                <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                        Zip Code
                    </label>
                    <input
                        type="text"
                        id="zipCode"
                        {...register('address.zipcode')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.address?.zipcode && <span className="text-red-500 text-sm">{errors.address.zipcode.message}</span>}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Nr
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                </div>
            </div>


            <div className="flex justify-end">
                <input
                    type="submit"
                    className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                />
            </div>
        </form>
    );
};

export default UserForm;