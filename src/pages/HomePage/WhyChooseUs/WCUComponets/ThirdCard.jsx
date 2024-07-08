import PropTypes from "prop-types";
import { IoSettings } from "react-icons/io5";

function ThirdCard({ parentDivClass }) {
  return (
    <div className={parentDivClass}>
      <IoSettings className="text-4xl text-[#ff0000]" />
      <h3 className="text-xl font-[500]" data-test="card-heading-3">
        Powerful Tools
      </h3>
      <p className="text-gray-600 text-sm" data-test="card-para-3">
        It has lots of powerful tools for creators in one place. It&apos;s your
        go to place.
      </p>
    </div>
  );
}

ThirdCard.propTypes = {
  parentDivClass: PropTypes.string,
};

export default ThirdCard;
