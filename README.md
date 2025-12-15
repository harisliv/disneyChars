# Disney Characters App

A React application built with Material-UI and TypeScript for browsing and visualizing Disney character data. The app features a split-screen layout with a searchable, sortable data table and an interactive pie chart visualization.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Testing

```bash
pnpm test
```

## Overview

The application displays Disney character information in a two-column layout:

- **Left Column**: Renders `DisneyCharacterTable` component
  - Displays character data in a sortable, filterable table
  - Includes search functionality
  - Supports column visibility toggling
  - Provides pagination controls
- **Right Column**: Renders `CharacterFilmsPieChart` component
  - Visualizes film distribution across characters
  - Interactive tooltips showing detailed film information
  - Export functionality to Excel

## Technology Stack

- **React** with TypeScript
- **Vite** for build tooling
- **Material-UI (MUI)** for UI components
- **TanStack React Query** for data fetching and caching
- **TanStack React Table** headless ui table functionality
- **Highcharts** for data visualization
- **Axios** for HTTP requests
- **MSW** for API mocking in tests

## Project Structure

```
src/
├── components/
│   ├── MainContent/          # Main layout component
│   ├── Table/                 # Data table with sorting, pagination
│   ├── CharacterFilmsPieChart/ # Pie chart visualization
│   ├── CharacterSearch/       # Search input component
│   ├── CharacterDetailsModal/ # Character detail view
│   └── ...
├── hooks/
│   ├── usePaginatedCharacters.tsx  # Main data fetching hook
│   ├── useSearchCharacters.tsx      # Search functionality
│   ├── usePagination.tsx            # Pagination state management
│   └── ...
├── context/
│   ├── PaginationContext.tsx  # Global pagination state
│   └── SnackbarContext.tsx    # Notification system
└── ...
```

## Data Flow

1. **MainContent** initializes and calls `usePaginatedCharacters()`
2. The hook reads pagination state from `PaginationContext`
3. React Query fetches data based on current page and filters
4. Data is transformed for both table and pie chart consumption
5. Components re-render with new data
6. User interactions (search, pagination, sorting) trigger new queries
