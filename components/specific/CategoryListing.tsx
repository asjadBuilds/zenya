'use client'
import { fetchCategories } from "@/services/categoryApi"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import Loader from "./Loader"
import { createSlug } from "@/utils/helpers"

const CategoryListing = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['fetchCategories'],
    queryFn: fetchCategories,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })
  if(isLoading) return <Loader/>
  return (
    <div className="flex flex-wrap gap-4 w-full justify-center">
      {categories?.data?.map((category: any, index: number) => (
        <Link key={index} href={`/doctors/${createSlug(category?.name)}/${category._id}`} className="w-full md:w-1/4">
          <div className="flex flex-col gap-4 items-center justify-center  border-4 border-primary rounded-xl h-40 group hover:bg-primary-hover transition-all duration-200 cursor-pointer hover:translate-y-2" >
            <Image src={category?.avatar} alt={category?.name} width={80} height={80} />
            <h1 className="font-semibold font-sans group-hover:text-primary transition-colors duration-200">{category?.name}</h1>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryListing