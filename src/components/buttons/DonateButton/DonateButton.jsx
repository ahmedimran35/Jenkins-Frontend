import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { signSn } from "../../../utils/signSn";
import { Toast } from "../../../constants/toast";

const DonateButton = () => {
  const { googleSignIn, user } = useAuth();
  const axios = useAxiosSecure();

  const handleDonateNow = () => {
    if (user) return;
    signSn(googleSignIn, axios, Toast);
    
  };
  
  return (
    <Link to={"/donate"}>
      <button
        onClick={handleDonateNow}
        className={`inline-flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-[13px] text-xs md:text-[12px] lg:text-base font-normal tracking-wide text-white transition duration-300 rounded-lg whitespace-nowrap bg-[#ff0000] hover:bg-[#C21807] hover:shadow-2xl`}
      >
        Donate Now
      </button>
    </Link>
  );
};


export default DonateButton;
