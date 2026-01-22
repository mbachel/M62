import type { Route } from "./+types/dashboard";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { isAuthenticated, handleSignOut } from "../utils/auth";
import QuickLinks from "~/components/QuickLinks";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard - M62" }];
}

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <main className="pt-6 px-6 container mx-auto">
      <section className="py-6" id="welcome">
        <h1 className="text-4xl font-semibold mb-4">Dashboard</h1>
        <div className="pl-4 text-lg max-w-7xl">
          <h2>Welcome to the Dashboard! Here, you can find:</h2>
          <ul className="list-disc list-inside mt-2">
            <li className="pl-4">A list of references for all data on the site.</li>
            <li className="pl-4">A summary of the content on this site.</li>
            <li className="pl-4">A technical breakdown of the project.</li>
            <li className="pl-4">A set of quick links for easy navigation.</li>
          </ul>
        </div>
      </section>
      <hr className="border-(--accent) border-2"/>
      <section className="py-6" id="summary-project-description">
        <h2 className="text-3xl font-semibold mb-4">Summary and Project Description</h2>
        {/*References*/}
        <div className="text-lg max-w-7xl" id="references">
          <h3 className="pl-2 mb-2 text-2xl font-semibold">References</h3>
          <ul className="list-disc list-inside space-y-2">
            <li className="pl-4">
              AI Model & API Providers Analysis | Artificial Analysis. (n.d.). <br />
              <Link to="https://artificialanalysis.ai/?models=gpt-5%2Cgpt-5-1%2Cgemini-3-pro%2Cgemini-2-5-pro%2Cclaude-opus-4-5-thinking%2Cclaude-4-5-sonnet-thinking%2Cgrok-4%2Ckimi-k2-thinking%2Cqwen3-max" target="_blank" rel="noopener noreferrer" className="text-(--link) underline ml-12">
                https://artificialanalysis.ai/
              </Link>
            </li>
            <li className="pl-4">
              Bick, A., Blandin, A., & Deming, D. (2025, November 19). The state of generative AI adoption in 2025. St. Louis Fed. <br />
              <Link to="https://www.stlouisfed.org/on-the-economy/2025/nov/state-generative-ai-adoption-2025" target="_blank" rel="noopener noreferrer" className="text-(--link) underline ml-12">
                https://www.stlouisfed.org/on-the-economy/2025/nov/state-generative-ai-adoption-2025
              </Link>
            </li>
            <li className="pl-4">
              Cardillo, A. (2025, October 17). Best 44 Large Language Models (LLMs) in 2025. Exploding Topics. <br />
              <Link to="https://explodingtopics.com/blog/list-of-llms" target="_blank" rel="noopener noreferrer" className="text-(--link) underline ml-12">
                https://explodingtopics.com/blog/list-of-llms
              </Link>
            </li>
            <li className="pl-4">
              CNovet, J., & Vanian, J. (2025, April 30). Satya Nadella says as much as 30% of Microsoft code is written by AI. CNBC. <br />
              <Link to="https://www.cnbc.com/2025/04/29/satya-nadella-says-as-much-as-30percent-of-microsoft-code-is-written-by-ai.html" target="_blank" rel="noopener noreferrer" className="text-(--link) underline ml-12">
                https://www.cnbc.com/2025/04/29/satya-nadella-says-as-much-as-30percent-of-microsoft-code-is-written-by-ai.html
              </Link>
            </li>
          </ul>
        </div>
        <hr className="border-(--accent) border-2 mt-6"/>
        {/*Topic Summary*/}
        <div className="max-w-7xl" id="summary">
          <h3 className="pl-2 mt-6 mb-2 text-2xl font-semibold">Summary</h3>
          <p className="pl-4 mb-2 text-lg">
            Artificial Intelligence has been one of the biggest topics in technology today. 
            In particular, development and deployment of Generative AI has seen rapid growth.
            Companies such as Anthropic, Google, and OpenAI have been leading the way in this 
            AI renaissance. Recently, these companies have recently released powerful models, Claude 4.5,
            Gemini 3 Pro, and GPT-5 respectively. Along with these industry giants, smaller companies
            such as Alibaba and X (formerly Twitter) have also recently released their own powerful models, 
            Qwen 3 Max and Grok 4, respectively. 
            <br />
            <br />
            From March to November, 2025, more than ten new major AI models
            were released, which showcases the rapid pace of innovation in this topic. Satya Nadella,
            CEO of Microsoft, stated that as much as 30% of Microsoft's code is now being written
            by AI, according to Novet & Vanian (2025). This highlights the significant impact these 
            revolutionary technologies are having on existing industries, like software development. 
            Not only are huge corporations adopting AI, however. According to Bick et al. (2025), from 
            August 2024 to August 2025, adoption of AI by adults aged 18 to 64 rose from 44.6% to 54.6%.
            This highlights that these revolutionary technologies are being utilized by individuals at
            a growing rate as well.
          </p>
        </div>
        <hr className="border-(--accent) border-2 mt-6"/>
        {/*Project Description*/}
        <div className="max-w-7xl" id="project-description">
          <h3 className="pl-2 mt-6 mb-2 text-2xl font-semibold">Project Description</h3>
          <p className="pl-4 mb-2 text-lg">
            This project is a full-stack web application built as a final project for ITIS 
            5166 Backend Application Development. This website was built with 4 pages: Login,
            Dashboard, Summary, and Reports. Dashboard, Summary, and Reports are only visible
            to those who are logged in, with authentication via JWT. The front end is made up
            of React routes, utilizing multiple React components, with React Router to navigate.
            MongoDB is used to host the data, while Python is leveraged to serve the data to the
            frontend. To make this project a reality, I utilized the specific tech stack listed below.
          </p>
          <h3 className="pl-2 mt-6 mb-2 text-2xl font-semibold">Tech Stack</h3>
          <ul className="mb-2 text-lg list-disc list-inside">
            <li className="pl-4">Frontend - React Router</li>
            <li className="pl-4">Frontend Served By - NGINX</li>
            <li className="pl-4">Styling - Tailwind CSS</li>
            <li className="pl-4">Authentication - JWT (JOSE)</li>
            <li className="pl-4">Backend - FastAPI (Python)</li>
            <li className="pl-4">Backend Served By - Uvicorn</li>
            <li className="pl-4">Database - MongoDB</li>
            <li className="pl-4">Hosting - DigitalOcean</li>
            <li className="pl-4">Containerization - Docker</li>
            <li className="pl-4">Orchestration - Docker Compose</li>
            <li className="pl-4">AI Assistance - GPT-5 mini for code, Perplexity Pro/Max for implementation</li>
          </ul>
        </div>
      </section>
      <QuickLinks firstPage="summary" secondPage="reports" />
    </main>
  );
}
