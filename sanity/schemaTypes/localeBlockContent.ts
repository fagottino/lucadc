import { defineArrayMember, defineField, defineType } from "sanity";

const portableTextField = defineField({
  name: "content",
  title: "Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [],
      },
    }),
  ],
});

export const localeBlockContentType = defineType({
  name: "localeBlockContent",
  title: "Localized rich text",
  type: "object",
  fields: [
    {
      ...portableTextField,
      name: "en",
      title: "English",
    },
    {
      ...portableTextField,
      name: "it",
      title: "Italian",
    },
  ],
});
