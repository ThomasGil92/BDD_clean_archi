# Mastering Next.js with Clean Architecture, Redux, TDD & BDD

## Overview

This Next.js application is a simple e-commerce storefront allowing users to browse products, add them to a cart, and view their cart contents. The application leverages Redux for state management and follows a clean architecture to ensure maintainability and testability.

You can read the full documentation on the [mastering-next-js-with-clean-architecture-redux-tdd-bdd](https://medium.com/@tgil849/mastering-next-js-with-clean-architecture-redux-tdd-bdd-part-1-6-introduction-1f892d697d7e) page on medium.

## Architecture

The application is structured into four main layers:

### 1. Presentation Layer (UI)

`pages/`: Contains the main application pages (page.tsx, layout.tsx). These pages handle user interaction and rendering.

`CartItemsList.tsx`: Reusable UI components (buttons, cards, etc.).

`components.json`: Configures component generation.

`ProductItemsList.tsx, CartItemsList.tsx`: Components responsible for displaying product and cart information.

### 2. Domain Layer (Business Logic)

`entities/Cart.ts`: Defines data structures (Product.ts, Cart.ts).

`CartUseCase.ts`: Contains business logic for interacting with data (ProductUseCase.ts, CartUseCase.ts). This layer is independent of data sources.

`CartRepository.ts`: Interfaces defining how data is accessed (ProductRepository.ts, CartRepository.ts). This promotes abstraction and testability.

### 3. Infrastructure Layer (Data Access)

`CartRepositoryImpl.ts`: Implementations of repository interfaces (`ProductRepositoryImpl.ts, CartRepositoryImpl.ts`). These handle actual data fetching and persistence, interacting with APIs or databases.

Mock Implementations: Provided for testing (`ProductRepositoryMockImpl.ts, CartRepositoryMockImpl.ts`).

`fakeProducts.json`: Sample product data used for development and testing.

`route.ts`: API route serving product data (fakeProducts.json).

### 4. Application Layer (State Management)

`product.slice.ts`: Contains Redux logic (`product.slice.ts, cart.slice.ts`).

`store.ts`: Configures the Redux store, while slices manage specific parts of the application state (products and cart).

## Data Flow

The user interacts with UI components.

UI components dispatch Redux actions.

Redux actions trigger asynchronous thunks defined in product.slice.ts and cart.slice.ts.

Thunks call use cases in the domain layer.

Use cases interact with the infrastructure layer (repositories) to access data.

Repositories fetch data from API routes or mock data.

The updated state is reflected in the UI.

## Technologies Used

**Next.js**: React framework for building web applications.

**React**: JavaScript library for building user interfaces.

**Redux Toolkit**: Predictable state container for JavaScript apps.

**Tailwind CSS**: Utility-first CSS framework.

## Getting Started

First, install the project dependencies and run the development server:

```
pnpm i && pnpm dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

## Testing

The architecture is designed for easy testing. Mock repositories simulate data access without requiring a running backend or database. Further details on testing can be found in cart.feature.

To launch tests:
`pnpm test`

## Further Development

This is a basic e-commerce app. Future enhancements could include:

- User authentication
- Order management
- Persistent data storage

Consider exploring these features for improved functionality.
