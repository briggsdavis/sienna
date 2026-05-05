---
version: alpha
name: Due Madri
description: A bright, rustic restaurant system with bold editorial typography, minimal depth, and warm brand accents.
colors:
  primary: "#16220C"
  secondary: "#F2F6EF"
  tertiary: "#BE3943"
  neutral: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#16220C"
  accent: "#000000"
  error: "#B42318"
  border: "#E5E7EB"
  overlay: "#0B0D0A"
typography:
  headline-display:
    fontFamily: "Barlow Webfont"
    fontSize: "120px"
    fontWeight: 900
    lineHeight: "120px"
    letterSpacing: "0px"
  headline-lg:
    fontFamily: "Barlow Webfont"
    fontSize: "64px"
    fontWeight: 800
    lineHeight: "72px"
    letterSpacing: "0px"
  headline-md:
    fontFamily: "Barlow Webfont"
    fontSize: "44px"
    fontWeight: 800
    lineHeight: "64px"
    letterSpacing: "0px"
  headline-sm:
    fontFamily: "Barlow Webfont"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: "34px"
    letterSpacing: "0px"
  headline-xs:
    fontFamily: "Barlow Webfont"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: "28px"
    letterSpacing: "0px"
  body-lg:
    fontFamily: "Barlow Webfont"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "26px"
    letterSpacing: "0px"
  body-md:
    fontFamily: "Barlow Webfont"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    letterSpacing: "0px"
  body-sm:
    fontFamily: "Barlow Webfont"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
    letterSpacing: "0px"
  label-lg:
    fontFamily: "Barlow Webfont"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: "24px"
    letterSpacing: "0px"
  label-md:
    fontFamily: "Barlow Webfont"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: "20px"
    letterSpacing: "0px"
  label-sm:
    fontFamily: "Barlow Webfont"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "16px"
    letterSpacing: "0px"
  nav-link:
    fontFamily: "Barlow Webfont"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    letterSpacing: "0px"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "46px"
  xl: "64px"
  gutter: "88px"
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.accent}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: "4.8px 32px 8px 12px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.md}"
    padding: "4.8px 32px 8px 12px"
    height: "40px"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "0px"
    height: "24px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  chip:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Due Madri

## Overview

Due Madri feels like a lively neighborhood restaurant with a confident editorial voice: warm, playful, and food-forward rather than polished or corporate. The interface is spacious and highly visual, built to let photography and bold type do most of the work. It balances rustic charm with a clean modern structure, making it approachable for diners while still feeling distinctive and memorable.

## Colors

- **Primary (#16220C):** A deep olive-black used for body text, headings, and most navigation text. It gives the site a hearty, natural tone without reading as stark as pure black.
- **Secondary (#F2F6EF):** A soft cream-tinted surface used for primary button fills and gentle UI panels. It keeps the palette airy and slightly artisanal.
- **Tertiary (#BE3943):** A rich tomato-red accent that echoes the brand mark and food imagery. Use it for emphasis, badges, and high-energy visual moments.
- **Neutral (#FFFFFF):** Clean white used for the main page background and card surfaces. It provides contrast and keeps the layout crisp.
- **Surface (#FFFFFF):** The default component surface color, matching the site’s bright, uncluttered presentation.
- **On-surface (#16220C):** The primary readable text color on light backgrounds. It supports the strong typographic hierarchy.
- **Accent (#000000):** A pure black reserved for the most direct contrast moments, such as button text or utility marks.
- **Border (#E5E7EB):** A very light neutral border used sparingly to define cards and inputs without adding visual weight.
- **Error (#B42318):** A restrained alert red for validation or destructive states, kept close to the brand’s warm red family.
- **Overlay (#0B0D0A):** A near-black overlay tone for modal scrims or image treatments when needed.

## Typography

Barlow Webfont is the single typographic voice across the system, giving the brand a compact, sturdy, slightly condensed restaurant-poster feel. Headings are extremely bold, with h1 at 120px/120px and h2 at 44px/64px, which creates strong editorial drama and makes the homepage hero feel poster-like. Body text stays simple and readable at 18px or 16px, while labels and navigation use medium weight rather than uppercase shouting.

The hierarchy should remain emphatic and clean: use `headline-display` and `headline-md` for prominent welcomes and section intros, `headline-sm` and `headline-xs` for supporting headings, and `body-lg`/`body-md` for paragraph copy. Labels and navigation links should use `label-lg`, `label-md`, or `nav-link`, with no visible letter-spacing embellishment unless a future treatment explicitly needs it. The current voice favors straightforward sentence case over all-caps UI chrome.

## Layout

The layout is wide, fluid, and content-led, with large horizontal imagery and generous vertical breathing room between sections. Spacing follows a simple rhythm that jumps from 8px and 16px utility spacing to larger section gaps around 46px, 64px, and 88px. This creates a relaxed restaurant-site pacing: compact in the header, expansive in the hero, and comfortable in editorial content blocks.

Use a mostly full-width layout with centered content containers for text-heavy sections. Cards and controls should retain modest internal padding, while major sections should use larger top/bottom spacing to preserve the open, airy feel. The site should never feel cramped; the negative space is part of the brand personality.

## Elevation & Depth

The system is intentionally flat. There are no meaningful shadows, and hierarchy is created through color contrast, image scale, and clear separation between sections rather than depth effects. Light borders can be used for cards and inputs, but they should remain subtle so the interface preserves its crisp, print-like character.

## Shapes

The shape language is soft and practical. Interactive elements use an 8px radius, with only small variations for utility surfaces and pills. Buttons feel approachable and slightly handmade, while cards stay simple and rectilinear. Avoid overly rounded, bubbly UI; the brand should feel grounded and confident.

## Components

Buttons are restrained and utilitarian. `button-primary` uses the soft cream `secondary` fill, dark text, an 8px radius, and compact vertical padding so it reads as a clear action without shouting. `button-secondary` flips to a white fill with dark outline energy, which is useful for alternate actions or less-prominent CTAs. `button-tertiary` should remain text-only and transparent for simple links and utility actions.

Primary buttons should maintain a minimum 40px height and keep the right-side affordance feel seen in the source, especially for actions like “Order Online.” Hover and active states should rely on subtle color shifts or border emphasis rather than shadows or dramatic motion. Disabled states should lower contrast but preserve the same geometry.

Cards should use a white surface, a 1px light border, 8px radius, and 16px padding. They are quiet containers, not featured depth objects. Inputs should follow the same shape language and border treatment as cards, with enough internal padding for easy touch targets and a clean, readable focus state. Chips can use the cream secondary tone with fully rounded pills for filters or tags.

Navigation links should use the `nav-link` style: medium-sized, clean, and understated. The header can combine text links with one more prominent button-like CTA, but the overall bar should stay light and uncluttered. Any list items, badges, or utility links should feel like extensions of the same typographic system rather than separate UI species.

## Do's and Don'ts

- Do keep typography bold, large, and highly legible; it is the main visual signature.
- Do use the cream secondary tone for primary actions and warm emphasis.
- Do preserve the flat, shadowless look for cards and controls.
- Do keep section spacing generous so photography and headlines can breathe.
- Don't introduce heavy gradients, glows, or drop shadows.
- Don't use playful rounded UI or overly decorative typefaces.
- Don't crowd the layout with too many equal-weight components.
- Don't rely on uppercase labels or excessive letter spacing for personality.
