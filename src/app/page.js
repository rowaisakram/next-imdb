import Pagination from "@/components/Pagination";
import Results from "@/components/Results";
import Link from "next/link";

const API_KEY = process.env.API_KEY;
export default async function Home({ searchParams }) {
  const getPage = await searchParams;
  const page = parseInt(getPage.page) || "1";
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en&page=${page}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const results = data.results;
  let homePageContent = null;
  try {
    let results = await fetch(process.env.URL + "/api/homepagecontent/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!results.ok) {
      throw new Error("Failed to fetch data");
    }
    const text = await results.text();
    if (text) {
      const data = JSON.parse(text);
      homePageContent = data[0] || null;
    } else {
      console.log("Empty response");
    }
  } catch (error) {
    console.log("Error getting the home page content", error);
  }
  return (
    <div>
      {homePageContent && (
        <div className=" text-center mb-10 max-w-6xl mx-auto py-10">
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
            {homePageContent.title}
          </h1>
          <div
            className="sm:text-lg p-4"
            dangerouslySetInnerHTML={{ __html: homePageContent.description }}
          ></div>
        </div>
      )}
      <div>
        <Results results={results} />
      </div>
      <Pagination currentPage={page} />
    </div>
  );
}
