import { z } from 'zod';

/**
 * Country
 */

export const countrySchema = z.object({
  countryCode: z.string(),
  name: z.string(),
});

export type Country = z.infer<typeof countrySchema>;

/**
 * Countries
 */

export const countriesSchema = z.array(countrySchema);

/**
 * Country Information
 */

export const countryInfoSchema = z.object({
  commonName: z.string(),
  officialName: z.string(),
  countryCode: z.string(),
  region: z.string(),
  borders: z.array(
    z.object({
      commonName: z.string(),
      officialName: z.string(),
      countryCode: z.string(),
      region: z.string(),
    })
  ),
});

export type CountryInfo = z.infer<typeof countryInfoSchema>;

/**
 * Country Holiday
 */

export const holidaySchema = z.object({
  date: z.string(), // ISO date string in 'YYYY-MM-DD' format.
  localName: z.string(),
  name: z.string(),
  countryCode: z.string(),
  fixed: z.boolean(),
  global: z.boolean(),
  counties: z.array(z.string()).nullable(),
  launchYear: z.number().nullable(),
  types: z.array(
    z.enum([
      'Public',
      'Bank',
      'School',
      'Authorities',
      'Optional',
      'Observance',
    ])
  ),
});

export type CountryHoliday = z.infer<typeof holidaySchema>;

/**
 * Country Holidays
 */

export const countryHolidaysSchema = z.array(holidaySchema);
