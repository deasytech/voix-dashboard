import { sql, relations } from "drizzle-orm";
import { bigint, mysqlTable, timestamp, varchar, text, int, boolean } from "drizzle-orm/mysql-core";

export const projects = mysqlTable("projects", {
  id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  url: varchar("url", { length: 191 }).notNull(),
  userId: varchar("user_id", { length: 191 }),
  createdAt: timestamp("created_at", { mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
});

export const feedbacks = mysqlTable("feedbacks", {
  id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
  projectId: bigint("project_id", { mode: "number", unsigned: true }).notNull().references(() => projects.id),
  userName: varchar("user_name", { length: 45 }),
  userEmail: varchar("user_email", { length: 45 }),
  message: text("message"),
  rating: int("rating"),
  createdAt: timestamp("created_at", { mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  feedbacks: many(feedbacks, { relationName: 'feedbacks' }),
}));

export const feedbackRelations = relations(feedbacks, ({ one }) => ({
  project: one(projects, {
    fields: [ feedbacks.projectId ],
    references: [ projects.id ],
    relationName: 'feedbacks'
  }),
}));

export const subscription = mysqlTable("subscriptions", {
  id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
  userId: varchar("user_id", { length: 191 }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 191 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 191 }),
  subscribed: boolean("subscribed"),
  createdAt: timestamp("created_at", { mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow().notNull(),
});