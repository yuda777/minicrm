import { User, Position } from '@/db/schema'
import { type FileWithPath } from 'react-dropzone'
import { type z } from 'zod'
import { type Icons } from '@/components/icons'

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export type Option = {
  label: string
  value: string
}

export type FileWithPreview = FileWithPath & {
  preview: string
}

export type StoredFile = {
  id: string
  name: string
  url: string
}

export type SubscriptionPlan = {
  id: 'basic' | 'standard' | 'pro'
  name: string
  description: string
  features: string[]
  stripePriceId: string
  price: number
  isCanceled?: boolean
}

// export type UserWithPosition = Pick<
//   User,
//   'userId' | 'name' | 'parentId' | 'photo'
// > &
//   Pick<
//     Position,
//     | 'titleCode'
//     | 'titleDesc'
//     | 'departementCode'
//     | 'departementDesc'
//     | 'colorCode'
//   >
export type UserWithPosition = {
  id: number
  parentId: number | null
  name: string
  photo: string | null
  titleCode: string | null
  titleDesc: string | null
  departementCode: string | null
  departementDesc: string | null
}

export type userPositionWithSuperior = {
  userId: number
  parentId: number | null
  userName: string
  userTitleCode: string | null
  userTitleDesc: string | null
  userDeptCode: string | null
  userDeptDesc: string | null
  userPhoto: string | null
  userEmail: string | null
  userPhone: string | null
  userHireDate: string | null
  userStatusActive: Boolean | null
  superiorTitleCode: string | null
  superiorTitleDesc: string | null
  superiorDeptCode: string | null
  superiorDeptDesc: string | null
  superiorName: string | null
}
// export interface IUser {
//   id: number
//   name: string | null
//   parentId: number | null
//   position: string | null
//   photo: string | null
// }

export type UserData = {
  userid: number
  name: string
  position: string | null
  supervisor_position: string | null
  photo: string | null
  supervisor: string | null
  email: string | null
  phone_number: string | null
  hire_date: string | null
  status_active: boolean | null
}
