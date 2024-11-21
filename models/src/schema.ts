import {
  pgTable,
  boolean,
  varchar,
  char,
  serial,
  geometry,
  timestamp,
  real,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  empId: char('emp_id', { length: 10 }).primaryKey(),
  password: char('password', { length: 20 }).notNull(),
  firstname: varchar('firstname', { length: 15 }).notNull(),
  secondname: varchar('secondname', { length: 15 }).notNull(),
  isAdmin: boolean('is_admin').default(false),
});

export const zone = pgTable('zone', {
  zoneId: serial('zone_id').primaryKey(),
  zoneName: varchar('zone_name', { length: 255 }).notNull().unique(),
  zoneGeometry: geometry('zone_geometry', { type: 'polygon', mode: 'tuple' }),
});

export const driver = pgTable('driver', {
  empId: char('emp_id').references(() => user.empId, { onDelete: 'cascade' }),
  zoneId: serial('zone_id').references(() => zone.zoneId),
});

export const deviceType = pgTable('device_type', {
  deviceTypeId: serial('device_type_id').primaryKey(),
  deviceTypeName: varchar('device_type_name', { length: 20 })
    .notNull()
    .unique(),
});

export const device = pgTable('device', {
  deviceId: serial('device_id').primaryKey(),
  deviceTypeId: serial('device_type_id').references(
    () => deviceType.deviceTypeId
  ),
  location: geometry('device_location', { type: 'point', mode: 'tuple' }),
});

export const telemetry = pgTable('telemetry', {
  deviceId: serial('device_id').references(() => device.deviceId),
  timestamp: timestamp('timestamp').defaultNow(),
  statusReport: varchar('status_report').notNull(),
});

export const binData = pgTable('bin_data', {
  deviceId: serial('device_id').references(() => device.deviceId),
  timestamp: timestamp('timestamp').defaultNow(),
  binStatus: real('bin_status').notNull(),
});
