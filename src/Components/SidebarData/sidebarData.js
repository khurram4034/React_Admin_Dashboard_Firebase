import React from 'react'
import { AiOutlineDashboard, AiOutlineLogout } from 'react-icons/ai';
import { BiNews } from 'react-icons/bi';
import { SiGoogleanalytics } from 'react-icons/si';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export const SidebarData = [
    {
       title: 'Dashboard',
       icon: <AiOutlineDashboard />,
       link: '/', 
    },
    {
        title: 'Users Added',
        icon: <PersonAddIcon />,
        link: '/users',
    },
    {
        title: 'News',
        icon: <BiNews />,
        link: '/news',
    },
    {
        title: 'Analytics',
        icon: <SiGoogleanalytics />,
        link: '/analytics',
    },
    {
        title: 'Logout',
        icon: <AiOutlineLogout />,
        link: '/logout',
    },

]

