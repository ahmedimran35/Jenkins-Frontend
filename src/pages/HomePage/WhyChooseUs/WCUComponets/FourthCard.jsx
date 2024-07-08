import PropTypes from "prop-types";
import { FaHandsClapping } from "react-icons/fa6";

function FourthCard({ parentDivClass }) {
  return (
    <div className={parentDivClass}>
      <FaHandsClapping className="text-4xl text-[#ff0000]" />
      <h3 className="text-xl font-[500]" data-test="card-heading-4">
        Easy Connect
      </h3>
      <p className="text-gray-600 text-sm" data-test="card-para-4">
        YT SHOPS makes connection between creators easy. Join us now.
      </p>
    </div>
  );
}

FourthCard.propTypes = {
  parentDivClass: PropTypes.string,
};

export default FourthCard;
