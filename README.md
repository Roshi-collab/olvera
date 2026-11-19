# Olvera Skincare

Olvera is a skincare single-page application (SPA) that helps users discover La Roche-Posay skincare products and create their own morning and evening skincare routines.

## Problem Statement

Finding the right skincare products can be overwhelming, especially for people who are new to skincare. With so many products available, it can be difficult to understand what each product contains and how to organize a skincare routine.

People may also struggle to keep track of the products they use in their daily routines.

## Proposed Solution

Olvera provides a simple platform where users can explore skincare products, search and filter products, view product information and create their own skincare routines.

The application allows users to save products under morning or evening routines and update or remove them whenever they want.

The main goal is to make skincare discovery and routine management easier and more organized.

## Minimum Viable Product (MVP)

The MVP focuses on the following essential features:

- Display skincare products fetched from an external API.
- Search products by name.
- Filter products by product range.
- View individual product details and available ingredients.
- Add products to morning or evening routines.
- View saved skincare routines.
- Update and delete saved products.
- Prevent duplicate products within the same routine.
- Maintain saved routines after refreshing the page.

## Technologies Used

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- JSON Server
- Lucide React
- Jest
- React Testing Library

## API Integration

Olvera uses two data sources:

- **Open Beauty Facts API:** Fetches La Roche-Posay skincare products and their available information.
- **JSON Server:** Stores and manages users' skincare routines.

## CRUD Operations

Method Functionality 
 GET Fetch products and saved routines 
POST Add products to a routine 
PATCH  Update a saved routine
DELETE Remove products from a routine 

## React Concepts Used

- Functional components
- Props and reusable components
- State management using useState
- API fetching using useEffect
- Client-side routing
- Dynamic routes using useParams
- Controlled forms
- Conditional rendering
- Search and filtering

## Application Pages

Page Route 
 Home 
Products products
Product Details products :id
 My Routine routines 

## Installation and Setup

Clone the project repository and navigate into the project folder.

Install the project dependencies:

    npm install

Install JSON Server globally:

    npm install -g json-server

Start the backend:

    json-server src/db/db.json

Open another terminal and start the React application:

    npm run dev

Open the localhost link displayed in the terminal.

## Automated Testing

The application uses Jest and React Testing Library to test component rendering, state updates and user interactions.

Tests include:

- Product card rendering
- Product search
- Product filtering
- Adding products to routines
- Updating routines
- Removing products from routines

All six automated tests passed successfully.

To run the tests:

    npm test

## Design

Olvera uses a minimal purple and cream colour palette with a layered layout. The interface is designed to be clean, simple and easy to navigate without unnecessary features or distractions.

## Future Improvements

- Filtering products by skin type and skin concerns.
- Providing more detailed product usage information.
- Allowing users to create multiple personalized routines.

## Conclusion

Olvera simplifies skincare discovery and helps users organize their skincare routines in one place. The project demonstrates practical React development, API integration, CRUD operations, state management and automated testing.

## License

This project was developed for educational purposes. Olvera is not affiliated with La Roche-Posay.666666666666666666666666666666666666666666666666666666