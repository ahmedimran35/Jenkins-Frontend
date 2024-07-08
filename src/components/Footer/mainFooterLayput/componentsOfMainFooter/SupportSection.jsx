import { Link } from "react-router-dom";

function SupportSection() {
    return (
      <div 
        className="w-1/3 p-7"
      >
        <h3 
            className="text-lg lg:text-xl uppercase font-medium"
        >
            Support
        </h3>
        <div className="w-[250px] md:w-fit flex flex-row flex-wrap md:flex-col text-xs lg:text-sm gap-5 md:gap-1 items-start my-2 md:my-7 text-[#d4d3d3]">
          <Link
            to="/faq"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
          >
            FAQ
          </Link>
          <Link
            to="/support"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            to="/feedback"
            className="text-[#d4d3d3] hover:text-[#fff] hover:font-semibold transition-colors duration-300"
          >
            Feedback
          </Link>
        </div>
      </div>
    );
}

export default SupportSection;