---
icon: signpost
---

# Search Plugin Guidelines

To make VuePress theme support search plugins out of box, we have a set of guidelines that should be followed when creating a search plugin.

## Component Name

- If a search plugin provides a search box that is suitable to display in navbar or sidebars, it shall be named `SearchBox` and registered globally.

- If a search plugin provides a complex search result component with input and result list that is suitable to display in a single page, it shall be named `SearchPanel` and registered globally.

  The search plugin shall automatically generate a `/search.html` page with the `SearchPanel` component in every locales, but it must not override any existing page.
