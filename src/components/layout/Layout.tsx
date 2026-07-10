import { Outlet, useLocation } from "react-router-dom";
import { SiteLogoProvider } from "../../context/SiteLogoContext";
import { CategoriesNavProvider } from "../../context/CategoriesNavContext";
import { ThemeProvider } from "../../context/ThemeContext";
import { ContactBanner } from "../sections/ContactBanner";
import { ScrollToTop } from "./ScrollToTop";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Main = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const showContactBanner =
    pathname !== "/" &&
    pathname !== "/contact" &&
    !pathname.startsWith("/service-areas");

  return (
    <>
      <main className={`flex-1 ${isHome ? "" : "pt-14 lg:pt-16"}`}>
        <Outlet />
      </main>
      {showContactBanner ? <ContactBanner /> : null}
    </>
  );
};

export const Layout = () => (
  <ThemeProvider>
    <SiteLogoProvider>
      <CategoriesNavProvider>
        <ScrollToTop />
        <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden">
          <Header />
          <Main />
          <Footer />
        </div>
      </CategoriesNavProvider>
    </SiteLogoProvider>
  </ThemeProvider>
);
