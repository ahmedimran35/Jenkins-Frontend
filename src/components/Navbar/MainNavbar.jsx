import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import brandLogoalpha from "/BrandLogoalpha.svg";
import useCategory from "../../Hooks/useCategory";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SignInButton from "../buttons/SignInButton/SignInButton";
import useResponsiveness from "../../Hooks/useResponsiveness";

const MainNavbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { allCategory, setSelectedCategoryLink } = useCategory();
  const { isLaptopView, isDesktopView } = useResponsiveness();

  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {} } = useQuery({
    enabled: !!user?.email,
    queryKey: [user?.email, "userInfo"],
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure.get(`/user/${user?.email}`);
        return res?.data;
      }
    },
    staleTime: 100000, // Refetch data after 10 minute of inactivity
  });

  const handleLogout = () => {
    logOut();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div className="max-w-[750px] md:max-w-7xl mx-auto flex flex-row items-center justify-between mt-4 text-black font-medium px-2">
      <AppBar position="static" border="none" elevation={0} color="transparent">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            className={`flex-grow ${isLaptopView ? "flex-grow-0" : ""} ${
              isDesktopView ? "flex-grow-0" : ""
            } hover:cursor-pointer`}
          >
            <img
              src={brandLogoalpha}
              className={`w-64 ${isLaptopView ? "w-[210px]" : ""} ${
                isDesktopView ? "w-[260px]" : ""
              }`}
              alt=""
            />
          </Link>

          {/* mobile view */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none", color: "black" },
              }}
            >
              {allCategory?.map((categorySingle) => (
                <MenuItem
                  key={categorySingle?.CategoryName}
                  onClick={handleCloseNavMenu}
                >
                  <Link
                    to={`/category-data?category=${categorySingle?.categoryLink}`}
                  >
                    {categorySingle?.CategoryName}
                  </Link>
                </MenuItem>
              ))}

              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to={`/category-tools-and-software?category=tools-and-softwares&searchValue=`}
                >
                  Tools & Software
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          {/* desktop view */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "row",
              justifyContent: "center",
              gap: isLaptopView ? "1px" : isDesktopView ? "10px" : "",
              margin: isLaptopView
                ? "10px 0px  0px 0px"
                : isDesktopView
                ? "10px 0px  0px 0px"
                : "",
            }}
          >
            {allCategory.map((categorySingle) => (
              <Link
                onClick={() => setSelectedCategoryLink(categorySingle)}
                key={categorySingle?.CategoryName}
                to={`/category-data?category=${categorySingle?.categoryLink}`}
              >
                {" "}
                <Button
                disableRipple
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    fontWeight: 300,
                    fontSize: isLaptopView
                      ? "10px"
                      : isDesktopView
                      ? "12px"
                      : "",
                    "&:hover": {
                      color: "red",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  {categorySingle?.CategoryName}
                </Button>
              </Link>
            ))}
            <Link
              to={`/category-tools-and-software?category=tools-and-softwares&searchValue=`}
            >
              {" "}
              <Button
                onClick={handleCloseNavMenu}
                disableRipple
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontWeight: 300,
                  fontSize: isLaptopView ? "10px" : isDesktopView ? "12px" : "",
                  "&:hover": {
                    color: "red",
                    bgcolor: "transparent",
                  },
                }}
              >
                Tools & Software
              </Button>
            </Link>
          </Box>
          <Box>
            <div className="hidden lg:contents">
              {user && user ? (
                <div className="flex gap-1">
                  {user && userInfo?.data?.role === "admin" && (
                    <Link
                      to="/dashboard/analytics"
                      className="hover:bg-[#ff0000] rounded-md p-1 transition-colors duration-300 text-[#ff0000] hover:text-white"
                    >
                      <AiOutlineUser className="md:text-xl lg:text-3xl" />
                    </Link>
                  )}
                  {user && userInfo?.data?.role === "seo" && (
                    <Link
                      to="/dashboard/manage-asset"
                      className="hover:bg-[#ff0000] rounded-md p-1 transition-colors duration-300 text-[#ff0000] hover:text-white"
                    >
                      <AiOutlineUser className="md:text-xl lg:text-3xl" />
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className={`inline-flex items-center justify-center gap-2 text-sm tracking-wide text-white transition-colors duration-300 md:px-[5px] md:py-1 lg:px-6 lg:py-2 hover-visible:outline-none whitespace-nowrap bg-[#ff0000] hover:bg-[#C21807] hover:shadow-2xl rounded-md font-medium`}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <SignInButton />
              )}
            </div>
          </Box>
          <div className="contents lg:hidden">
            {user && user ? (
              <div className="flex gap-1">
                {user && userInfo?.data?.role === "admin" && (
                  <Link
                    to="/dashboard/analytics"
                    className="hover:bg-[#ff0000] rounded-md p-1 transition-colors duration-300 text-[#ff0000] hover:text-white"
                  >
                    <AiOutlineUser className="text-3xl" />
                  </Link>
                )}
                {user && userInfo?.data?.role === "seo" && (
                  <Link
                    to="/dashboard/manage-asset"
                    className="hover:bg-[#ff0000] rounded-md p-1 transition-colors duration-300 text-[#ff0000] hover:text-white"
                  >
                    <AiOutlineUser className="text-3xl" />
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className={`inline-flex items-center justify-center gap-2 text-xs tracking-wide text-white transition-colors duration-300 px-3 py-1 hover-visible:outline-none whitespace-nowrap bg-[#ff0000] hover:bg-[#C21807] hover:shadow-2xl rounded-md font-medium`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <SignInButton />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default MainNavbar;
