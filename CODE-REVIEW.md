# Code Review: Ivan Chulde Portfolio (WDD 430, W03)

Reviewer: Josue Quinones (Team 16). Repository reviewed: ivanchulde/wdd430-portfolio

## Strengths

Clear component separation across Header, NavLinks, Footer, and ProjectCard.

Strong accessibility: focus-visible rings on interactive elements, aria-current on the active link, and aria-label on the nav (components/NavLinks.tsx).

Responsive header that stacks on mobile and becomes a row at the sm breakpoint (components/Header.tsx).

The required /api/hello route is present (app/api/hello/route.ts).

## Should-fix 1: Contact page is a placeholder (app/contact/page.tsx)

Problem: the copy says the page will contain contact information and that details are coming soon, and the only action is a GitHub link.

Impact: a visitor has no real way to contact Ivan from the Contact page, which is the entire purpose of the page.

Suggested fix: add a real contact method such as a mailto link or a name/email/message form, and remove the coming-soon copy.

## Should-fix 2: Mobile nav wraps instead of collapsing (components/NavLinks.tsx)

Problem: on small screens the nav uses flex-wrap, so the links wrap under the name rather than collapsing into a menu.

Impact: fine for four links, but it wraps awkwardly as links grow and is not the expected collapsible-nav pattern on mobile.

Suggested fix: add a disclosure (hamburger) toggle for small screens and test at 320px to 375px widths.

## Nits

The header avatar uses empty alt text, which is acceptable for a decorative image next to the visible name. Confirm it is intentional.

## Summary

Solid, accessible structure. The main gap is the non-functional Contact page. Fixing that and adopting a collapsible mobile nav would round out the site.
