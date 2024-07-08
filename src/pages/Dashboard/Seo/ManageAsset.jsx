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

const ManageAsset = () => {
  const { user } = useAuth();
  // const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setLimit] = useState(10);
  const axiosPublic = useAxiosPublic();
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
    data: allAsset = [],
    isLoading,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "manageAssets", searchTerm, currentPage, pageLimit],
    queryFn: async () => {
      let url = "";
      if (searchTerm) {
        url = `/assets/by-seo?searchTerm=${searchTerm}&page=${currentPage}&limit=${pageLimit}`;
      } else {
        url = `/assets/by-seo?page=${currentPage}&limit=${pageLimit}`;
      }
      const res = await axiosPublic.get(url);
      return res?.data;
    },
    staleTime: 1000,
  });

  const refreshHandler = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setLimit(10);
  };

  if (isLoading || isPending) return <Loading isLoading={true} />;

  return (
    <div className=" space-y-6 mt-20">
      {/* add dynamic name and tags */}
      <Helmet>
        <title>Manage Asset</title>
        <meta name="description" content="Manage the asset" />
      </Helmet>

      <H2Title baseText={"Manage"} coloredText={"Assets"}></H2Title>
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
          to="/dashboard/add-asset"
          className="inline-flex items-center justify-center px-3 py-2 md:px-4 md:py-[10px] text-xs gap-1 md:text-[12px] lg:text-[15px] font-medium tracking-wide text-white transition duration-300 rounded-lg hover-visible:outline-none whitespace-nowrap bg-[#ff0000] hover:bg-[#C21807] hover:shadow-2xl uppercase hover:cursor-pointer"
        >
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
            allAsset={allAsset}
            isLoading={isLoading}
            isPending={isPending}
            refetch={refetch}
          />
        </table>
      </div>

      <div className=" pb-20 ">
        <div className=" flex justify-between items-center h-16 mt-2 rounded-md ">
          <Pagination
            color="error"
            count={calculateNumberOfPages(
              allAsset?.meta?.total,
              allAsset?.meta?.limit
            )}
            onChange={handlePageChange}
            page={currentPage}
            variant="outlined"
            shape="rounded"
          />
          <div className=" text-end">
            <FormControl
              sx={{ m: 1, minWidth: 100 }}
              color="error"
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
          File Type
        </th>
        <th
          scope="col"
          className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-white bg-[#ff0000]"
        >
          Actual Downloads
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          Downloads
        </th>
        <th scope="col" className={tableHeadingsStyle}>
          Clicked
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

const TableBody = ({ allAsset, refetch }) => {
  // const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const deleteAsset = (id) => {
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
        axiosPublic.delete(`/assets/${id}`).then((res) => {
          if (res.data.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Asset has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <tbody>
      {allAsset &&
        allAsset?.data?.map((asset) => (
          <tr key={asset._id}>
            <td className={tdStyle}>{asset.title}</td>
            <td className={tdStyle}>
              <img src={asset?.url} alt="apple" width={30} loading="lazy" />
            </td>
            <td className={tdStyle}>{asset?.type}</td>
            <td className={tdStyle}>{asset?.finalDownload}</td>
            <td className={tdStyle}>{asset?.download}</td>
            <td className={tdStyle}>{asset?.click}</td>
            <td className={tdStyle}>{asset?.category}</td>
            <td className={tdStyle}>
              <div className="flex items-center justify-around  hover:cursor-pointer">
                <div>
                  <RiEditBoxFill
                    onClick={() =>
                      navigate(`/dashboard/update-asset/${asset?._id}`)
                    }
                    className="text-xl transition-colors duration-300 hover:text-green-400"
                  />
                </div>
                <div onClick={() => deleteAsset(asset?._id)}>
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
  allAsset: PropTypes.any,
  isLoading: PropTypes.bool,
  isPending: PropTypes.bool,
  refetch: PropTypes.func,
};

export default ManageAsset;
