# 🛒 E-Commerce Live Product Catalog

A modern, highly performant e-commerce catalog application built with **React**, **TanStack Query (v5)**, **Redux Toolkit**, **Tailwind CSS**, and **Framer Motion**. Features zero-flicker server-driven pagination, debounced real-time search with URL state synchronization, and smooth micro-interactions.

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-FF4154?logo=reactquery&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3%2F4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-black?logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- ⚡ **Zero-Flicker Server Sync** — Built with TanStack Query (`keepPreviousData`) for seamless pagination transitions without layout shifts.
- 🔍 **Debounced Live Search** — Real-time title search powered by a custom `useDebounce` hook to minimize API overload.
- 🔗 **URL State Persistence** — Syncs search queries and page numbers directly with `URLSearchParams` for shareable link states.
- 🎨 **Modern UI/UX Design** — Slate-inspired aesthetic with Framer Motion animations, skeleton shimmer loaders, and responsive layouts.
- 🛒 **Shopping Cart Management** — Global state handling with Redux Toolkit and instant feedback via `react-hot-toast`.
- 📱 **Fully Responsive** — Clean 4-column grid adapting smoothly from mobile screens to desktop viewports.

---

## 🛠️ Tech Stack

| Domain | Technology / Library |
|---|---|
| Frontend Framework | React 18+ (Vite / React Router v6) |
| Data Fetching & Cache | TanStack Query v5 (`@tanstack/react-query`) |
| State Management | Redux Toolkit (`@reduxjs/toolkit`) |
| Styling | Tailwind CSS v3 / v4 |
| Animations | Framer Motion |
| Notifications | React Hot Toast |

---

## 📂 Project Structure

```
src/
├── components/
│   ├── ProductCard.jsx      # Animated product card with cart dispatch
│   ├── Pagination.jsx       # Fixed 12-item page navigation controls
│   └── SearchBar.jsx        # Controlled input with clear & escape actions
├── hooks/
│   └── useDebounce.js       # Custom debouncing hook for search queries
├── pages/
│   ├── ProductsPage.jsx     # Main product grid, search, and pagination
│   └── ProductDetails.jsx   # Dynamic detail view with skeleton loading
├── redux/
│   ├── cartSlice.js         # Cart state reducer & actions
│   └── store.js             # Redux store configuration
├── App.jsx                  # Main router setup
└── main.jsx                 # Provider wrappers (QueryClientProvider, Provider)
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v18.0.0 or higher)
- npm, yarn, or pnpm

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/ecommerce-catalog.git
cd ecommerce-catalog
```

**2. Install frontend dependencies**

```bash
npm install
```

**3. Backend API requirement**

Ensure your local backend server is running on `http://localhost:5000`. The server should expose the following REST endpoints:

| Method | Endpoint | Description | Query Parameters |
|---|---|---|---|
| `GET` | `/api/products` | Fetch paginated product list | `search`, `page`, `limit` |
| `GET` | `/api/products/:id` | Fetch single product by ID | N/A |

**Expected `/api/products` response format:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack",
      "price": 109.95,
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "rating": { "rate": 3.9, "count": 120 }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 60,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**4. Start the development server**

```bash
npm run dev
```

---

## 🔑 Key Technical Highlights

- **Fixed Page Size (`LIMIT = 12`)** — Standardized pagination limit ensuring consistent card layouts across high-density desktop screens and mobile devices.
- **Optimized Network Calls** — Search input updates state instantly in the UI while network requests are deferred by 500ms to prevent unnecessary API requests.
- **Event Bubbling Control** — Cart buttons inside clickable product cards utilize `e.stopPropagation()` and `e.preventDefault()` to avoid unwanted navigation when adding items to the cart.
- **Framer Motion Micro-Interactions** — Uses spring-based tap feedback (`whileTap={{ scale: 0.95 }}`) and entry animations to elevate user experience without compromising frame rates.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for bug fixes, improvements, or new features.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.
