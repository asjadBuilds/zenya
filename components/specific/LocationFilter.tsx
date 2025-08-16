'use client'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { CitySelect, CountrySelect, StateSelect } from 'react-country-state-city'
import "react-country-state-city/dist/react-country-state-city.css";
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'

const LocationFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [country, setCountry] = useState<any>(searchParams.get('country') || '');
    const [countryState, setCountryState] = useState<any>(searchParams.get('state') || '');
    const [city, setCity] = useState<any>(searchParams.get('city') || '');

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (country) params.set('country', country.name || country);
        if (countryState) params.set('state', countryState.name || countryState);
        if (city) params.set('city', city.name || city);
        router.push(`?${params.toString()}`);
    }
    return (
        <div className='flex max-md:flex-col items-center gap-2'>
            <Label className='max-md:text-center'>Filter Location</Label>
            <CountrySelect
                defaultValue={country}
                onChange={(_country) => {
                    if (_country && typeof _country === 'object' && 'name' in _country) {
                        setCountry(_country);
                    }
                }}
                onTextChange={(e) => {
                    console.log(e.target.value)
                    setCountry(e.target.value);
                }}
                placeHolder="Select Country"
            />
            <StateSelect
                countryid={country?.id}
                onChange={(_state) => {
                    if (_state && typeof _state === 'object' && 'name' in _state) {
                        setCountryState(_state)
                    }
                }}
                onTextChange={(e) => {
                    setCountryState(e.target.value);
                }}
                placeHolder="Select State"
            />
            <CitySelect
                countryid={country?.id}
                stateid={countryState?.id}
                onChange={(_city) => {
                    if (_city && typeof _city === 'object' && 'name' in _city) {
                        setCity(_city)
                    }
                }}
                onTextChange={(e) => {
                    setCity(e.target.value);
                }}
                placeHolder="Select City"
            />
            <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
    )
}

export default LocationFilter