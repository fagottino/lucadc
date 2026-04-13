import { defineArrayMember, defineField, defineType } from "sanity";

export const artistProfileType = defineType({
  name: "artistProfile",
  title: "Artist profile",
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
      name: "statement",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "biography",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "materials",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "processNotes",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [defineField({ name: "value", type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "portrait",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required() })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "processImages",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "statement",
      subtitle: "language",
      media: "portrait",
    },
    prepare(value) {
      return {
        title: `Artist profile (${String(value.subtitle).toUpperCase()})`,
        subtitle: value.title,
        media: value.media,
      };
    },
  },
});
