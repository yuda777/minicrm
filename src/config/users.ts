export const PositionColor = [
  { id: 'FNC', color: 'red' },
  { id: 'HR', color: 'yellow' },
  { id: 'IT', color: 'green' },
  { id: 'MKT', color: 'blue' },
  { id: 'SLS', color: 'pink' },
  { id: 'OPT', color: 'orange' },
]

export const FIELD_NAME = {
  userName: { id: 'tu_userName', title: 'Name' },
  position: { id: 'tp_titleDesc', title: 'Position' },
  supervisor: { id: 'tu2_userName', title: 'Supervisor' },
  phoneNumber: { id: 'tu_phoneNumber', title: 'Phone Number' },
  hireDate: { id: 'tu_hireDate', title: 'Hire Date' },
} as const
