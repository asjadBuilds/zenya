'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchCategories } from '@/services/categoryApi'
import { useForm } from 'react-hook-form'
import schema, { RegisterDoctorSchema } from '@/models/registerDoctor'
import { zodResolver } from "@hookform/resolvers/zod";
import { registerDoctor } from '@/services/authApi'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
const RegisterDoctor = () => {
  const router = useRouter();
    const [phone, setPhone] = useState('')
  const [country, setCountry] = useState<any>('')
  const [countryState, setCountryState] = useState<any>('')
  const [city, setCity] = useState<any>('')
  const { data: categories } = useQuery({
    queryKey: ['fetchCategories'],
    queryFn: fetchCategories,
  })
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      country: '',
      city: '',
      state: '',
      specialization: '',
      categoryId: '',
      avatar: undefined,
      appointmentFees:0 || ''
    },
  })
  const { mutate } = useMutation({
    mutationFn: registerDoctor,
    onSuccess: (response) => {
      toast.success(response?.message)
      toast.info('Please Login Your Account')
      reset();
      setPhone('');
      setCountry('');
      setCity('');
      setCountryState('');
      router.push('/login')
    },
    onError:(error:any)=>{
      toast.error(error?.response?.data?.error)
    }
  })
  const submitHandler = (data: RegisterDoctorSchema) => {
    console.log(data)
    const formData = new FormData();
    for (const key in data) {
        const value = data[key as keyof typeof data];
         if (typeof value !== "undefined" && value !== null && key !== "confirmPassword" && key !== "state" && typeof value !== 'number') {
            formData.append(key, value);
        }
        else if(typeof value === 'number'){
          formData.append(key,value.toString())
        }
    }
    mutate(formData)
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setValue('avatar', file);
    }
  }
  return (
    <form onSubmit={handleSubmit(submitHandler)} className='flex flex-wrap items-center justify-center w-full gap-x-2 gap-y-4'>
          <div className='flex flex-col md:w-[45%] w-full gap-2'>
            <Label>Full Name</Label>
            <Input placeholder='Talha Khalil' {...register('fullname')} />
            {errors.fullname && <p className='text-red-500 text-sm'>{errors.fullname.message}</p>}
          </div>
          <div className='flex flex-col md:w-[45%] w-full gap-2'>
            <Label>Email</Label>
            <Input placeholder='talha123@gmail.com' type='email' {...register('email')} />
            {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
          </div>
          <div className='flex flex-col md:w-[45%] w-full gap-2'>
            <Label>Password</Label>
            <Input type='password' {...register('password')} />
            {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
          </div>
          <div className='flex flex-col md:w-[45%] w-full gap-2'>
            <Label>Confirm Password:</Label>
            <Input type='password' {...register('confirmPassword')} />
            {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
          </div>
          <div className='flex flex-col md:w-[45%] w-full gap-2'>
            <Label>Phone Number</Label>
            <PhoneInput

              country={'pk'}
              value={phone}
              onChange={phone => setValue('phone', phone)}
              
            />
            {errors.phone && <p className='text-red-500 text-sm'>{errors.phone.message}</p>}
          </div>
          <div className='flex flex-col md:w-[45%] w-full gap-2'>
            <Label>Avatar:</Label>
            <Input type='file' accept='image/*' onChange={(e) => handleFileChange(e)} />
            {errors.avatar && <p className='text-red-500 text-sm'>{errors.avatar.message}</p>}
          </div>
          <div className='flex flex-col md:w-[30%] w-full gap-2'>
            <Label>Country:</Label>
            <CountrySelect
              defaultValue={country}
              onChange={(_country) => {
                if (_country && typeof _country === 'object' && 'name' in _country) {
                  console.log(_country);
                  setCountry(_country);
                  setValue('country', _country.name);
                }
              }}
              onTextChange={(e) => {
                setCountry(e.target.value);
                setValue('country', e.target.value);
              }}
              placeHolder="Select Country"
            />
            {errors.country && <p className='text-red-500 text-sm'>{errors.country.message}</p>}
          </div>
          <div className='flex flex-col md:w-[30%] w-full gap-2'>
            <Label>State:</Label>
            <StateSelect
              countryid={country?.id}
              onChange={(_state) => {
                if (_state && typeof _state === 'object' && 'name' in _state) {
                  setCountryState(_state)
                  setValue('state', _state.name);
                }
              }}
              onTextChange={(e) => {
                setCountryState(e.target.value);
                setValue('state', e.target.value);
              }}
              placeHolder="Select State"
            />
            {errors.state && <p className='text-red-500 text-sm'>{errors.state.message}</p>}
          </div>
          <div className='flex flex-col md:w-[30%] w-full gap-2'>
            <Label>City:</Label>
            <CitySelect
              countryid={country?.id}
              stateid={countryState?.id}
              onChange={(_city) => {
                if (_city && typeof _city === 'object' && 'name' in _city) {
                  console.log(_city);
                  setCity(_city)
                  setValue('city', _city.name);
                }
              }}
              onTextChange={(e) => {
                setCity(e.target.value);
                setValue('city', e.target.value);
              }}
              placeHolder="Select City"
            />
            {errors.city && <p className='text-red-500 text-sm'>{errors.city.message}</p>}
          </div>
          <div className='flex flex-col md:w-[30%] w-full gap-2'>
            <Label>Specialization:</Label>
            <Input placeholder='Cardiologist' {...register('specialization')} />
            {errors.specialization && <p className='text-red-500 text-sm'>{errors.specialization.message}</p>}
          </div>
          <div className='flex flex-col md:w-[30%] w-full gap-2'>
            <Label>Category</Label>
            <Select onValueChange={(value) => setValue('categoryId', value)}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories?.data?.map((category: any, index: any) => (
                  <SelectItem key={index} value={category._id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && <p className='text-red-500 text-sm'>{errors.categoryId.message}</p>}
          </div>
          <div className='flex flex-col md:w-[30%] w-full gap-2'>
            <Label>Appointment Fees</Label>
            <Input placeholder='1500' {...register('appointmentFees')}/>
            {errors.appointmentFees && <p className='text-red-500 text-sm'>{errors.appointmentFees.message}</p>}
          </div>
          <Button className='w-full' variant={'default'} type='submit'>Submit</Button>
        </form>
  )
}

export default RegisterDoctor