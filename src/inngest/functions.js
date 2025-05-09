import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connect } from "@/lib/mongodb/mongoose";
import HomePageContent from "@/lib/models/homePageContent";

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "10s");
    return { message: `Hello ${event.data.email}!` };
  }
);
export const generateHomePageContent = inngest.createFunction(
  { name: "Generate home page content" },
  {
    cron: "0 0 * * 0",
  },
  async ({ event, step }) => {
    const trendingMoviesResults = await step.run(
      "fetch-trending-movies",
      async () => {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en&page=1`
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error("failed to fetch data");
        }
        return data.results;
      }
    );
    const prompt = `
    Analyze these movies ${JSON.stringify(
      trendingMoviesResults
    )} and provide a title and description in ONLY the following JSON format without any additional notes or explanations (add a link for each movie with this address '/movie/{movieId}' with html format like this: <a class="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent hover:underline" href='/movie/{movieId}'>Movie Title</a>):
    {
      "title": "exciting title about new trending movies",
      "description": "exciting description about new trending movies"
    }
    
    IMPORTANT: Return ONLY the JSON. No additional text, notes.
    Include at least 150 characters for description.
    Include at least 50 characters for title.
  `;
    const googleGeminiResults = await step.ai.wrap(
      "gemini",
      async (p) => {
        return await model.generateContent(p);
      },
      prompt
    );
    const text =
      googleGeminiResults.response.candidates[0].content.parts[0].text || "";
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    const homePageContentFromGoogleGemini = JSON.parse(cleanedText);

    const createOrUpdateHomePageContent = async (title, description) => {
      try {
        await connect();
        const SavedhomePageContent = await HomePageContent.findOneAndUpdate(
          {
            updatedBy: "inggest",
          },
          {
            $set: {
              title,
              description,
              updatedBy: "inggest",
            },
          },
          { new: true, upsert: true }
        );
        return SavedhomePageContent;
      } catch (error) {
        console.log("error:", error);
        throw new Error("failed to create or update home page content");
      }
    };
    await step.run("create or update home page content", async () => {
      await createOrUpdateHomePageContent(
        homePageContentFromGoogleGemini.title,
        homePageContentFromGoogleGemini.description
      );
    });
  }
);
