"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {SideBarOptions} from "@/services/Constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
 
} from "@/components/ui/sidebar"


export function AppSidebar() {

  const path = usePathname();
  return (
    <Sidebar> 
      <SidebarHeader className= 'flex items-center mt-5' >
        <Image src = {'/logo.png'} alt = "logo" width = {200} 
          height = {100}  
          className="w-[200px] h-[150px]"
        />
        <Button className={'w-full mt-5'}> <Plus/> Create New Interview</Button>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
       
          <SidebarMenu>
            
              {SideBarOptions.map((option,index)=>(
                <SidebarMenuItem key = {index} className='p-1'>
                <SidebarMenuButton asChild className={`p-5 rounded-lg transition-all duration-200 
  ${path == option.path 
    ? "bg-blue-100" 
        : "hover:bg-gray-100"
  }
`}>
                  <Link href = {option.path}>
                  <option.icon className={`${path == option.path ? "text-primary" : ""}`}/>
                  <span className={`text-[16px] font-medium ${path == option.path ? "text-primary" : ""}`}>
                  {option.name}
                  </span>
                  </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
          

          
        </SidebarGroup >
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}