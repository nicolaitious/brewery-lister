
## Getting Started

First, install the necessary dependencies for the project to run:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Lastly, open [http://localhost:5173] in your browser to see the result.

## System

* This system was designed to display, search, and sort breweries efficiently while maintaining reusability through a generic table component, ensuring a clean and consistent UI with optimized API handling.

## Decisions

* I decided to take things a step further and develop the table component with search, sorting, and pagination as generic as possible, for better reusability and scalability, supporting any dataset. It allows dynamic configuration of columns, filtering, and sorting, with the flexibility to handle any data structure, as long as the column IDs match the keys of the dataset.

* Using Material UI ensured a clean and consistent UI, and I decided to go with a dark theme, making a few overrides to it to provide a smoother user experience with optimized API handling.

* Implemented a 1 second delay when fetching the data to preview the loader (for the sake of the assignment).

## Key Features and Architecture

* GenericTable.tsx (reusable table component)

    The GenericTable.tsx component is the core reusable table used for displaying brewery data. It supports:
    - Dynamic columns (configurable via props).
    - Sorting (sortable columns, configurable via props).
    - Search filtering (searchable columns, configurable via props)
    - Pagination
    - Links instead of plain text in the case of "website_url" keys

* BreweryList.tsx (Feature-Specific Table)

This component fetches brewery data from an API, applies client-side filtering, and renders it using GenericTable.tsx.

* Optimized API Handling
    - 1-second artificial delay for the loader to be visible.
    - Error handling to display message if fetching fails (with a fun little pun at the moment 😅).
    - Filters API results to only include "micro" breweries before rendering.

* Dark Theme (Custom Theming)

    The system uses a custom Material UI dark theme, with styling overrides for:
    - Rounded elements
    - Static container widths
    - Scrollable table body (not the whole table)
    - Hover effects for better UX