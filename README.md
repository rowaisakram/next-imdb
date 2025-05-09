# 🎬 IMDB Clone

Welcome to **IMDB Clone** – a web application built to deliver a comprehensive database of movies, TV shows, and entertainment content. Whether you're a film fanatic or a casual viewer, IMDB Clone provides a seamless and immersive user experience.

---

## 🌟 Features

- Browse and search movies and TV shows
- View cast, crew, ratings, and plot summaries
- Read and write user reviews
- Stay updated with the latest and trending releases
- Account management powered by Clerk

---

## 🛠️ Built With

- [Next.js](https://nextjs.org/) – React framework for production
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- [Clerk](https://clerk.dev/) – User authentication and management
- [The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api) – Source for movie and show data
- [Google Generative AI](https://developers.generativeai.google/) – Optional AI-powered features
- [Inngest](https://www.inngest.com/) – Event-driven backend logic
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) – Database and ODM

---

## 🔧 Environment Variables

To run this project locally, make sure you have the following environment variables configured in a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=your_sign_in_url
NEXT_PUBLIC_CLERK_SIGN_UP_URL=your_sign_up_url
SIGNING_SECRET=your_signing_secret
MONGODB_URI=your_mongodb_connection_string
API_KEY=your_moviedb_api_key
GEMINI_API_KEY=your_google_generative_ai_key
URL=your_app_url
```

> 💡 You must obtain API keys and credentials from [Clerk](https://clerk.dev/), [TMDb](https://www.themoviedb.org/), and [Google Generative AI](https://makersuite.google.com/app) to use the respective features.

---

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/next-imdb.git
   cd imdb-clone
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your `.env.local` file** with the required variables.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository, create a new branch, and submit a pull request.

---
