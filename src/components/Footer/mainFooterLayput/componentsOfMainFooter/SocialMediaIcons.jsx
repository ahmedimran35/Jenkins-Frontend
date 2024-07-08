import { BsTwitterX } from "react-icons/bs";
import { FaDiscord, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function SocialMediaIcons() {
    return (
      <div className="  md:w-1/3  flex flex-row items-center justify-center md:justify-start gap-2 lg:gap-5">
        <Link className="hover:brightness-75" >
          <BsTwitterX className="text-3xl" />
        </Link>
        <Link className="hover:brightness-75">
          <FaYoutube className="text-3xl" />
        </Link>
        <Link className="hover:brightness-75">
          <FaDiscord className="text-3xl" />
        </Link>
        <Link className="hover:brightness-75">
          <FaInstagram className="text-3xl" />
        </Link>
        <Link className="hover:brightness-75">
          <FaLinkedinIn className="text-3xl" />
        </Link>
      </div>
    );
  }
  
export default SocialMediaIcons;