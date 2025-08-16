'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginUserSchema, schema } from '@/models/loginUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const page = () => {
    const router = useRouter();
      const [error, setError] = useState('');
      const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<loginUserSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
          email: '',
          password: '',
        },
      })
      const submitHandler = async (data: loginUserSchema) => {
        const res = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        })
        if (res?.error) setError('Invalid Credentials')
        if (res?.ok) router.push('/');
      }
  return (
    <div className='flex flex-col h-screen w-full items-center justify-center'>
        <div className=' border-2 border-primary rounded-xl p-4 xl:w-2xl'>
            <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <Label>Email:</Label>
                  <Input placeholder='johndoe123@gmail.com' {...register('email')} />
                  {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                  <Label>Password:</Label>
                  <Input placeholder='johndoe123' type="password" {...register('password')} />
                  {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                <Button>Submit</Button>
                <Button asChild className='bg-background text-foreground hover:bg-secondary cursor-pointer' onClick={() => signIn("google")}>
                  <div className='flex items-center gap-3'>
                    <Image src={'/assets/google.png'} alt='google-logo' width={24} height={24} />
                    <span>Continue with Google</span>
                  </div>
                </Button>
                <Button asChild className='bg-background text-foreground hover:bg-secondary cursor-pointer'>
                  <div className='flex items-center gap-3'>
                    <Image src={'/assets/facebook.png'} alt='google-logo' width={24} height={24} />
                    <span>Continue with Facebook</span>
                  </div>
                </Button>
              </form>
        </div>
    </div>
  )
}

export default page