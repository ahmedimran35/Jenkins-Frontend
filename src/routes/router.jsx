/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
// import HomePage from "../pages/HomePage/HomePage";
import MainLayout from "../Layout/MainLayout/MainLayout";
// import Login from "../components/Login/Login";
// import Signup from "../components/Signup/Signup";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import SeoRoutes from "./SeoRoutes";
import { Suspense } from "react";
import Loading from "../components/isLoading/Loading";
import { lazy } from "react";
import ManageSoftwareAndTools from "../pages/Dashboard/Seo/ManageSoftware";
import UpdateSoftwareAndTools from "../pages/Dashboard/Seo/UpdateSoftware";
import FetchingToolsAndSoftwareCategory from "../pages/Category/FetchingCategory/FatchingToolsAndSoftwareCategory";
import SingleSoftwareAndTools from "../pages/Category/FetchingCategoryData/SingleSoftwareAndTools";
import Feedback from "../components/Footer/More/Feedback/Feedback";

const Analytics = lazy(() => import("../pages/Dashboard/SuperAdmin/Analytics"));
const CategorySingleAsset = lazy(() =>
  import("../pages/Category/FetchingCategoryData/CategorySingleAsset")
);
const FetchingCategory = lazy(() =>
  import("../pages/Category/FetchingCategory/FetchingCategory")
);
const DashboardLayoutV2 = lazy(() =>
  import("../Layout/DashboardLayout/DashboardLayoutV2")
);
const AboutUs = lazy(() =>
  import("../components/Footer/Import/aboutUs/AboutUs")
);
const TermsofUse = lazy(() =>
  import("../components/Footer/Import/TermofUse/TermsofUse")
);
const Liecense = lazy(() =>
  import("../components/Footer/Import/lience/Liecense")
);
const CopyRight = lazy(() =>
  import("../components/Footer/Import/copyRight/CopyRight")
);
const CookiePolicy = lazy(() =>
  import("../components/Footer/Import/cookiePolicy/CookiePolicy")
);
const CookieSetting = lazy(() =>
  import("../components/Footer/Import/cookieSetting/CookieSetting")
);
const TermsAndCondition = lazy(() =>
  import("../components/Footer/Import/termandCondition/TermsAndCondition")
);
const Privacy = lazy(() =>
  import("../components/Footer/Import/privacy/Privacy")
);
const Blog = lazy(() => import("../components/Footer/More/Blog/Blog"));
const PressProgram = lazy(() =>
  import("../components/Footer/More/PressProgram/PressProgram")
);
const PartnerProgram = lazy(() =>
  import("../components/Footer/More/partnerProgram/PartnerProgram")
);
const YTShopsBrandGuideLine = lazy(() =>
  import("../components/Footer/More/YTShopsGuideLine/YTShopsBrandGuideLine")
);
const Support = lazy(() => import("../components/Footer/More/Support/Support"));
const HomePage = lazy(() => import("./../pages/HomePage/HomePage"));
const Donation = lazy(() => import("./../pages/Donation/Donation"));
const DonationSuccess = lazy(() =>
  import("../pages/DonationSuccess/DonationSuccess")
);
const PaymentPage = lazy(() => import("../pages/Donation/checkout/Payment"));
const AddAsset = lazy(() => import("../pages/Dashboard/Seo/AddAsset"));
const ManageAsset = lazy(() => import("../pages/Dashboard/Seo/ManageAsset"));
const UpdateAsset = lazy(() => import("../pages/Dashboard/Seo/UpdateAsset"));
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));
const ManageUser = lazy(() =>
  import("../pages/Dashboard/SuperAdmin/ManageUser")
);
const AddSoftwares = lazy(() => import("../pages/Dashboard/Seo/AddSoftwares"));
const Category = lazy(() => import("../pages/Category/Category"));
const FAQ = lazy(() => import("../components/Footer/More/FAQ/FAQ"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <MainLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <HomePage />
          </Suspense>
        ),
      },

      {
        path: "/donate",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <Donation />
          </Suspense>
        ),
      },

      {
        path: "/payment",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <PaymentPage />
          </Suspense>
        ),
      },
      {
        path: "/payment/success",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <DonationSuccess />
          </Suspense>
        ),
      },
      /*   {
           {
             path: "/login",
             element: <Login />,
           },
           {
             path: "/signup",
             element: <Signup />,
           }, */
      {
        path: "/category-data/:titleId",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <CategorySingleAsset />
          </Suspense>
        ),
      },
      {
        path: "/software-and-tools-data/:titleId",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SingleSoftwareAndTools />
          </Suspense>
        ),
      },

      // footer important section
      {
        path: "/aboutus",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "/termstouse",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <TermsofUse />
          </Suspense>
        ),
      },
      {
        path: "/license",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <Liecense />
          </Suspense>
        ),
      },
      {
        path: "/copyright",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <CopyRight />
          </Suspense>
        ),
      },
      {
        path: "/cookiepolicy",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <CookiePolicy />
          </Suspense>
        ),
      },
      {
        path: "/cookiesetting",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <CookieSetting />
          </Suspense>
        ),
      },
      {
        path: "/termscondition",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <TermsAndCondition />
          </Suspense>
        ),
      },
      {
        path: "/privacy",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <Privacy />
          </Suspense>
        ),
      },

      // footer more section
      {
        path: "/blog",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "/pressprogram",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <PressProgram />
          </Suspense>
        ),
      },
      {
        path: "/partnerprogram",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <PartnerProgram />
          </Suspense>
        ),
      },
      {
        path: "/ytshopsbrandguideline",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <YTShopsBrandGuideLine />
          </Suspense>
        ),
      },
      {
        path: "/faq",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <FAQ />
          </Suspense>
        ),
      },
      {
        path: "/support",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <Support />
          </Suspense>
        ),
      },
      {
        path: "/feedback",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <Feedback />
          </Suspense>
        ),
      },
    ],
  },

  // category section
  {
    path: "/category-data",
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <Category />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <FetchingCategory />
          </Suspense>
        ),
      },
    ],
  },

  // category section tools and software section
  {
    path: "/category-tools-and-software",
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <Category />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <FetchingToolsAndSoftwareCategory />
          </Suspense>
        ),
      },
    ],
  },

  // Dashboard
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<Loading isLoading={true} />}>
        <PrivateRoutes>
          <DashboardLayoutV2 />
        </PrivateRoutes>
      </Suspense>
    ),
    children: [
      // admin dashboard
      {
        path: "manage-user",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <PrivateRoutes>
              <AdminRoutes>
                <ManageUser />
              </AdminRoutes>
            </PrivateRoutes>
          </Suspense>
        ),
      },
      {
        path: "analytics",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <PrivateRoutes>
              <AdminRoutes>
                <Analytics />
              </AdminRoutes>
            </PrivateRoutes>
          </Suspense>
        ),
      },

      // seo dashboard
      {
        path: "add-asset",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <AddAsset />
            </SeoRoutes>
          </Suspense>
        ),
      },
      {
        path: "add-software-and-tools",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <AddSoftwares />
            </SeoRoutes>
          </Suspense>
        ),
      },
      {
        path: "manage-software-and-tools",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <ManageSoftwareAndTools />
            </SeoRoutes>
          </Suspense>
        ),
      },
      {
        path: "manage-asset",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <ManageAsset />
            </SeoRoutes>
          </Suspense>
        ),
      },
      {
        path: "update-asset/:assetId",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <UpdateAsset />
            </SeoRoutes>
          </Suspense>
        ),
      },
      {
        path: "update-software-and-tools/:toolsId",
        element: (
          <Suspense fallback={<Loading isLoading={true} />}>
            <SeoRoutes>
              <UpdateSoftwareAndTools />
            </SeoRoutes>
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
