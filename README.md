# Beer Impact 🍺

A modern, interactive beer catalog application built with React and TypeScript. This application allows users to browse, search, filter, and rate different beers.

## 🚀 Tech Stack

- **React 18** 
- **TypeScript** 
- **Vite** 
- **SCSS Modules** 
- **React Context API** 
- **React Hook Form** 
- **GSAP** 

## 📋 Features

- Browse a collection of beers
- View detailed information about each beer
- Search beers by name
- Filter beers by year
- Rate beers
- Add new beers to the collection
- Responsive design for mobile and desktop
- Storing beers collection in localStorage

## 🏗️ Project Structure

```
src/
├── components/         # UI components
│   ├── Beer/           # Beer details component
│   ├── Form/           # Add beer form component
│   ├── Grid/           # Beer grid component
│   ├── Overlay/        # Modal overlay component
│   ├── Rating/         # Star rating component
│   ├── Search/         # Search component
│   └── Skeleton/       # App layout component
├── styles/             # Global styles
│   ├── _colors.scss    # Color variables
│   └── _responsiveness.scss # Media queries
├── utils/
│   └── BeerProvider.tsx # Context provider for state management
└── App.tsx             # Main application component
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/teusto/beer-impact.git
   cd beer-impact
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser at `http://localhost:5173`

## 🧠 Design Decisions

### Component Architecture

- **Skeleton**: Provides the overall layout structure
- **Grid**: Displays the beer cards in a responsive grid
- **Beer**: Shows detailed information about a selected beer
- **Form**: Allows adding new beers to the collection
- **Rating**: Provides an interactive star rating system
- **Search & Filter**: Enable finding specific beers

## 🧪 Future Improvements

- Add unit tests
- Implement beer categories and additional filters
- Add user authentication
- Find a good api to fetch beers images
- Add validations

## 👨‍💻 Author

@teusto - [Your GitHub Profile](https://github.com/teusto)