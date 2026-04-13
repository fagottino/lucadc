import { getDictionary } from "@/lib/i18n/dictionary";
import { withLocale } from "@/lib/i18n/config";
import type {
  ArtworkAvailability,
  ArtworkCollection,
  ArtworkFilters,
  ArtworkMedium,
  Locale,
} from "@/types/site";

export function ArtworkFilters({
  locale,
  filters,
  media,
  collections,
  statuses,
  years,
}: {
  locale: Locale;
  filters: ArtworkFilters;
  media: ArtworkMedium[];
  collections: ArtworkCollection[];
  statuses: ArtworkAvailability[];
  years: string[];
}) {
  const dictionary = getDictionary(locale);

  return (
    <form
      action={withLocale(locale, "/works")}
      className="grid gap-4 rounded-[2rem] border border-stone-200/80 bg-stone-50/70 p-5 md:grid-cols-5"
    >
      <FilterSelect
        name="medium"
        label={dictionary.works.mediumLabel}
        value={filters.medium}
        allLabel={dictionary.common.all}
        options={media.map((value) => ({
          value,
          label: dictionary.labels.medium[value],
        }))}
      />
      <FilterSelect
        name="collection"
        label={dictionary.works.collectionLabel}
        value={filters.collection}
        allLabel={dictionary.common.all}
        options={collections.map((value) => ({
          value,
          label: dictionary.labels.collection[value],
        }))}
      />
      <FilterSelect
        name="availability"
        label={dictionary.works.availabilityLabel}
        value={filters.availability}
        allLabel={dictionary.common.all}
        options={statuses.map((value) => ({
          value,
          label: dictionary.labels.availability[value],
        }))}
      />
      <FilterSelect
        name="year"
        label={dictionary.works.yearLabel}
        value={filters.year}
        allLabel={dictionary.common.all}
        options={years.map((value) => ({ value, label: value }))}
      />
      <div className="flex items-end gap-3">
        <button
          type="submit"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-stone-900 px-5 text-sm tracking-[0.18em] text-stone-50 uppercase transition hover:bg-[color:var(--accent-strong)]"
        >
          {dictionary.works.filterTitle}
        </button>
        <a
          href={withLocale(locale, "/works")}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 px-4 text-xs tracking-[0.18em] text-stone-600 uppercase transition hover:border-stone-900 hover:text-stone-900"
        >
          {dictionary.common.resetFilters}
        </a>
      </div>
    </form>
  );
}

function FilterSelect({
  label,
  name,
  value,
  allLabel,
  options,
}: {
  label: string;
  name: string;
  value?: string;
  allLabel: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="space-y-2">
      <span className="text-xs tracking-[0.22em] text-stone-500 uppercase">
        {label}
      </span>
      <select
        className="h-12 w-full rounded-full border border-stone-300 bg-white px-4 text-sm text-stone-900 outline-none transition focus:border-stone-900"
        defaultValue={value || ""}
        name={name}
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
