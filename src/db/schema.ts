// import { mysqlTable, serial, text, varchar, int } from "drizzle-orm/mysql-core";
import {
  integer,
  boolean,
  date,
  text,
  pgTable,
  serial,
  varchar,
  timestamp,
  getTableConfig,
  PgTable,
} from 'drizzle-orm/pg-core'

import {
  InferModelFromColumns,
  relations,
  type InferSelectModel,
} from 'drizzle-orm'

export const employeePerformance = pgTable('employee_performance', {
  performanceId: serial('performance_id').primaryKey().notNull(),
  userId: integer('user_id').notNull(),
  photo: varchar('photo', { length: 50 }),
  colorhex: varchar('colorhex', { length: 6 }),
  name: varchar('name', { length: 50 }),
  performanceScore: integer('performance_score'),
})
export type EmployeePerformance = InferSelectModel<typeof employeePerformance>

export const customer = pgTable('customer', {
  customerId: serial('customer_id').primaryKey().notNull(),
  customerName: varchar('customer_name', { length: 100 }).notNull(),
  reasonId: integer('reason_id').references(() => reason.reasonId),
  csrUserId: integer('csr_user_id').references(() => users.userId),
  email: varchar('email', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  address: varchar('address', { length: 255 }),
  birthDate: date('birth_date'),
  registrationDate: timestamp('registration_date', {
    mode: 'string',
  }).defaultNow(),
  batchId: integer('batch_id').references(() => uploadBatch.batchId),
  statusActive: boolean('status_active').default(true),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }),
})

export type Customer = InferSelectModel<typeof customer>

// export const customerRelations = relations(customer, ({ one, many }) => ({
//   batch: many(batchUpload),
//   status: one(customerStatus, {
//     fields: [customer.statusId],
//     references: [customerStatus.statusId],
//   }),
// }))

export const { columns } = getTableConfig(customer)

export const uploadMapping = pgTable('upload_mapping', {
  uploadMappingId: serial('upload_mapping_id').primaryKey().notNull(),
  mappingName: varchar('mapping_name', { length: 50 }),
  mappingDescription: text('mapping_description'),
  fieldExcel: varchar('field_excel', { length: 50 }),
  fieldTable: varchar('field_table', { length: 50 }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
})

export type UploadMapping = InferSelectModel<typeof uploadMapping>

export const batchUpload = pgTable('batch_upload', {
  batchUploadId: serial('batch_upload_id').primaryKey().notNull(),
  uploadMappingId: integer('upload_mapping_id').references(
    () => uploadMapping.uploadMappingId,
  ),
  filename: varchar('filename', { length: 100 }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
})

export type BatchUpload = InferSelectModel<typeof batchUpload>

export const reason = pgTable('reason', {
  reasonId: serial('reason_id').primaryKey().notNull(),
  reason: varchar('reason', { length: 70 }).notNull(),
  responseId: integer('response_id')
    .notNull()
    .references(() => response.responseId),
  statusActive: boolean('status_active').default(true),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }),
})
export const response = pgTable('response', {
  responseId: serial('response_id').primaryKey().notNull(),
  response: varchar('response', { length: 20 }).notNull(),
  statusActive: boolean('status_active').default(true),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }),
})

export const uploadBatch = pgTable('upload_batch', {
  batchId: serial('batch_id').primaryKey().notNull(),
  batchName: varchar('batch_name', { length: 100 }).notNull(),
  uploadDate: timestamp('upload_date', { mode: 'string' }).defaultNow(),
  uploadedBy: varchar('uploaded_by', { length: 100 }).notNull(),
  totalRecords: integer('total_records'),
  successfulRecords: integer('successful_records'),
  failedRecords: integer('failed_records'),
  status: varchar('status', { length: 50 }),
  source: varchar('source', { length: 100 }),
  comments: text('comments'),
  fileReference: varchar('file_reference', { length: 255 }),
})

// export const batchUploadRelations = relations(batchUpload, ({ one }) => ({
//   batch: one(customer, {
//     fields: [batchUpload.batchUploadId],
//     references: [customer.batchUploadId],
//   }),
// }))

export const users = pgTable('users', {
  userId: serial('user_id').primaryKey().notNull(),
  userName: varchar('name', { length: 100 }).notNull(),
  positionId: integer('position_id').references(() => position.positionId, {
    onDelete: 'cascade',
  }),
  parentId: integer('parent_id'),
  photo: varchar('photo', { length: 100 }),
  email: varchar('email', { length: 100 }),
  phoneNumber: varchar('phone_number', { length: 15 }),
  hireDate: date('hire_date'),
  statusActive: boolean('status_active').default(true),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }),
})

export const usersRelations = relations(users, ({ one, many }) => ({
  parent: one(users, {
    fields: [users.parentId],
    references: [users.userId],
  }),
  children: many(users),
  position: one(position, {
    fields: [users.positionId],
    references: [position.positionId],
  }),
}))

export type User = InferSelectModel<typeof users>

export const position = pgTable('position', {
  positionId: serial('position_id').primaryKey().notNull(),
  titleCode: varchar('title_code', { length: 6 }).notNull(),
  titleDesc: varchar('title_desc', { length: 50 }).notNull(),
  departementCode: varchar('departement_code', { length: 6 }),
  departementDesc: varchar('departement_desc', { length: 50 }),
  description: text('description'),
  statusActive: boolean('status_active').default(true),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }),
})

export const usersPosition = relations(position, ({ many }) => ({
  position: many(users),
}))

export type Position = InferSelectModel<typeof position>

export const customerStatus = pgTable('customer_status', {
  statusId: serial('status_id').primaryKey().notNull(),
  statusName: varchar('status_name', { length: 255 }).notNull(),
  subStatus: varchar('sub_status', { length: 255 }),
  statusActive: boolean('status_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
})
export const test1 = pgTable('test1', {
  id1: serial('id1').primaryKey().notNull(),
  statusName1: varchar('status_name1', { length: 255 }).notNull(),
})
export const test2 = pgTable('test2', {
  id2: serial('id2').primaryKey().notNull(),
  statusName2: varchar('status_name2', { length: 255 }).notNull(),
})
export const test3 = pgTable('test3', {
  id3: serial('id3').primaryKey().notNull(),
  statusName3: varchar('status_name3', { length: 255 }).notNull(),
})

export const customerStatusRelation = relations(customerStatus, ({ many }) => ({
  status: many(customer),
}))

export const tableMapping = {
  employeePerformance: employeePerformance,
  customer: customer,
  uploadMapping: uploadMapping,
  batchUpload: batchUpload,
  reason: reason,
  response: response,
  uploadBatch: uploadBatch,
  users: users,
  position: position,
  customerStatus: uploadMapping,
  test1: test1,
  test2: test2,
  test3: test3,
}
export type CustomerStatus = InferSelectModel<typeof customerStatus>

export type NewUser2 = InferSelectModel<typeof position & typeof users>
export type NewUser = InferSelectModel<typeof users> &
  InferSelectModel<typeof position>
