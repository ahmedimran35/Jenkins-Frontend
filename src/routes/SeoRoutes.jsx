import PropTypes from "prop-types";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loading from "../components/isLoading/Loading";

import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const SeoRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  
  const {
    data: loggedUserRole = {},
    isLoading: isUserDataLoading,
    isPending: isUserLoading,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["loggedUserRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res?.data?.data;
    },
    // Configure caching behavior
    staleTime: 600000, // Refetch data after 10 minute of inactivity
    cacheTime: 6000000, // Remove data from cache after 100 minute (optional)
  });
  const isLoadingData = loading || isUserDataLoading || isUserLoading;

  if (isLoadingData) return <Loading isLoading={true} />;

  return user && loggedUserRole?.role === "seo" ? (
    children
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

SeoRoutes.propTypes = {
  children: PropTypes.object,
};

export default SeoRoutes;
