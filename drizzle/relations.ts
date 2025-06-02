import { relations } from "drizzle-orm/relations";
import { categories, hotel } from "./schema";

export const hotelRelations = relations(hotel, ({one}) => ({
	category: one(categories, {
		fields: [hotel.type],
		references: [categories.name]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	hotels: many(hotel),
}));

