import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "artistName",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "artistAlternateName",
      title: "Artist alternate name",
      type: "string",
      description: "Optional legal/full name for structured data and internal reference.",
    }),
    defineField({
      name: "heroEyebrow",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroTitle",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroStatement",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoTitle",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoDescription",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "instagramUrl",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whatsappUrl",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cityLabel",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "responseTimeLabel",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "artistName",
    },
  },
});
