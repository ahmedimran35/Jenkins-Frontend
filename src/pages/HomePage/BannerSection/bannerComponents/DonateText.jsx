import { Link } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { signSn } from "../../../../utils/signSn";
import { Toast } from "../../../../constants/toast";

function DonateText() {
  const { googleSignIn, user } = useAuth();
  const axios = useAxiosSecure();

  const handlePleaseDonate = () => {
    if (user) return;
    signSn(googleSignIn, axios, Toast);
  };

  return (
    <div className="flex justify-between w-[260px] md:w-[288px] lg:w-[332px] text-xs md:text-sm lg:text-base text-[14px] text-[#ABABAB] font-normal">
      <span>To use free forever</span>|
      <button type="button" onClick={handlePleaseDonate}>
        <Link
          data-test="banner-donate"
          to="/donate"
          className="hover:cursor-pointer hover:text-[#ff0000] transition-colors duration-300"
        >
          Please donate now
        </Link>
      </button>
    </div>
  );
}

export default DonateText;
