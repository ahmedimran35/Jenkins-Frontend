import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

export const CategoryContext = createContext();
const CategoryProvider = ({ children }) => {
  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategoryLink, setSelectedCategoryLink] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setLimit] = useState(30);
  const queryParams = new URLSearchParams(location.search);

  const category = queryParams.get("category");
  const subCategory = queryParams.get("subCategory");
  const urlSearchTerm = queryParams.get("searchTerm");
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    fetch("/categoryList.json").then((res) =>
      res.json().then((data) => setAllCategory(data))
    );
  }, []);

  const {
    data: categoryBasedDatas = [],
    isLoading: isCategoryLoading,
    isFetching: isCategoryFetching,
  } = useQuery({
    queryKey: [
      "all-assets",
      category,
      subCategory,
      searchTerm,
      pageLimit,
      currentPage,
    ],
    queryFn: async () => {
      let url = "";

      if (category === "All" && searchTerm === "") {
        url = `/assets/by-user?page=${currentPage}&limit=${pageLimit}`;
      } else if (category === "All" && searchTerm !== "") {
        url = `/assets/by-user?searchTerm=${urlSearchTerm}&page=${currentPage}&limit=${pageLimit}`;
      } else {
        if (subCategory) {
          url = `/assets/by-user?category=${category}&subCategory=${subCategory}&page=${currentPage}&limit=${pageLimit}`;
        } else {
          url = `/assets/by-user?category=${category}&page=${currentPage}&limit=${pageLimit}`;
        }
        // Optionally add search term even with subcategory
        if (searchTerm !== "") {
          url += `&searchTerm=${urlSearchTerm}`;
        }
      }

      const res = await axiosPublic.get(url);

      return res?.data;
    },
    // Configure caching behavior
    staleTime: 100000, // Refetch data after 10 minute of inactivity
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
    <CategoryContext.Provider value={categoryInfo}>
      {children}
    </CategoryContext.Provider>
  );
};

CategoryProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CategoryProvider;
