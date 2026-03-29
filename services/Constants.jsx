import { BriefcaseBusiness, Calendar, Code2Icon, CrownIcon, LayoutDashboard,Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";
import { List } from "lucide-react"
export const SideBarOptions=[
    {
    name:'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
    },

     {
    name:'Scheduled Interview',
    icon: Calendar,
    path: '/scheduled-interview'
    },

     {
    name:'All Interview',
    icon: List,
    path: '/all-interview'
    },

     {
    name:'Billing',
    icon: WalletCards,
    path: '/billing'
    },

     {
    name:'Setting',
    icon: Settings,
    path: '/setting'
    }

]

export const InterviewType = [
    {
        title: 'Technical',
        icon: Code2Icon 
    },

    {
        title: 'Behavioral',
        icon: User2Icon
    },
    
    {
        title: 'Experience',
        icon: BriefcaseBusiness
    },

    {
        title: 'Problem Solving',
        icon: Puzzle
    },

    {
        title: 'Leadership',
        icon: CrownIcon
    }
]