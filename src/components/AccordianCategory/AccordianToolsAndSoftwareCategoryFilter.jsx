import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink, useNavigate } from "react-router-dom";
// import useCategory from "../../Hooks/useCategory";
import { RxCross2 } from "react-icons/rx";
import useToolsAndSoftwareCategory from "../../Hooks/useToolsAndSoftware";

const capitalizeFirstLetter = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const formatTextWithSpaces = (text) => {
  if (!text) return "";
  return text.replace(/-/g, " ");
};

const AccordianToolsAndSoftwareCategoryFilter = () => {
  const {
    category: selectedCategory,
    subCategory: selectedSubCategory,
    urlSearchTerm,
    setSelectedCategoryLink,
    setSelectedSubCategory,
  } = useToolsAndSoftwareCategory();

  const formattedCategory = formatTextWithSpaces(
    capitalizeFirstLetter(selectedCategory)
  );
  const formattedSubCategory = formatTextWithSpaces(
    capitalizeFirstLetter(selectedSubCategory)
  );

  return (
    <div>
      <Accordion elevation={0} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className={`${
            "All" === selectedCategory
              ? "bg-[#ff0000] text-white border-none"
              : ""
          }  border p-1 rounded-md text-sm lg:text-base `}
        >
          Filter
        </AccordionSummary>

        {/* category filter  */}
        <div className="flex ml-5 flex-row flex-wrap gap-[5px]">
          <NavLink
            className={`bg-[#ff0000]  text-white border-none border p-${
              selectedCategory === "All" ? "0" : "1"
            } rounded-md text-sm flex flex-row justify-between items-center gap-1`}
            to={`/category-tools-and-software?category=tools-and-softwares&searchValue=${
              urlSearchTerm ? urlSearchTerm : ""
            }`}
          >
            {selectedCategory === "All" ? "" : formattedCategory}

            <button
              onClick={() =>
                setSelectedCategoryLink(
                  "/category-tools-and-software?category=tools-and-softwares"
                )
              }
              className=" text-black "
            >
              {selectedCategory === "All" ? (
                ""
              ) : (
                <div
                  onClick={() =>
                    setSelectedCategoryLink(
                      "/category-tools-and-software?category=All"
                    )
                  }
                >
                  <span
                    onClick={() =>
                      setSelectedCategoryLink(
                        "/category-tools-and-software?category=tools-and-softwares"
                      )
                    }
                  >
                    <RxCross2 className=" text-red-500 bg-white rounded-full text-md p-[1px]" />
                  </span>
                </div>
              )}
            </button>
          </NavLink>

          {/* sub category filter  */}
          <NavLink
            className={`bg-[#ff0000] text-white border-none rounded-md text-sm flex flex-row justify-between items-center gap-1 p-${
              formattedSubCategory ? "1" : "0"
            }`}
            to={`/category-tools-and-software?category=tools-and-softwares&subCategory=${
              selectedSubCategory ? "" : ""
            }&searchValue=${urlSearchTerm ? urlSearchTerm : ""}`}
          >
            {/* {selectedSubCategory ? selectedSubCategory : "Apply Sub Category"} */}
            {formattedSubCategory}

            <button
              onClick={() => setSelectedSubCategory("")}
              className={` text-black my-auto p-${
                formattedSubCategory ? "1" : "0"
              }`}
            >
              {selectedSubCategory ? (
                <RxCross2 className=" text-red-500 bg-white rounded-full text-md p-[1px]" />
              ) : (
                ""
              )}
            </button>
          </NavLink>
        </div>
      </Accordion>
    </div>
  );
};

export default AccordianToolsAndSoftwareCategoryFilter;
