import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link, NavLink } from "react-router-dom";
import SignInButton from "../buttons/SignInButton/SignInButton";
import brandLogoalpha from "/BrandLogoalpha.svg";
import { AiOutlineUser } from "react-icons/ai";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useResponsiveness from "../../Hooks/useResponsiveness";
import { Toast } from "../../constants/toast";
import { signSn } from "../../utils/signSn";
const CategoryNavbar = () => {
  const { isLaptopView, isDesktopView } = useResponsiveness();
  const { user, logOut, googleSignIn } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userInfo = {} } = useQuery({
    enabled: !!user?.email,
    queryKey: [user?.email, "userInfo"],
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure.get(`/user/${user?.email}`);
        return res?.data;
      }
    },
    staleTime: 100000, // Refetch data after 10 minute of inactivity
  });

  const handleLogout = () => {
    logOut();
  };

  const handleDonateLink = () => {
    if (user) return;
    signSn(googleSignIn, axiosSecure, Toast);
  }

  return (
    <header className="max-w-7xl mx-auto flex flex-row items-center justify-between mt-4 text-black font-medium px-2">
      {/* brand logo */}
      <Link
        to="/"
        className={`flex-grow ${isLaptopView ? "flex-grow-1" : ""} ${
          isDesktopView ? "flex-grow-0" : ""
        } hover:cursor-pointer`}
      >
        <img
          src={brandLogoalpha}
          className={`w-64 ${isLaptopView ? "w-[210px]" : ""} ${
            isDesktopView ? "w-[260px]" : ""
          }`}
          alt=""
        />
      </Link>

      <nav className="flex gap-3 items-center text-sm">
        <NavLink
          to="/donate"
          className="hover:text-[#ff0000] text-base text-[8px] lg:text-sm transition-colors duration-300 hidden lg:contents"
        >
          <button type="button" onClick={handleDonateLink}>

          Donate
          </button>
        </NavLink>

        <div className="">
          {user && user ? (
            <div className="flex gap-1">
              {user && userInfo?.data?.role === "admin" && (
                <Link
                  to="/dashboard/analytics"
                  className="hover:bg-[#ff0000] rounded-md p-1 transition-colors duration-300 text-[#ff0000] hover:text-white"
                >
                  <AiOutlineUser className="text-xl lg:text-3xl" />
                </Link>
              )}
              {user && userInfo?.data?.role === "seo" && (
                <Link
                  to="/dashboard/manage-asset"
                  className="hover:bg-[#ff0000] rounded-md p-1 transition-colors duration-300 text-[#ff0000] hover:text-white"
                >
                  <AiOutlineUser className="text-xl lg:text-3xl" />
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={`inline-flex items-center justify-center gap-2 text-sm tracking-wide text-white transition-colors duration-300 px-4 py-[6px] lg:px-6 lg:py-2 hover-visible:outline-none whitespace-nowrap bg-[#ff0000] hover:bg-[#C21807] hover:shadow-2xl rounded-md font-medium`}
              >
                Logout
              </button>
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </nav>
    </header>
  );
};

export default CategoryNavbar;
