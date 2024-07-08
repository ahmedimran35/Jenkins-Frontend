import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="my-3 flex justify-center items-center bg-red-200 md:w-[320px] rounded-md">
      <NavLink className={activeLinkStyle} to="/">
        Home
      </NavLink>
      <NavLink className={activeLinkStyle} to="/dashboard/analytics">
        Analytics
      </NavLink>
      <NavLink className={activeLinkStyle} to="/dashboard/manage-user">
        Manage User
      </NavLink>
    </div>
  );
};
const activeLinkStyle = ({ isActive, isPending }) =>
  isPending
    ? "pending"
    : isActive
      ? "bg-[#ff0000] text-white text-sm p-2 rounded-md m-2  "
      : " hover:bg-red-700 text-sm hover:text-white  m-2  rounded-md p-2";

export default AdminDashboard;
