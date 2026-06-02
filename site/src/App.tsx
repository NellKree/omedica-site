import { useEffect, useLayoutEffect, useMemo, useState } from "react";
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

const scrollToPageTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

const scheduleScrollToPageTop = () => {
  scrollToPageTop();

  const frame = window.requestAnimationFrame(scrollToPageTop);
  const timeout = window.setTimeout(scrollToPageTop, 120);

  return () => {
    window.cancelAnimationFrame(frame);
    window.clearTimeout(timeout);
  };
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(normalizeHash());

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const syncPath = () => {
      setCurrentPath(normalizeHash());
    };

    const navigateTo = (href: string, replace = false) => {
      const path = href.replace(/^#/, "");
      const normalizedPath = path.startsWith("/") ? path : "/";
      const nextHash = `#${normalizedPath}`;

      if (replace) {
        window.history.replaceState(null, "", nextHash);
      } else if (window.location.hash !== nextHash) {
        window.history.pushState(null, "", nextHash);
      }

      setCurrentPath(normalizedPath);
      scheduleScrollToPageTop();
    };

    const onDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>('a[href^="#/"]');
      const href = link?.getAttribute("href");

      if (!link || !href || link.target) {
        return;
      }

      event.preventDefault();
      navigateTo(href);
    };

    window.addEventListener("hashchange", syncPath);
    window.addEventListener("popstate", syncPath);
    document.addEventListener("click", onDocumentClick);

    if (!window.location.hash) {
      navigateTo("#/", true);
    }

    return () => {
      window.removeEventListener("hashchange", syncPath);
      window.removeEventListener("popstate", syncPath);
      document.removeEventListener("click", onDocumentClick);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    return scheduleScrollToPageTop();
  }, [currentPath]);

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
