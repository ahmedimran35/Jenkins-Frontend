import {
  FaYoutube,
  FaDiscord,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";

const ResSocialMedia = () => {
  return (
    <div className=" mt-5 space-y-10">
      <h3 className="text-center text-white">Social Media</h3>
      <div className="flex flex-row items-center justify-center gap-6">
        <Link>
          <BsTwitterX className="text-3xl text-white" />
        </Link>
        <Link>
          <FaYoutube className="text-3xl text-white" />
        </Link>
        <Link>
          <FaDiscord className="text-3xl text-white" />
        </Link>
        <Link>
          <FaInstagram className="text-3xl text-white" />
        </Link>
        <Link>
          <FaLinkedinIn className="text-3xl text-white" />
        </Link>
      </div>
    </div>
  );
};

export default ResSocialMedia;
