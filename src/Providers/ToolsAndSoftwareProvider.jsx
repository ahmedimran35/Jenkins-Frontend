import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export const CategoryToolsAndSoftwareContext = createContext();
const ToolsAndSoftwareCategoryProvider = ({ children }) => {
  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategoryLink, setSelectedCategoryLink] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const subCategory = queryParams.get("subCategory");
  const urlSearchTerm = queryParams.get("searchValue");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setLimit] = useState(30);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    fetch("/toolsAndSoftware.json").then((res) =>
      res.json().then((data) => setAllCategory(data))
    );
  }, []);

  const {
    data: categoryBasedDatas = [],
    isLoading: isCategoryLoading,
    isFetching: isCategoryFetching,
  } = useQuery({
    queryKey: [
      "tools-and-software",
      subCategory,
      urlSearchTerm,
      pageLimit,
      currentPage,
    ],
    queryFn: async () => {
      let url = "";

      /*  if (category === "All" && searchTerm === "") {
        url = `/softwareAndTools`;
      } else if (category === "All" && searchTerm !== "") {
        url = `/softwareAndTools?searchTerm=${urlSearchTerm}`;
      } else {
        if (subCategory) {
          url = `/softwareAndTools?subCategories=${subCategory}`;
        }
        // else {
        //   url = `/assets/all-user?category=${category}`;
        // }
        // Optionally add search term even with subcategory
        if (searchTerm !== "") {
          url += `&searchTerm=${urlSearchTerm}`;
        } else {
          url = "/softwareAndTools";
        }
      } */

      if (urlSearchTerm || subCategory) {
        url = `/softwareAndTools?subCategories=${subCategory}&searchTerm=${searchTerm}&page=${currentPage}&limit=${pageLimit}`;
      } else {
        url = `/softwareAndTools?page=${currentPage}&limit=${pageLimit}`;
      }

      // else
      // {
      //   url = "/softwareAndTools";
      // }

      const res = await axiosPublic.get(url);
      // console.log(res);
      return res?.data?.data;
    },
    // Configure caching behavior
    // staleTime: 600000, // Refetch data after 10 minute of inactivity
    // cacheTime: 6000000, // Remove data from cache after 100 minute (optional)
  });

  const categoryInfo = {
    allCategory,
    selectedCategoryLink,
    setSearchTerm,
    setSelectedCategoryLink,
    setSelectedSubCategory,
    categoryBasedDatas,
    isCategoryLoading,
    isCategoryFetching,
    setSubCategories,
    category,
    subCategory,
    subCategories,
    urlSearchTerm,
    setCurrentPage,
    setLimit,
    pageLimit,
    currentPage,
  };
  return (
    <CategoryToolsAndSoftwareContext.Provider value={categoryInfo}>
      {children}
    </CategoryToolsAndSoftwareContext.Provider>
  );
};

export default ToolsAndSoftwareCategoryProvider;
