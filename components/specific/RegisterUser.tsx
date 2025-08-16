'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import schema, { RegisterUserSchema } from '@/models/registerUser'
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from '@/services/authApi'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
const RegisterUser = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: undefined
    },
  })
  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      toast.success(response?.message)
      toast.info('Please Login Your Account')
      reset();
      router.push('/login')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error)
    }
  })
  const submitHandler = (data: RegisterUserSchema) => {
    console.log(data);
    const formData = new FormData();
    for (const key in data) {
      const value = data[key as keyof typeof data];
      if (typeof value !== "undefined" && value !== null && key !== "confirmPassword" && key !== "state") {
        formData.append(key, value);
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
        <Label>Username</Label>
        <Input placeholder='Talha Khalil' {...register('username')} />
        {errors.username && <p className='text-red-500 text-sm'>{errors.username.message}</p>}
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
      <div className='flex flex-col w-full gap-2'>
        <Label>Avatar:</Label>
        <Input type='file' accept='image/*' onChange={(e) => handleFileChange(e)} />
        {errors.avatar && <p className='text-red-500 text-sm'>{errors.avatar.message}</p>}
      </div>
      <Button className='w-full' variant={'default'} type='submit'>Submit</Button>
    </form>
  )
}

export default RegisterUser