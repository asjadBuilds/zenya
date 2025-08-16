'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { loginUserSchema, schema } from '@/models/loginUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, signOut, useSession } from 'next-auth/react'
import ForgetPassForm from './ForgetPassForm'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const Header = () => {
  const { data: session } = useSession();
  const {setTheme} = useTheme();
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
  const logoutHandler = async () => {
    await fetch('/api/auth/deleteCookies', {
      method: 'POST',
    });
    signOut();
  }
  return (
    <div className='flex justify-between bg-primary px-4 py-2'>
      <Link className='flex items-center gap-2' href={'/'}>
        <Image src={'/assets/zenya-logo-white.png'} alt='logo-main' width={50} height={50} />
        <h1 className='text-3xl font-bold text-white'>Zenya</h1>
      </Link>
      <div className='flex items-center gap-2'>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        {!session ? <>
          <Button className='bg-background text-foreground font-medium uppercase hover:bg-secondary' onClick={() => router.push('/select-role')}>Signup</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-background text-foreground font-medium uppercase hover:bg-secondary'>Login</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign in</DialogTitle>
                <DialogDescription>
                  Enter Your Credentials to continue
                </DialogDescription>
              </DialogHeader>
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
              <ForgetPassForm />
            </DialogContent>
          </Dialog>
        </> : <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className='size-12'>
                <AvatarImage src={session?.user?.image! || session?.user?.avatar} ></AvatarImage>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>router.push(`/settings/${session?.user?.role}`)}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => logoutHandler()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>}

      </div>
    </div>
  )
}

export default Header