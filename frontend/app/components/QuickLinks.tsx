import { Link } from 'react-router';
import { useSignOut } from '../utils/auth';
import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default function QuickLinks(props: {
  firstPage:
    | string
    | number
    | bigint
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | ReactPortal
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | null
        | undefined
      >
    | null
    | undefined;
  secondPage:
    | string
    | number
    | bigint
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | ReactPortal
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | null
        | undefined
      >
    | null
    | undefined;
}) {
  return (
    <>
      <hr className="border-(--accent) border-2" />
      <section className="mt-2 py-6" id="quick-links">
        <h2 className="text-3xl font-semibold mb-4">Quick Links</h2>
        <ul className="pl-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-lg items-center">
          <li>
            <Link to={`/${props.firstPage}`} className="button rounded transition px-4 py-2 block w-full text-center">
              View {props.firstPage} page
            </Link>
          </li>
          <li>
            <Link to={`/${props.secondPage}`} className="button rounded transition px-4 py-2 block w-full text-center">
              View {props.secondPage} page
            </Link>
          </li>
          <li>
            <Link to="/" onClick={useSignOut} className="button rounded transition px-4 py-2 block w-full text-center">
              Sign out
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
