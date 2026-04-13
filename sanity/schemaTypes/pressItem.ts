import { defineField, defineType } from "sanity";

export const pressItemType = defineType({
  name: "pressItem",
  title: "Press item",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Italian", value: "it" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "venue",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dateLabel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      type: "url",
    }),
    defineField({
      name: "sortOrder",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "venue",
    },
  },
});
