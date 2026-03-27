import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSidebar'

function DashboardProvider({ children }) {
  return (
    <SidebarProvider
  style={{
    "--sidebar-width": "18rem",
    "--sidebar-width-mobile": "20rem",
  }}
>   
        <AppSidebar/>
      

        <div className="flex-1">
            <SidebarTrigger /> 
          {children}
        </div>
    </SidebarProvider>
  )
}

export default DashboardProvider