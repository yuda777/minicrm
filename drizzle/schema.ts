import { pgTable, foreignKey, serial, varchar, integer, date, boolean, timestamp, text } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



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
	createdAt: timestamp("created_at", { mode: 'string' }).default(CURRENT_DATE),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(CURRENT_DATE),
});

export const customer = pgTable("customer", {
	customerId: serial("customer_id").primaryKey().notNull(),
	customerName: varchar("customer_name", { length: 100 }),
	email: varchar("email", { length: 100 }),
	phone: varchar("phone", { length: 20 }),
	address: varchar("address", { length: 255 }),
	birthDate: date("birth_date"),
	statusId: integer("status_id").references(() => customerStatus.statusId),
	registrationDate: timestamp("registration_date", { mode: 'string' }).defaultNow(),
	batchUploadId: integer("batch_upload_id").references(() => batchUpload.batchUploadId),
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

export const employeePerformance = pgTable("employee_performance", {
	performanceId: serial("performance_id").primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	photo: varchar("photo", { length: 50 }),
	colorhex: varchar("colorhex", { length: 6 }),
	name: varchar("name", { length: 50 }),
	performanceScore: integer("performance_score"),
});