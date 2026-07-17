import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/Home";
import { Services } from "../pages/Services";
import { Projects } from "../pages/Projects";
import { ProjectDetails } from "../pages/ProjectDetails";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { ServiceArea } from "../pages/ServiceArea";
import { NotFound } from "../pages/NotFound";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:categorySlug" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/category/:categorySlug" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="service-areas" element={<ServiceArea />} />
        <Route
          path="service-areas/connecticut"
          element={<Navigate to="/service-areas/pennsylvania" replace />}
        />
        <Route
          path="service-areas/new-jersey"
          element={<Navigate to="/service-areas/pennsylvania" replace />}
        />
        <Route
          path="service-areas/new-jersey/:countySlug"
          element={<Navigate to="/service-areas/pennsylvania" replace />}
        />
        <Route
          path="service-areas/new-york"
          element={<Navigate to="/service-areas/pennsylvania" replace />}
        />
        <Route
          path="service-areas/new-york/:countySlug"
          element={<Navigate to="/service-areas/pennsylvania" replace />}
        />
        <Route path="service-areas/:slug" element={<ServiceArea />} />
        <Route path="service-areas/:slug/:countySlug" element={<ServiceArea />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
