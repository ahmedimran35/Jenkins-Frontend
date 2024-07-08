import { NavLink } from "react-router-dom";

const SeoDashboard = () => {
  return (
    <div className="my-3 flex justify-center items-center bg-red-200 md:w-[450px] rounded-md">
      <NavLink className={activeLinkStyle} to="/">
        Home
      </NavLink>
      <NavLink className={activeLinkStyle} to="/dashboard/manage-asset">
        Manage Asset
      </NavLink>
      <NavLink
        className={activeLinkStyle}
        to="/dashboard/manage-software-and-tools"
      >
        Manage Software and Tools
      </NavLink>
    </div>
  );
};
const activeLinkStyle = ({ isActive, isPending }) =>
  isPending
    ? "pending"
    : isActive
    ? "bg-[#ff0000] text-white text-sm p-2 rounded-md m-2 "
    : " hover:bg-red-700 text-sm hover:text-white  m-2  rounded-md p-2";

export default SeoDashboard;
