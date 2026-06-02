import { useEffect, useMemo, useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AppointmentPage } from "./pages/AppointmentPage";
import { DoctorPage } from "./pages/DoctorPage";
import { DoctorsPage } from "./pages/DoctorsPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ServicePage } from "./pages/ServicePage";
import { ServicesPage } from "./pages/ServicesPage";

const normalizeHash = () => {
  const value = window.location.hash.replace(/^#/, "");
  return value.startsWith("/") ? value : "/";
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(normalizeHash());

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPath(normalizeHash());
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("hashchange", onHashChange);
    if (!window.location.hash) {
      window.location.hash = "/";
    }

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const page = useMemo(() => {
    const [path] = currentPath.split("?");
    const parts = path.split("/").filter(Boolean);

    if (path === "/") return <HomePage />;
    if (path === "/services") return <ServicesPage />;
    if (parts[0] === "services" && parts[1]) return <ServicePage slug={parts[1]} />;
    if (path === "/doctors") return <DoctorsPage />;
    if (parts[0] === "doctors" && parts[1]) return <DoctorPage slug={parts[1]} />;
    if (path === "/appointment") return <AppointmentPage />;

    return <NotFoundPage />;
  }, [currentPath]);

  return (
    <div className="app-shell">
      <Header currentPath={currentPath} />
      <main>{page}</main>
      <Footer />
    </div>
  );
}
