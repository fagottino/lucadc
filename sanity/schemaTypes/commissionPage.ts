import { defineArrayMember, defineField, defineType } from "sanity";

export const commissionPageType = defineType({
  name: "commissionPage",
  title: "Commission page",
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
      name: "intro",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "body", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
        }),
      ],
    }),
    defineField({
      name: "faq",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "closingCta",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      subtitle: "language",
    },
    prepare(value) {
      return {
        title: `Commission page (${String(value.subtitle).toUpperCase()})`,
      };
    },
  },
});
