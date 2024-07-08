import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../components/isLoading/Loading";
import { RiEditBoxFill, RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import H2Title from "../../../components/Titles/H2Title";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Pagination, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { FiRefreshCcw } from "react-icons/fi";
import { calculateNumberOfPages } from "../../../utils/calculatePagination";
import { FaCirclePlus } from "react-icons/fa6";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ManageSoftwareAndTools = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setLimit] = useState(10);

  const handleChange = (event) => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const searchTerm = form.get("searchTerm");
    setSearchTerm(searchTerm);
  };

  const {
    data: allSoftwareAndTools = [],
    isLoading,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [
      user?.email,
      "manageSoftwareAndTools",
      searchTerm,
      currentPage,
      pageLimit,
    ],
    queryFn: async () => {
      let url = "";
      if (searchTerm) {
        url = `/softwareAndTools?searchTerm=${searchTerm}&page=${currentPage}&limit=${pageLimit}`;
      } else {
        url = `/softwareAndTools?page=${currentPage}&limit=${pageLimit}`;
      }
      const res = await axiosPublic.get(url);

      return res?.data?.data;
    },
  });

  if (isLoading || isPending) return <Loading isLoading={true} />;

  const refreshHandler = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setLimit(10);
  };
  return (
    <div className=" space-y-6 mt-20">
      {/* add dynamic name and tags */}
      <Helmet>
        <title>Manage Software And Tools</title>
        <meta name="description" content="Manage Software And Tools" />
      </Helmet>
      <H2Title baseText={"Manage"} coloredText={"Software And Tools"}></H2Title>
      <div className=" flex justify-end items-center gap-2">
        {searchTerm && (
          <button
            onClick={() => refreshHandler()}
            className="text-red-500 text-xl px-4 border h-full py-2 rounded-md cursor-pointer"
          >
            <FiRefreshCcw />
          </button>
        )}
        <form className="relative" onSubmit={onSubmitHandler}>
          <div className="flex items-center justify-end">
            <input
              type="text"
              name="searchTerm"
              placeholder="Search here..."
              className="border text-sm focus:border-[#ff0000]  focus:outline-none pl-2 h-10 w-72 rounded-md"
            />
          </div>
          <button type="submit" className="absolute top-[6px] right-1">
            <IoIosSearch className="text-[#ff0000] text-3xl " />
          </button>
        </form>
        <Link
          to="/dashboard/add-software-and-tools"
          className="inline-flex gap-1 items-center justify-center px-3 py-2 md:px-4 md:py-[10px] text-xs md:text-[12px] lg:text-[15px] font-medium tracking-wide text-white transition duration-300 rounded-lg hover-visible:outline-none whitespace-nowrap bg-[#ff0000] hover:bg-[#C21807] hover:shadow-2xl uppercase hover:cursor-pointer"
        >
          {/* <IoIosSearch className="text-[#ff0000] text-3xl " /> Add Asset */}
          Add <FaCirclePlus className="text-sm" />
        </Link>
      </div>
      <div className="w-full overflow-x-auto">
        <table
          className="w-full text-left border border-separate rounded-lg border-slate-200"
          cellSpacing="0"
        >
          {/* table head  */}
          <TableHead />
          {/* Table Body  */}
          <TableBody
            allSoftwareAndTools={allSoftwareAndTools}
            isLoading={isLoading}
            isPending={isPending}
            refetch={refetch}
          />
        </table>
      </div>

      <div className=" pb-20 ">
        <div className=" flex    justify-between items-center h-16   mt-2  rounded-md ">
          <Pagination
            color="error"
            count={calculateNumberOfPages(
              allSoftwareAndTools?.meta?.total,
              allSoftwareAndTools?.meta?.limit
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
          Preview
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          Pricing
        </th>
        <th
          scope="col"
          className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-white bg-[#ff0000]"
        >
          Regular Price
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          Discount Price
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          Discount Percentage
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          Clicked
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          Visited
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          Sub Category
        </th>

        <th scope="col" className={` ${tableHeadingsStyle}  rounded-tr-lg`}>
          Actions
        </th>
      </tr>
    </thead>
  );
};

const TableBody = ({ allSoftwareAndTools, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const deleteSoftwareAndToolsHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff0000",
      cancelButtonColor: "#B2BEB5",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/softwareAndTools/${id}`).then((res) => {
          if (res.data.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Software and Tools has been deleted.",
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };

  return (
    <tbody>
      {allSoftwareAndTools &&
        allSoftwareAndTools.data?.map((tools) => (
          <tr key={tools?._id}>
            <td className={tdStyle}>{tools.title}</td>
            <td className={tdStyle}>
              <img src={tools?.url} alt="apple" width={30} loading="lazy" />
            </td>
            <td className={tdStyle}>{tools?.pricing}</td>
            <td className={tdStyle}>{tools?.regularPrice}</td>
            <td className={tdStyle}>{tools?.discountPrice}</td>
            <td className={tdStyle}>
              {tools?.pricing !== "Free" &&
                `${parseFloat(tools?.discountPercentage).toFixed(2)} %`}
            </td>
            <td className={tdStyle}>{tools?.click}</td>
            <td className={tdStyle}>{tools?.visited}</td>
            <td
              style={{ width: "280px", minHeight: "65px", padding: "2px 5px" }}
              className={`flex flex-wrap items-center justify-start gap-1 ${tdStyle}`}
            >
              {tools?.subCategories?.map((subcategory, i) => (
                <p
                  className="border inline px-[2.5px] py-[1.5px] rounded bg-red-200 border-none text-zinc-700 text-xs"
                  key={i}
                >
                  {subcategory}
                </p>
              ))}
            </td>
            <td className={tdStyle}>
              <div className="flex items-center justify-around  hover:cursor-pointer">
                <div>
                  <RiEditBoxFill
                    onClick={() =>
                      navigate(
                        `/dashboard/update-software-and-tools/${tools?._id}`
                      )
                    }
                    className="text-xl transition-colors duration-300 hover:text-green-400"
                  />
                </div>
                <div onClick={() => deleteSoftwareAndToolsHandler(tools?._id)}>
                  <RiDeleteBin6Fill className="text-xl transition-colors duration-300 hover:text-[#ff0000]" />
                </div>
              </div>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

const tdStyle =
  "h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200";
const tableHeadingsStyle =
  "h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-white bg-[#ff0000]";
TableBody.propTypes = {
  allSoftwareAndTools: PropTypes.any,
  refetch: PropTypes.func,
};

export default ManageSoftwareAndTools;
