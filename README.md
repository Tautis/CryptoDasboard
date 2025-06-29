# CryptoDashboard

A modern cryptocurrency dashboard built with [Next.js](https://nextjs.org), Firebase, and the CoinGecko API. Track top coins, view charts, and manage your favorites with Google authentication.

## Features

- 🔥 View all coins with real-time prices and 24h changes
- 🚀 Discover top weekly new coins with interactive charts
- ⭐ Favorite coins (requires Google login)
- 🔒 Secure authentication via Firebase (Google)
- 📈 Beautiful chart modals for price history
- ⚡ Fast, responsive UI with skeleton loading states
- 🌙 Dark mode support

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/CryptoDasboard.git
   cd CryptoDasboard
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Google authentication.
   - Create a `.env.local` file in the root with your Firebase config:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

- `app/` — Next.js app directory (pages, routes)
- `components/` — Reusable React components
- `lib/` — API and Firebase utilities
- `types/` — TypeScript types

## Deployment

Deploy easily to [Vercel](https://vercel.com/) or your favorite platform.

## Credits

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [CoinGecko API](https://coingecko.com/en/api)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)

## License

MIT

---

_Made with ❤️ for crypto enthusiasts._
