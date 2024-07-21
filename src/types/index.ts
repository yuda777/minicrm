import { type FileWithPath } from 'react-dropzone'
import { type Icons } from '@/components/icons'
import { DateRange } from 'react-day-picker'
import { conditionValues, operatorValues } from '@/config/advanceSearch'
import { PgTable } from 'drizzle-orm/pg-core'

const conditionValuesTuple = conditionValues as [string, ...string[]]
const operatorValuesTuple = operatorValues as [string, ...string[]]
type Condition = (typeof conditionValuesTuple)[number]
type Operator = (typeof operatorValuesTuple)[number]
export const typeValues = [
  'string',
  'number',
  'boolean',
  'date',
  'option',
  'array',
] as const
export type TypeValue = (typeof typeValues)[number]

export type getOptionsDataType = {
  table: string
  fieldForValue: string
  fieldForLabel: string
  fieldAvatar?: string
  styleId?: string
}
export type ConfigPageType = {
  table: string
  alias: string
  column: Column[]
}
export type tableColumnsDescType = {
  columnDataType?: TypeValue
  label: string
  value: string
}
type Column = {
  columnDataType: TypeValue
  label: string
  value: string
  optionData?: optionDataType[]
  fieldQuery?: fieldQueryType
  cellInfo?: CellInfoType[]
}
type fieldQueryType = {
  fieldForLabel: string
  fieldForValue: string
  fieldAvatar?: string
  styleId?: string
}
export type CellInfoType = {
  id: string
  color?: string
  icon?: string
}

export type optionDataType = {
  value: string
  label: string
  styleId?: string
  avatar?: string
}
export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export type userPositionType = {
  id: number
  parentId: number
  titleCode: string
  titleDesc: string
  departementCode: string
  departementDesc: string
  name: string
  photo: string
}

export type tableColumnsType = {
  columnDataType?: TypeValue
  label: string
  tableName?: string | undefined
  value: string
}
export type FieldValueType =
  | string
  | number
  | boolean
  | DateRange
  | { from?: Date | undefined; to?: Date | undefined }
  | { value?: string | number; label?: string }[]

export type IParamSearch = {
  paramSearch: {
    condition: Condition
    fieldName: string
    tableName?: string | undefined
    typeValue?: TypeValue
    operator?: Operator | undefined
    fieldValue: FieldValueType
  }[]
}
export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}
export type columnWithPositionType = {
  column: string
  columnRelation?: string
  data: Option[]
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
  additionalInfo?: string
  disable?: boolean
  deptCode?: string
}

export type MultiOptType = {
  label: string
  value: string
  additionalInfo?: string
  disable?: boolean
  deptCode?: string
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

export type UserWithPosition = {
  id: number
  parentId: number | null
  userName: string
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

export type uriParamsType = {
  limit: number
  page: number
  sort: string
}
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
