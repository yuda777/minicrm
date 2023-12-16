import type { SidebarNavItem } from '@/types'

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'User',
      href: '/list',
      icon: 'user',
      items: [],
    },
    {
      title: 'Upload',
      href: '/upload',
      icon: 'fileup',
      items: [],
    },
    {
      title: 'Customer',
      href: '/customer',
      icon: 'customer',
      items: [],
    },

    {
      title: 'Organization Chart',
      href: '/orgchart',
      icon: 'network',
      items: [],
    },
    {
      title: 'Chart',
      href: '/chart',
      icon: 'chart',
      items: [],
    },
  ],
}
