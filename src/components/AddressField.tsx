import React from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { User } from '../types/validationSchema';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';

const GOOGLE_PLACES_API_KEY = import.meta.env.GOOGLE_PLACES_API_KEY;

interface AddressInputProps {
    register: UseFormRegister<User>;
    setValue: UseFormSetValue<User>;
    useGooglePlaces: boolean;
}

const AddressField: React.FC<AddressInputProps> = ({ register, setValue, useGooglePlaces }) => {
    const handleAddressChange = async (place: any) => {
        if (place && place.label) {
            const placeDetails = await geocodeByPlaceId(place.value.place_id);
            const { lat, lng } = placeDetails[0].geometry.location;
            setValue('address', {
                city: place.value.terms[2]?.value || '',
                street: place.value.structured_formatting.main_text || '',
                geo: {
                    lat: lat().toString(),
                    lng: lng().toString(),
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
        <>
            {useGooglePlaces ? (
                <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
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
        </>
    );
};

export default AddressField;