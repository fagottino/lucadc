import { artistProfileType } from "@/sanity/schemaTypes/artistProfile";
import { artworkType } from "@/sanity/schemaTypes/artwork";
import { commissionPageType } from "@/sanity/schemaTypes/commissionPage";
import { localeBlockContentType } from "@/sanity/schemaTypes/localeBlockContent";
import { localeStringType } from "@/sanity/schemaTypes/localeString";
import { pressItemType } from "@/sanity/schemaTypes/pressItem";
import { siteSettingsType } from "@/sanity/schemaTypes/siteSettings";

export const schemaTypes = [
  localeStringType,
  localeBlockContentType,
  artworkType,
  artistProfileType,
  commissionPageType,
  pressItemType,
  siteSettingsType,
];
