import PropTypes from "prop-types"
import useAuth from "../Hooks/useAuth";
import Loading from "../components/isLoading/Loading";
import useAxiosSecure from "../Hooks/useAxiosSecure";

import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const location = useLocation();
  
  const {
    data: loggedUserRole = {},
    isLoading,
    isPending: isUserLoading,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: [user?.email, "loggedUserRole"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res?.data.data;
    },
    // Configure caching behavior
    staleTime: 60000, // Refetch data after 1 minute of inactivity
    cacheTime: 6000000, // Remove data from cache after 100 minute (optional)
  });

  if (loading || isLoading || isUserLoading)
    return <Loading isLoading={true} />;

  if (user && loggedUserRole?.role === "admin") return children;

  return <Navigate to={"/"} state={{ from: location }} replace />;
};

AdminRoutes.propTypes = {
  children: PropTypes.object
}

export default AdminRoutes;
