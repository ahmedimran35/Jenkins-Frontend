import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../components/isLoading/Loading";
import H2Title from "../../../components/Titles/H2Title";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Pagination, Select } from "@mui/material";
import { calculateNumberOfPages } from "../../../utils/calculatePagination";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ManageUser = () => {
  // const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setLimit] = useState(10);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const handleChange = (event) => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const refreshHandler = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setLimit(10);
  };
  const {
    data: allUser = [],
    isLoading,
    isPending,
  } = useQuery({
    queryKey: [user?.email, "manageUser", searchTerm, currentPage, pageLimit],
    queryFn: async () => {
      let url = "";

      if (searchTerm) {
        url = `/user/all-user?searchTerm=${searchTerm}&page=${currentPage}&limit=${pageLimit}`;
      } else {
        url = `/user/all-user?page=${currentPage}&limit=${pageLimit}`;
      }
      const res = await axiosPublic.get(url);
      return res?.data;
    },
    staleTime: 60000, // Refetch data after 1 minute of inactivity
    cacheTime: 6000000, // Remove data from cache after 100 minute (optional)
  });
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const searchTerm = form.get("searchTerm");
    setSearchTerm(searchTerm);
  };

  if (isLoading || isPending) return <Loading isLoading={true} />;
  return (
    <div className="space-y-6 mt-12">
      <H2Title baseText={"Manage"} coloredText={"Users"}></H2Title>
      {/* table  */}
      <form className="relative" onSubmit={onSubmitHandler}>
        <div className="flex items-center justify-end gap-2">
          {searchTerm && (
            <div
              onClick={() => refreshHandler()}
              className="text-red-500 text-xl px-4 border h-full py-2 rounded-md cursor-pointer"
            >
              <FiRefreshCcw />
            </div>
          )}
          <input
            type="text"
            name="searchTerm"
            // value={searchTerm}
            defaultValue={searchTerm}
            placeholder="Search here..."
            className="border text-sm focus:border-[#ff0000]  focus:outline-none pl-2 h-10 w-72 rounded-md"
          />
        </div>
        <button type="submit" className="absolute top-[6px] right-1">
          <IoIosSearch className="text-[#ff0000] text-3xl " />
        </button>
      </form>
      <div className="w-full overflow-x-auto">
        <table
          className="w-full text-left border border-separate rounded-lg border-slate-200"
          cellSpacing="0"
        >
          {/* table head  */}
          <TableHead />
          {/* Table Body  */}
          <TableBody
            allUser={allUser}
            isLoading={isLoading}
            isPending={isPending}
          />
        </table>
      </div>
      <div className=" pb-20 ">
        <div className=" flex justify-between items-center h-16   mt-2  rounded-md ">
          <Pagination
            color="error"
            count={calculateNumberOfPages(
              allUser?.meta?.total,
              allUser?.meta?.limit
            )}
            onChange={handlePageChange}
            page={currentPage}
            variant="outlined"
            shape="rounded"
          />
          <div className=" text-end">
            <FormControl
              color="error"
              sx={{ m: 1, minWidth: 100 }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Limit</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={pageLimit}
                label="limit"
                onChange={handleChange}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th scope="col" className={` ${tableHeadingsStyle}  rounded-tl-lg`}>
          Name
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          UserName
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          Email
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          Role
        </th>
        <th scope="col" className={` ${tableHeadingsStyle}  rounded-tr-lg`}>
          Action
        </th>
      </tr>
    </thead>
  );
};

const TableBody = ({ allUser }) => {
  return (
    <tbody>
      {allUser &&
        allUser?.data?.map((normaluser) => (
          <tr key={normaluser._id}>
            <td className={tdStyle}>{normaluser?.name}</td>
            <td className={tdStyle}>{normaluser?.username}</td>
            <td className={tdStyle}>{normaluser?.email}</td>
            <td className={tdStyle}>{normaluser?.role}</td>
            <td className={tdStyle}>
              <button className="font-bold bg-[#ff0000] text-white p-1 rounded-md">
                <MdDelete className="md:text-xl lg:text-2xl" />
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

TableBody.propTypes = {
  allUser: PropTypes.any,
};

const tableHeadingsStyle =
  "h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-white bg-[#ff0000]";
const tdStyle =
  "h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200";
export default ManageUser;
