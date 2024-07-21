import { pgTable, serial, integer, varchar, text, timestamp, foreignKey, boolean, date } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const employeePerformance = pgTable("employee_performance", {
	performanceId: serial("performance_id").primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	photo: varchar("photo", { length: 50 }),
	colorhex: varchar("colorhex", { length: 6 }),
	name: varchar("name", { length: 50 }),
	performanceScore: integer("performance_score"),
});

export const uploadMapping = pgTable("upload_mapping", {
	uploadMappingId: serial("upload_mapping_id").primaryKey().notNull(),
	mappingName: varchar("mapping_name", { length: 50 }),
	mappingDescription: text("mapping_description"),
	fieldExcel: varchar("field_excel", { length: 50 }),
	fieldTable: varchar("field_table", { length: 50 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const batchUpload = pgTable("batch_upload", {
	batchUploadId: serial("batch_upload_id").primaryKey().notNull(),
	uploadMappingId: integer("upload_mapping_id").references(() => uploadMapping.uploadMappingId),
	filename: varchar("filename", { length: 100 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const customerStatus = pgTable("customer_status", {
	statusId: serial("status_id").primaryKey().notNull(),
	statusName: varchar("status_name", { length: 255 }).notNull(),
	subStatus: varchar("sub_status", { length: 255 }),
	statusActive: boolean("status_active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const position = pgTable("position", {
	positionId: serial("position_id").primaryKey().notNull(),
	titleCode: varchar("title_code", { length: 6 }).notNull(),
	titleDesc: varchar("title_desc", { length: 50 }).notNull(),
	departementCode: varchar("departement_code", { length: 6 }),
	departementDesc: varchar("departement_desc", { length: 50 }),
	description: text("description"),
	statusActive: boolean("status_active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const users = pgTable("users", {
	userId: serial("user_id").primaryKey().notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	positionId: integer("position_id").references(() => position.positionId, { onDelete: "cascade" } ),
	parentId: integer("parent_id"),
	photo: varchar("photo", { length: 100 }),
	email: varchar("email", { length: 100 }),
	phoneNumber: varchar("phone_number", { length: 15 }),
	hireDate: date("hire_date"),
	statusActive: boolean("status_active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const customerResponse = pgTable("customer_response", {
	responseId: serial("response_id").primaryKey().notNull(),
	response: varchar("response", { length: 10 }).notNull(),
	reasonId: integer("reason_id").notNull(),
	statusActive: boolean("status_active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const uploadBatch = pgTable("upload_batch", {
	batchId: serial("batch_id").primaryKey().notNull(),
	batchName: varchar("batch_name", { length: 100 }).notNull(),
	uploadDate: timestamp("upload_date", { mode: 'string' }).defaultNow(),
	uploadedBy: varchar("uploaded_by", { length: 100 }).notNull(),
	totalRecords: integer("total_records"),
	successfulRecords: integer("successful_records"),
	failedRecords: integer("failed_records"),
	status: varchar("status", { length: 50 }),
	source: varchar("source", { length: 100 }),
	comments: text("comments"),
	fileReference: varchar("file_reference", { length: 255 }),
});

export const customer = pgTable("customer", {
	customerId: serial("customer_id").primaryKey().notNull(),
	customerName: varchar("customer_name", { length: 100 }).notNull(),
	reasonId: integer("reason_id"),
	csrUserId: integer("csr_user_id").references(() => users.userId),
	email: varchar("email", { length: 100 }).notNull(),
	phone: varchar("phone", { length: 20 }),
	address: varchar("address", { length: 255 }),
	birthDate: date("birth_date"),
	registrationDate: timestamp("registration_date", { mode: 'string' }).defaultNow(),
	batchId: integer("batch_id").references(() => uploadBatch.batchId),
	statusActive: boolean("status_active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const response = pgTable("response", {
	responseId: serial("response_id").primaryKey().notNull(),
	response: varchar("response", { length: 20 }).notNull(),
	statusActive: boolean("status_active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const reason = pgTable("reason", {
	reasonId: serial("reason_id").primaryKey().notNull(),
	reason: varchar("reason", { length: 70 }).notNull(),
	responseId: integer("response_id").notNull().references(() => response.responseId),
	statusActive: boolean("status_active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});