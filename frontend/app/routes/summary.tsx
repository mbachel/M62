import type { Route } from './+types/summary';
import { Link, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { isAuthenticated } from '../utils/auth';
import ARChart from '../components/MRChart';
import QuickLinks from '~/components/QuickLinks';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Summary - M62' }];
}

export default function Summary() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <main className="pt-6 px-6 container mx-auto">
      <section className="py-6" id="summary">
        <h1 className="text-4xl font-semibold mb-4">Summary</h1>
        <p className="pl-4 text-lg max-w-7xl">
          As mentioned on the Dashboard, Artificial Intelligence (AI) has seen some rapid growth in
          recent years, with a lot of growth in just the last year alone.
        </p>
        <ARChart />
        <p className="pl-4 text-lg max-w-7xl mb-2">
          The chart above showcases some of the biggest AI releases in the last few months. Each of
          these major corporations have released innovative AI models with huge advancements since
          previous versions. By clicking on each dot in the graph, you can see more details about
          each release, including the model name, release date, and some of the key innovations
          introduced with that model. Each dot is color coded to a developer, and the legend is
          found just above the chart.
          <br />
          <br />
          As is clearly visible, models have only been getting more advanced with each release, and
          each company is leveraging new innovations each time, instead of just minor tweaks. Not
          only that, but this is just some of the major releases; these are just the major
          innovations between April 2025 and November 2025. Some other major corporations, such as
          Microsoft, IBM, and Plantir, are also working on their own models.
          <br />
          <br />
          To summarize, it is important to stay on top of both major and minor AI releases, as the
          field is rapidly evolving and new advancements are being made constantly. This project
          aims to assist users in staying up-to-date with the latest innovations in AI technology.
          Source of this data:
          <br />
          <br />
          Cardillo, A. (2025, October 17). Best 44 Large Language Models (LLMs) in 2025. Exploding
          Topics. <br />
          <Link
            to="https://explodingtopics.com/blog/list-of-llms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--link) underline ml-12"
          >
            https://explodingtopics.com/blog/list-of-llms
          </Link>
        </p>
      </section>
      <QuickLinks firstPage="dashboard" secondPage="reports" />
    </main>
  );
}
