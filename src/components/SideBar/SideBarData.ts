import React, {JSX} from 'react';
import 'react-icons';
import {IconContext} from "react-icons";

// Define a TypeScript interface for Sidebar items
interface SidebarItem {
    title: string;
    path: string;
    cName: string;
}

// Define the Sidebar data with proper typings
export const SidebarData: SidebarItem[] = [
    {
        title: 'Home',
        path: '/',
        cName: 'nav-text',
    },
    {
        title: 'Reports',
        path: '/reports',
        cName: 'nav-text'
    },
    {
        title: 'Products',
        path: '/products',
        cName: 'nav-text'
    },
    {
        title: 'Team',
        path: '/team',
        cName: 'nav-text'
    },
    {
        title: 'Messages',
        path: '/messages',
        cName: 'nav-text'
    },
    {
        title: 'Support',
        path: '/support',
        cName: 'nav-text'
    }
];