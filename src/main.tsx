import "@/brand/normalize.css";
import "@/brand/style.css";
import { firebaseApp } from "@/firebase";
import App from "app";
import { getPerformance, trace } from "firebase/performance";
import "katex/dist/katex.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import smoothScroll from "smoothscroll-polyfill";
import { registerSW } from "virtual:pwa-register";
import { getCLS, getFID, getLCP, getTTFB } from "web-vitals";

const performance = getPerformance(firebaseApp);

smoothScroll.polyfill();

function combineElementWithIdAndClass(element: any) {
  const idName = element.id ? `#${element.id}` : "";
  const className = element.className
    ? `.${element.className.split(" ").join(".")}`
    : "";
  return `${element.tagName.toLowerCase()}${idName}${className}`;
}

function extractElementNames(sources: any) {
  if (Array.isArray(sources)) {
    return sources
      .map((source) => combineElementWithIdAndClass(source.node))
      .filter(Boolean)
      .join(", ");
  }
  return combineElementWithIdAndClass(sources);
}

function sendToFirebase({
  name,
  delta,
  entries,
}: {
  name: string;
  delta: number;
  entries: any;
}) {
  const metricNameMap = {
    CLS: "Cumulative Layout Shift",
    LCP: "Largest Contentful Paint",
    FID: "First Input Delay",
    TTFB: "Time To First Byte",
  };

  const startTime = Date.now();
  const value = Math.round(name === "CLS" ? delta * 1000 : delta);

  entries.forEach(({ element, target, sources }: any) => {
    const elements = element || target || sources; // LCP, FID, CLS
    const elementName = elements ? extractElementNames(elements) : "";
    const attributes = elementName ? { element: elementName } : {};

    trace(performance, (metricNameMap as any)[name]).record(
      startTime,
      value,
      attributes as any
    );
  });
}

getCLS(sendToFirebase);
getFID(sendToFirebase);
getLCP(sendToFirebase);
getTTFB(sendToFirebase);

if ("serviceWorker" in navigator) {
  // && !/localhost/.test(window.location)) {
  const updateSW = registerSW({
    onNeedRefresh: () => {
      if (
        window.location.pathname !== "/" &&
        !window.location.pathname.includes("/user") &&
        !window.location.pathname.includes("/legal")
      ) {
        if (
          confirm(
            "An update is available. Do you want to refresh?\n\n(Your current equation may be lost)"
          )
        ) {
          updateSW();
        }
      } else {
        updateSW();
      }
    },
    onOfflineReady: () => {
      console.info("SW is ready to go offline");
    },
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster containerStyle={{ fontFamily: "'Inter', sans-serif" }} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
