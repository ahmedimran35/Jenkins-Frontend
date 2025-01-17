import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SignInButton from "../../../components/buttons/SignInButton/SignInButton";
import useAuth from "../../../Hooks/useAuth";
import SmallLoading from "../../../components/isLoading/SmallLoading";
import parse from "html-react-parser";
import "./briefDescriptionStyle.css";
import { Helmet } from "react-helmet-async";
import Loading from "../../../components/isLoading/Loading";
import ScrollToTop from "../../../components/ScrollToTheTop/ScrollToTheTop";
import './style.css'
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SingleSoftwareAndTools = () => {
  const { user, loading: userLoading } = useAuth();
  const { titleId } = useParams();

  const formatTextWithSpaces = (text) => {
    if (!text) return "";
    return text.replace(/\s/g, "-");
  };

  function getLastId(str) {
    if (!str) return "";
    // Split the string using "-" as the delimiter
    const parts = str.split("-");
    // Return the last element of the array, which is the ID
    return parts[parts.length - 1];
  }

  // const splittedSlug = titleId?.split("-");
  const splittedSlug = formatTextWithSpaces(titleId);

  // const softwaretoolsArray = splittedSlug.split("-");
  const softwaretoolsID = getLastId(splittedSlug)

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    data: singleSoftwareTools = {},
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["single Software", titleId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/softwareAndTools/${softwaretoolsID}`);
      // console.log(res?.data?.data?.briefDescription);
      return res?.data?.data;
    },
    staleTime: 600000, // Refetch data after 10 minute of inactivity
    cacheTime: 6000000, // Remove data from cache after 100 minute (optional)
  });

  if (isLoading || isPending) return <Loading isLoading={true} />;

  //
  const calculateUserPartnerWebSiteVisitedHandler = async () => {
    try {
      await axiosSecure.post(
        `/softwareAndTools/visited-partner/${softwaretoolsID}`
      );
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: ` Something Went Wrong.`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff0000",
      });
    }
  };
  const loadedBriefDescription = singleSoftwareTools?.briefDescription || "";
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between my-10 px-10 gap-10">
      <Helmet>
        <title>{singleSoftwareTools?.metaTitle}</title>
        <meta
          name="description"
          content={singleSoftwareTools?.metaDescription}
        />
      </Helmet>
      <ScrollToTop />
      <div className="lg:w-[62%]">
        <img
          className="w-fit h-fit rounded-md selector"
          src={singleSoftwareTools?.url}
          alt="affiliated software"
          draggable={false}
        />
        <div className=" py-5 px-1 mt-3 ">
          <div className="blog-post">{parse(loadedBriefDescription)}</div>
        </div>
      </div>
      <div className="lg:w-[34%] border px-4 py-2 rounded-md sticky top-2">
        <h3 className="text-lg md:text-xl lg:text-3xl  font-semibold my-5">
          {singleSoftwareTools?.title}
        </h3>
        <p className="text-sm mb-2">{singleSoftwareTools?.description}</p>
        {singleSoftwareTools?.pricing === "Freemium" ||
        singleSoftwareTools?.pricing === "Paid" ? (
          <>
            <div className="flex flex-row justify-start items-center gap-2 mt-3">
              <p className="text-[#ff0000] text-lg font-semibold">
                {singleSoftwareTools?.discountPercentage.toFixed(2)}%
              </p>{" "}
              <p className="text-lg font-semibold">
                {" "}
                ${singleSoftwareTools?.discountPrice}
              </p>
              <br />
            </div>
            <p className="text-sm">
              <s> ${singleSoftwareTools?.regularPrice}</s>
            </p>
          </>
        ) : (
          <p className="flex flex-row justify-center items-center text-lg font-semibold my-3">
            Free
          </p>
        )}
        {userLoading ? (
          <SmallLoading />
        ) : user ? (
          <button
            onClick={() => calculateUserPartnerWebSiteVisitedHandler()}
            className="flex items-center justify-center w-fit mx-auto mt-5 mb-3"
          >
            <a
              href={singleSoftwareTools?.affiliateURL}
              target="blank"
              className="inline-flex items-center justify-center px-3 py-2 md:px-4 md:py-[10px] text-xs md:text-[12px] lg:text-[15px] font-medium tracking-wide text-white transition duration-300 rounded-lg hover-visible:outline-none whitespace-nowrap bg-[#ff0000] hover:bg-[#C21807] hover:shadow-2xl uppercase hover:cursor-pointer"
            >
              Get now
            </a>
          </button>
        ) : (
          <div className=" p-2 border border-[#ff0000] rounded-md shadow shadow-[#ff0000]  space-y-3 my-3">
            <h4 className=" text-center font-semibold text-[#ff0000]">
              Sign-in required
            </h4>
            <p className="text-sm">
              Think this icon is perfect? Sign up for an account to download it
              - it&apos;s super easy!
            </p>
            <div className=" text-center">
              <SignInButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleSoftwareAndTools;
