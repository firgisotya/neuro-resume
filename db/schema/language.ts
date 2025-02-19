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

export const languageTable = pgTable("language", {
  id: serial("id").primaryKey(),
  docId: integer("document_id")
    .references(() => documentTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  name: varchar("name", { length: 255 }),
  proficiency: varchar("proficiency", { length: 255 }),
});

export const languageRelations = relations(languageTable, ({ one }) => ({
  document: one(documentTable, {
    fields: [languageTable.docId],
    references: [documentTable.id],
  }),
}));

export const languageTableSchema = createInsertSchema(languageTable, {
  id: z.number().optional(),
}).pick({
  id: true,
  name: true,
  proficiency: true,
});

export type LanguageSchema = z.infer<typeof languageTableSchema>;
