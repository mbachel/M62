import type { Route } from "./+types/reports";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { isAuthenticated } from "../utils/auth";
import MPChart from "~/components/MPChart";
import QuickLinks from "~/components/QuickLinks";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Reports - M62" }];
}

export default function Reports() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <main className="pt-6 px-6 container mx-auto">
      <section className="py-6" id="summary">
        <h1 className="text-4xl font-semibold mb-4">Summary</h1>
        <p className="pl-4 text-lg max-w-7xl mb-4">
          As mentioned in the Summary, the world has seen some major AI model releases
          in recent months. 
        </p>
        <MPChart />
        <p className="pl-4 text-lg max-w-7xl mt-12 mb-2">
          The grid of charts above showcases some key benchmarks of some of the current top
          AI models as of late 2025 and some of their predecessors. In these charts, four key
          benchmarks are evaluated: 
          <ul className="list-disc list-inside">
            <li className="pl-4">Humanity's Last Exam: 2,500 questions across a hundred subjects (<Link to="https://agi.safe.ai/" target="_blank" rel="noopener noreferrer" className="link">https://agi.safe.ai/</Link>)</li>
            <li className="pl-4">GPQA Diamond Reasoning: challenging MCQ quiz in biology, chemistry, and physics (<Link to="https://epoch.ai/benchmarks/gpqa-diamond" target="_blank" rel="noopener noreferrer" className="link">https://epoch.ai/benchmarks/gpqa-diamond</Link>)</li>
            <li className="pl-4">LiveCodeBench Coding: LeetCode, AtCoder, and Codeforces coding problems (<Link to="https://livecodebench.github.io/" target="_blank" rel="noopener noreferrer" className="link">https://livecodebench.github.io/</Link>)</li>
            <li className="pl-4">AIME 2025 Math: math competition for top AMC students (<Link to="https://www.kaggle.com/benchmarks/open-benchmarks/aime-2025" target="_blank" rel="noopener noreferrer" className="link">https://www.kaggle.com/benchmarks/open-benchmarks/aime-2025</Link>)</li>
          </ul>
          Each chart represents one of nine models, with the model name located at the top
          and developer located at the bottom. The lines represent numbers from 0 to 100.
          Based on the charts, we can see that major improvements are made upon a given
          previous iteration. For example, Gemini 3 Pro scores much better overall compared
          to its predecessor, Gemini 2.5 Pro. Not only that, but Gemini 3 Pro outperforms
          every other model listed on this page, and outperforms most other models on these
          given benchmarks.
          <br />
          <br />
          Overall, we can see that companies are making significant strides in improving
          their AI models with each iteration. Not only that, these are just a few of the
          best benchmarks out there for determining a model's performance.  
          <br />Source of this data:
          <br />
          <br />
          AI Model & API Providers Analysis | Artificial Analysis. (n.d.). <br />
          <Link to="https://artificialanalysis.ai/?models=gpt-5%2Cgpt-5-1%2Cgemini-3-pro%2Cgemini-2-5-pro%2Cclaude-opus-4-5-thinking%2Cclaude-4-5-sonnet-thinking%2Cgrok-4%2Ckimi-k2-thinking%2Cqwen3-max" target="_blank" rel="noopener noreferrer" className="text-(--link) underline ml-12">
            https://artificialanalysis.ai/
          </Link>
        </p>
      </section>
      <QuickLinks firstPage="dashboard" secondPage="summary" />
    </main>
  );
}
