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
  customerName: varchar('customer_name', { length: 100 }),
  email: varchar('email', { length: 100 }),
  phone: varchar('phone', { length: 20 }),
  address: varchar('address', { length: 255 }),
  birthDate: date('birth_date'),
  statusId: integer('status_id').references(() => customerStatus.statusId),
  registrationDate: timestamp('registration_date', {
    mode: 'string',
  }).defaultNow(),
  batchUploadId: integer('batch_upload_id').references(
    () => batchUpload.batchUploadId,
  ),
  statusActive: boolean('status_active').default(true),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }),
})
export type Customer = InferSelectModel<typeof customer>

export const customerRelations = relations(customer, ({ one, many }) => ({
  batch: many(batchUpload),
  status: one(customerStatus, {
    fields: [customer.statusId],
    references: [customerStatus.statusId],
  }),
}))

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

export const batchUploadRelations = relations(batchUpload, ({ one }) => ({
  batch: one(customer, {
    fields: [batchUpload.batchUploadId],
    references: [customer.batchUploadId],
  }),
}))

export const users = pgTable('users', {
  userId: serial('user_id').primaryKey().notNull(),
  name: varchar('name', { length: 100 }).notNull(),
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

export const customerStatusRelation = relations(customerStatus, ({ many }) => ({
  status: many(customer),
}))

export type CustomerStatus = InferSelectModel<typeof customerStatus>

export type NewUser2 = InferSelectModel<typeof position & typeof users>
export type NewUser = InferSelectModel<typeof users> &
  InferSelectModel<typeof position>
