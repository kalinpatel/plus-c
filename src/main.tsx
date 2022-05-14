import "@/brand/normalize.css";
import "@/brand/style.css";
import "katex/dist/katex.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import smoothScroll from "smoothscroll-polyfill";
import { registerSW } from "virtual:pwa-register";
import App from "./app";

smoothScroll.polyfill();

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
      toast("You can now use this app offline.", {
        icon: "🤖",
        duration: 5000,
      });
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
