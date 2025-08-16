'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';

const SearchDoctor = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const handleSearch = ()=>{
        if(query.trim()){
            router.push(`/doctors?search=${encodeURIComponent(query)}`)
        }
    }
    return (
        <div className="relative w-full">
            <Input placeholder="Search Your Doctor" value={query} onChange={(e)=>setQuery(e.target.value)}/>
            <div className="absolute top-0 right-0">
                <Button className="text-sm font-medium" onClick={()=>handleSearch()}>Search</Button>
            </div>
        </div>
    )
}

export default SearchDoctor