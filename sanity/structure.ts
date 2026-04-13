import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio")
    .items([
      S.listItem()
        .title("Site settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem().title("Artworks").child(S.documentTypeList("artwork")),
      S.listItem().title("Artist profiles").child(S.documentTypeList("artistProfile")),
      S.listItem().title("Commission pages").child(S.documentTypeList("commissionPage")),
      S.listItem().title("Press").child(S.documentTypeList("pressItem")),
    ]);
