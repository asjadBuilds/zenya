'use client'

import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useForm } from "react-hook-form"
import { changePassSchema, schema } from "@/models/changePassForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { changePassword } from "@/services/authApi"
import { toast } from "sonner"

const PasswordSetting = ({role}:{role:string}) => {
  const {data:session} = useSession();
  const {
          register,
          getValues,
          reset,
          formState: { errors }
      } = useForm<changePassSchema>({
          resolver: zodResolver(schema),
          defaultValues: {
              newPassword: '',
              oldPassword: session && role === 'user' ? session.user.id : ''
          },
      })
      const {mutate} = useMutation({
        mutationFn:changePassword,
        onSuccess:(response)=>{
          reset();
          toast.success(response?.message)
        },
        onError:(error:any)=>{
          toast.error(error?.response?.data?.error)
        }
      })
  return (
    <div className="flex flex-col gap-4 bg-card-primary rounded-xl shadow-md w-full p-2">
      <h1 className="font-sans font-semibold">Password Settings</h1>
      <div className="flex items-center justify-evenly max-md:flex-col max-md:gap-2">
        <div className="flex items-center gap-2">
          <Label className="text-nowrap">Your Old Password: </Label>
          <Input placeholder="old password" type="password" readOnly={role === 'user'} value={session?.user?.id} {...register('oldPassword')}/>
        </div>
        <div className="flex items-center gap-2">
          <Label className="text-nowrap">Enter New Password: </Label>
          <Input placeholder="new password" type="password" {...register("newPassword")}/>
          {errors.newPassword && <p className='text-red-500 text-sm'>{errors.newPassword.message}</p>}
        </div>
      </div>
      <Button onClick={()=>mutate({oldPassword:getValues().oldPassword ?? '', newPassword:getValues().newPassword, role})}>Change Password</Button>
    </div>
  )
}

export default PasswordSetting