/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admins from "../admins.js";
import type * as analytics from "../analytics.js";
import type * as auth from "../auth.js";
import type * as crons from "../crons.js";
import type * as events from "../events.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as inquiries from "../inquiries.js";
import type * as lib from "../lib.js";
import type * as marketing from "../marketing.js";
import type * as menus from "../menus.js";
import type * as pageContent from "../pageContent.js";
import type * as seed from "../seed.js";
import type * as seedData from "../seedData.js";
import type * as seo from "../seo.js";
import type * as settings from "../settings.js";
import type * as specials from "../specials.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admins: typeof admins;
  analytics: typeof analytics;
  auth: typeof auth;
  crons: typeof crons;
  events: typeof events;
  files: typeof files;
  http: typeof http;
  inquiries: typeof inquiries;
  lib: typeof lib;
  marketing: typeof marketing;
  menus: typeof menus;
  pageContent: typeof pageContent;
  seed: typeof seed;
  seedData: typeof seedData;
  seo: typeof seo;
  settings: typeof settings;
  specials: typeof specials;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  resend: import("@convex-dev/resend/_generated/component.js").ComponentApi<"resend">;
  rateLimiter: import("@convex-dev/rate-limiter/_generated/component.js").ComponentApi<"rateLimiter">;
};
