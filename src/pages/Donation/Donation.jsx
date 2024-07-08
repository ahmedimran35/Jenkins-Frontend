import { useState } from "react";
import H2Title from "../../components/Titles/H2Title";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import ScrollToTop from "../../components/ScrollToTheTop/ScrollToTheTop";

const Donation = () => {
  const [selectedDonation, SetSelectedDonation] = useState(50);

  const donationDefault = [50, 100];
  const navigate = useNavigate();
  const submitHandler = () => {

    localStorage.setItem("DonateAmount", selectedDonation);

    navigate("/payment");
  };

  return (
    <div className="max-w-7xl mx-auto my-20">
      <Helmet>
        <title>Donate to YT Shops</title>
        <meta
          name="description"
          content="Your donation can keep this site free forever"
        />
      </Helmet>
      <H2Title baseText="Donate to" coloredText="YT Shops" />

      <ScrollToTop />
      <div className="lg:flex flex-row justify-evenly lg:gap-10 my-20 pb-20 min-h-fit">
      <div className=" max-w-[550px] mx-auto">
          <h4> Description </h4>

          <p className="mt-3 text-zinc-500 text-justify text-sm">
            At YT Shops, we are passionate about making a positive impact on our
            communities and the world. Over the years, our 501(c)(3) charitable
            organization has worked tirelessly to raise funds for causes close
            to our hearts, such as 17 Strong, the LEMO Foundation, the Palo Alto
            Fire Department holiday toy drive, and aiding in times of natural
            disasters like the Maui wildfires, Texas power crisis in 2021, and
            hurricanes in New Orleans. We believe in the power of collective
            action, and your generous donations can help us continue our mission
            of bringing hope and assistance to those in need. Together, we can
            drive change and create a better future for all. Please consider
            making a donation today and join us in our commitment to making a
            difference.
          </p>
        </div>
        <div className="w-full">
          <div className="p-3 gap-5">
            <div className="max-w-[550px] mx-auto flex justify-start gap-5 px-6">
              {donationDefault.map((donation, i) => (
                <div
                  onClick={() => SetSelectedDonation(donation)}
                  key={i}
                  className={`${
                    selectedDonation === donation
                      ? "bg-[#ff0000] text-white"
                      : "bg-slate-200"
                  } w-20  h-8 rounded-md text-sm flex justify-center items-center cursor-pointer`}
                >
                  {donation} USD
                </div>
              ))}
            </div>
            <div className="  mt-5 lg:w-[500px] mx-auto  relative">
              <input
                data-test="donation-field"
                type="number"
                required
                value={selectedDonation}
                onChange={(e) => SetSelectedDonation(e.target.value)}
                placeholder="Enter Amount"
                className="relative w-full font-bold h-12 px-4 text-sm placeholder-transparent transition-all border rounded-md outline-none peer border-slate-200 text-black autofill:bg-white  focus:border-[#ff0000] focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-black"
              />
              <small>
                {selectedDonation < 4 && "Minimum Donation Amount 5$"}
              </small>
              <label className="absolute left-2 -top-2 z-[1] px-2 text-xs text-black transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-[17px] peer-placeholder-shown:text-sm peer-required:after:text-[#ff0000] peer-required:after:content-['\00a0*'] peer-invalid:text-[#ff0000] peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff0000] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-black peer-disabled:before:bg-transparent">
                Enter The Amount You Want to Donate ($)
              </label>
            </div>
            <div className=" flex justify-center mt-4">
              <button
                data-test="donation-button"
                onClick={() => submitHandler()}
                disabled={selectedDonation < 5}
                className={`inline-flex items-center justify-center px-3 py-2 md:px-4 md:py-[10px] text-xs md:text-[12px] font-medium tracking-wide text-white transition duration-300 rounded-lg hover-visible:outline-none whitespace-nowrap  hover:shadow-2xl uppercase hover:cursor-pointer ${
                  selectedDonation < 5
                    ? "bg-red-200"
                    : "bg-[#ff0000] hover:bg-[#C21807]"
                }`}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
