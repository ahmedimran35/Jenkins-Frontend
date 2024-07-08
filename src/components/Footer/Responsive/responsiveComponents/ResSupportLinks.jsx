import { Link } from "react-router-dom";

const ResSupportLinks = () => {
  return (
    <details className="group p-4">
      <summary className="relative cursor-pointer list-none pr-8 font-medium text-[#d4d3d3] transition-colors duration-300 focus-visible:outline-none group-hover:text-[#fff] hover:font-semibold [&::-webkit-details-marker]:hidden">
        Support
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-0 top-1 h-4 w-4 shrink-0 text-white transition duration-300 group-open:rotate-45"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-labelledby="title-ac14 desc-ac14"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </summary>
      <ul className="mt-4 space-y-4 ml-5">
        <li>
          <Link
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold"
            to="/faq"
          >
            FAQ
          </Link>
        </li>
        <li>
          <Link
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold"
            to="/support"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold"
            to="/feedback"
          >
            Feedback
          </Link>
        </li>
      </ul>
    </details>
  );
};

export default ResSupportLinks;
