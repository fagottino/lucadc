import { defineArrayMember, defineField, defineType } from "sanity";

export const artworkType = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title.en",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "localeBlockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoExcerpt",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      type: "number",
      validation: (rule) => rule.required().integer().min(1900).max(2100),
    }),
    defineField({
      name: "medium",
      type: "string",
      options: {
        list: [
          { title: "Graphite", value: "graphite" },
          { title: "Charcoal", value: "charcoal" },
          { title: "Ink", value: "ink" },
          { title: "Mixed media", value: "mixed-media" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dimensions",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "orientation",
      type: "string",
      options: {
        list: [
          { title: "Portrait", value: "portrait" },
          { title: "Landscape", value: "landscape" },
          { title: "Square", value: "square" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "collection",
      type: "string",
      options: {
        list: [
          { title: "Portraits", value: "portraits" },
          { title: "Studies", value: "studies" },
          { title: "Subjects", value: "subjects" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "availability",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Reserved", value: "reserved" },
          { title: "Sold", value: "sold" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "localeString",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detailImages",
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
              type: "localeString",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "medium",
      media: "coverImage",
    },
  },
});
