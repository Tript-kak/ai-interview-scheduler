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
                <SidebarMenuItem key = {index} className={'p-1'}>
                <SidebarMenuButton asChild className={'p-5'}>
                  <Link href = {option.path}>
                  <option.icon/>
                  <span className={`text-[16px] ${path === option.path ? "text-primary" : ""}`}>
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