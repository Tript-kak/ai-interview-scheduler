import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSidebar'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

function DashboardProvider({ children }) {
  return (
    <SidebarProvider
  style={{
    "--sidebar-width": "18rem",
    "--sidebar-width-mobile": "20rem",
  }}
>     <div className="flex w-full min-h-screen">
        <AppSidebar/>
      

        <div className="flex-1 bg-slate-100">
            <SidebarTrigger />
            <WelcomeContainer/> 
          {children}
        </div>

        </div>
    </SidebarProvider>
  )
}

export default DashboardProvider