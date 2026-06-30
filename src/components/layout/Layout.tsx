import { Outlet, useLocation } from "react-router-dom";
import { SiteLogoProvider } from "../../context/SiteLogoContext";
import { CategoriesNavProvider } from "../../context/CategoriesNavContext";
import { ThemeProvider } from "../../context/ThemeContext";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Main = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <main className={`flex-1 ${isHome ? "" : "pt-14 lg:pt-16"}`}>
      <Outlet />
    </main>
  );
};

export const Layout = () => (
  <ThemeProvider>
    <SiteLogoProvider>
      <CategoriesNavProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <Main />
          <Footer />
        </div>
      </CategoriesNavProvider>
    </SiteLogoProvider>
  </ThemeProvider>
);
