import {
  date,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { documentTable } from "./document";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projectTable = pgTable("project", {
  id: serial("id").primaryKey(),
  docId: integer("document_id")
    .references(() => documentTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  title: varchar("title", { length: 255 }),
  link: varchar("link", { length: 255 }),
  description: text("description"),
});

export const projectRelations = relations(projectTable, ({ one }) => ({
  document: one(documentTable, {
    fields: [projectTable.docId],
    references: [documentTable.id],
  }),
}));

export const projectTableSchema = createInsertSchema(projectTable, {
  id: z.number().optional(),
}).pick({
  id: true,
  title: true,
  link: true,
  description: true,
});

export type ProjectSchema = z.infer<typeof projectTableSchema>;
