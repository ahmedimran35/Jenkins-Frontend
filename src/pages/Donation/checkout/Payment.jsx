import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../../components/ui/CheckoutFrom";
import PaymentPic from "../../../assets/paymentPic.webp";
import useAuth from "../../../Hooks/useAuth";
const stripePromise = loadStripe(import.meta.env.VITE_stripe);
const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    const amount = localStorage.getItem("DonateAmount");

    fetch(
      `${
        import.meta.env.VITE_axiosPublic
      }/donation/create-payment-intent?email=${
        user?.email
      }&amount=${amount}&name=${user?.displayName}`
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data?.data?.clientSecret));
  }, [user?.displayName, user?.email]);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance: appearance,
  };

  return (
    <div className="max-w-7xl mx-auto   my-20 p-3 rounded-md">
      <div className="  grid lg:grid-cols-2 grid-cols-1">
        <div className="w-full flex justify-center">
          <img
            className="h-[450px] "
            src={PaymentPic}
            alt="Payment Pic"
            loading="lazy"
          />
        </div>
        <div className=" border py-10 px-5 rounded-md">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
