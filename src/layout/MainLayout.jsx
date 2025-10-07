import { Outlet } from "react-router";
import { useLocation, matchPath } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import { Box, Container, Toolbar } from "@mui/material";
import { AppDataProvider } from "../context/AppDataProvider";
import { AppSearchProvider } from "../context/AppSearchProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// 🔍 Match current route
function useRouteMatch(patterns) {
  const { pathname } = useLocation();
  return patterns.find((pattern) => matchPath(pattern, pathname));
}

const navItems = [
  { label: "About", path: "/about" },
  { label: "Account", path: "/account" },
];

const MainLayout = () => {
  const routeMatch = useRouteMatch(navItems.map((item) => item.path));
  const currentTab = routeMatch || false;
  const theme = useTheme();

  return (
    <>
      <AppDataProvider>
        <AppSearchProvider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <ToastContainer />
            <Toolbar />

            <Navbar navItems={navItems} />

            <Box component="main" sx={{ flexGrow: 1 }}>
              <Outlet />
            </Box>

            <Box
              component="footer"
              sx={{
                bgcolor: theme.palette.background.footerBg,
                color: "primary.contrastText",
                pt: 1,
                pb: 3,
              }}
            >
              <Container maxWidth="xl">
                <Footer navItems={navItems} currentTab={currentTab} />
              </Container>
            </Box>
          </Box>
        </AppSearchProvider>
      </AppDataProvider>
    </>
  );
};

export default MainLayout;
