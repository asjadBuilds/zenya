'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useSession } from "next-auth/react"
import { getDoctorProfile, updateDoctorProfile } from "@/services/doctorApi"
import Loader from "./Loader"
import { Button } from "../ui/button"
import { CloudCheck, Eye, EyeClosed, Upload } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { toast } from "sonner"

const AccountSettings = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const id = session?.user.id
  const { data, isLoading } = useQuery({
    queryKey: ['fetchDoctorProfile', id],
    queryFn: () => getDoctorProfile(id || ''),
  })
  const { mutate } = useMutation({
    mutationFn: updateDoctorProfile,
    onSuccess:(response)=>{
      toast.success(response?.message);
      queryClient.invalidateQueries({
        queryKey:['fetchDoctorProfile',id]
      })
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error)
    }
  })
  const [editableFields, setEditableFields] = useState({
    fullname: false,
    email: false,
    phone: false,
    country: false,
    city: false,
    bio: false,
    specialization: false,
    avatar: false
  });
  const [formValues, setFormValues] = useState({
    fullname: data?.data?.fullname || "",
    email: data?.data?.email || "",
    phone: data?.data?.phone || "",
    country: data?.data?.country || "",
    city: data?.data?.city || "",
    bio: data?.data?.bio || "Not Set",
    specialization: data?.data?.specialization || "",
    avatar: File
  });

  const handleInputChange = (field: string, value: string | File) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };


  const handleEditClick = (field: keyof typeof editableFields) => {
    setEditableFields(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = () => {
    let hasAvatar = editableFields.avatar;
    let payload: Record<string, string | File> = {};

    for (const key in editableFields) {
      if (editableFields[key as keyof typeof editableFields]) {
        payload[key] = formValues[key as keyof typeof formValues];
      }
    }

    if (hasAvatar) {
      const formData = new FormData();
      for (const key in payload) {
        formData.append(key, payload[key] as string | Blob);
      }
      console.log("Final FormData:", [...formData.entries()]);
      // send formData to API
      mutate(formData)
    } else {
      console.log("Final JSON Payload:", payload);
      // send JSON to API
      mutate(payload)
    }
  };


  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target && target.files) {
      handleInputChange('avatar', target.files[0]);
    }
    console.log(formValues.avatar)
  }


  if (isLoading) return <Loader />
  return (
    <div className="flex flex-col gap-8 bg-card-primary rounded-xl shadow-md m-4 p-4">
      <h1 className="font-sans font-semibold">Account Settings</h1>
      <div className="flex items-start justify-between *:md:w-1/2 max-md:flex-col">
        <div className="flex flex-col gap-3 *:max-md:flex-col *:max-md:items-start">
          <div className="flex items-center gap-2">
            <Label className="text-nowrap">Full Name:</Label>
            <Input value={data?.data?.fullname} onChange={(e) => handleInputChange('fullname', e.target.value)}
              disabled={!editableFields.fullname} />
            <Button variant={'outline'} onClick={() => handleEditClick('fullname')}>
              {editableFields.fullname ? <Eye /> : <EyeClosed />}
              Edit
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-nowrap">Email:</Label>
            <Input value={data?.data?.email} type="email" onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!editableFields.email} />
            <Button variant={'outline'} onClick={() => handleEditClick('email')}>
              {editableFields.email ? <Eye /> : <EyeClosed />}
              Edit
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-nowrap">Phone: </Label>
            <Input value={data?.data?.phone} type="number" onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!editableFields.phone} />
            <Button variant={'outline'} onClick={() => handleEditClick('phone')}>
              {editableFields.phone ? <Eye /> : <EyeClosed />}
              Edit
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-nowrap">Country:</Label>
            <Input value={data?.data?.country} onChange={(e) => handleInputChange('country', e.target.value)}
              disabled={!editableFields.country} />
            <Button variant={'outline'} onClick={() => handleEditClick('country')}>
              {editableFields.country ? <Eye /> : <EyeClosed />}
              Edit
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-nowrap">City:</Label>
            <Input value={data?.data?.city} onChange={(e) => handleInputChange('city', e.target.value)}
              disabled={!editableFields.city} />
            <Button variant={'outline'} onClick={() => handleEditClick('city')}>
              {editableFields.city ? <Eye /> : <EyeClosed />}
              Edit
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-nowrap">Bio:</Label>
            <Input value={data?.data?.bio || 'Not Set'} onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!editableFields.bio} />
            <Button variant={'outline'} onClick={() => handleEditClick('bio')}>
              {editableFields.bio ? <Eye /> : <EyeClosed />}
              Edit
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-nowrap">Specialization</Label>
            <Input value={data?.data?.specialization} onChange={(e) => handleInputChange('specialization', e.target.value)}
              disabled={!editableFields.specialization} />
            <Button variant={'outline'} onClick={() => handleEditClick('specialization')}>
              {editableFields.specialization ? <Eye /> : <EyeClosed />}
              Edit
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 justify-center">
          <Label className="text-nowrap text-xl font-semibold">Avatar</Label>
          <Image src={data?.data?.avatar} alt="doctor" width={30} height={30} className="!w-40 rounded-full overflow-hidden border-4 border-primary" />
          <Input disabled={!editableFields.avatar} type="file" onChange={(e) => handleAvatarChange(e)} className="md:w-1/2"/>
          <Button variant={'outline'} onClick={() => handleEditClick('avatar')}>
            {editableFields.avatar ? <CloudCheck /> : <Upload />}
            Update</Button>
        </div>
      </div>
      <Button className="md:w-1/2 self-center" onClick={handleSubmit}>Update Profile Details</Button>
    </div>
  )
}

export default AccountSettings