import { defineField, defineType } from "sanity";

export const localeStringType = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "it",
      title: "Italian",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
