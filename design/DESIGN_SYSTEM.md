# Casualty Clearers Design System

This file records the visual specification selected before implementation. The source concepts are `design/concepts/home-desktop.png` and `design/concepts/home-mobile.png`.

## Product character

Content-first, modern, welcoming, and energetic without becoming childish. The interface is not visually themed around ships, the navy, the military, hospitals, or emergency imagery. Colour is used to distinguish information areas and interactive state.

## Colour tokens

- Canvas: `#f7f9fc`
- Surface: `#ffffff`
- Text: `#111827`
- Muted text: `#667085`
- Border: `#dfe5ec`
- Teal: `#23b8a3`
- Coral: `#ff6f69`
- Yellow: `#f4c84a`
- Sky: `#55b8ed`
- Violet: `#8e72e8`
- Mint: `#59d5ae`
- Focus: `#1677ff`
- Caution: `#b76a00`
- Critical: `#ba2d36`

All major backgrounds are true white or pale cool gray. No gradients, glows, navy panels, or decorative background illustrations.

## Typography

- UI and content: `Inter`, with system sans-serif fallbacks.
- Display: 56/60 desktop and 38/43 mobile, weight 750–800.
- Section heading: 24/30, weight 700.
- Topic title: 17/24, weight 700.
- Body: 16/26 desktop and 16/25 mobile.
- UI controls: 14–16, weight 550–650. Browser-default control typography is not permitted.

## Layout

- Desktop uses a 220 px light navigation rail, flexible main column, and 340 px secondary rail.
- Tablet collapses the secondary rail under the topic list.
- Mobile uses a light top bar, one scrolling column, and fixed bottom navigation.
- Main gutters: 32 px desktop, 20 px tablet, 18 px mobile.
- Topic navigation is a divided vertical list, not a bento or card-grid wall.

## Component families

- Text brand with a small abstract four-colour mark.
- Navigation rows with outline icons and a soft selected state.
- Search field with instant results and keyboard focus shortcut.
- Topic rows with colour accent, icon container, title, description, and chevron.
- Editorial recent/continue rows with compact metadata and save control.
- Article layout with breadcrumbs, readable content column, status context, source links, related topics, and previous/next navigation.
- Mobile bottom navigation with four destinations.

## Motion

- 160–220 ms transitions for selection, disclosure, and view changes.
- Small translate/fade entry for results and article changes.
- Motion is removed when `prefers-reduced-motion` is active.

## Icon treatment

Lucide outline icons, 1.75 px stroke, rounded joins, 18–24 px. Icons clarify actions or categories; they are not decoration.

## Above-the-fold copy lock

- Casualty Clearers
- Everything in one place.
- Clear, connected information for casualty clearers.
- Search treatments, equipment, situations...
- Home
- Explore
- Equipment
- Situations
- Glossary
- Continue exploring
- Recently viewed

No eyebrow, badge, recruiting message, slogan, metric, patient field, schedule, or administrative control is added.
