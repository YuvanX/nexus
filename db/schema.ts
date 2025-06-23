import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    image: text("imageUrl"),
    userId: text("userId").notNull(),
    editorState: text("editorState"),
})

export type NoteType = typeof notesTable.$inferInsert