import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/layout.tsx";
import { BreadcrumbProvider } from "./context/breadcrumb.tsx";
import OngoingOrder from "./pages/ongoingOrder.tsx";
import SettingMenu from "./pages/settings/settingMenu.tsx";
import SettingAccount from "./pages/settings/settingAccount.tsx";
import SettingPassword from "./pages/settings/settingPassword.tsx";
import SettingNote from "./pages/settings/settingNote.tsx";
import SettingAbout from "./pages/settings/settingAbout.tsx";
import SettingFaq from "./pages/settings/settingFaq.tsx";
import SettingContactUs from "./pages/settings/settingContactUs.tsx";
import SettingDuration from "./pages/settings/setting-duration/settingDuration.tsx";
import SettingDurationForm from "./pages/settings/setting-duration/settingDurationForm.tsx";
import SettingService from "./pages/settings/setting-service/settingService.tsx";
import SettingServiceForm from "./pages/settings/setting-service/settingServiceForm.tsx";
import axios from "axios";

const router = createBrowserRouter([
  {
    element: (
      <BreadcrumbProvider>
        <Layout />
      </BreadcrumbProvider>
    ),
    children: [
      {
        path: "/",
        element: <OngoingOrder />,
      },
      {
        path: "/settings",
        children: [
          {
            path: "",
            element: <SettingMenu />,
          },
          {
            path: "account",
            element: <SettingAccount />,
          },
          {
            path: "password",
            element: <SettingPassword />,
          },
          {
            path: "service",
            children: [
              {
                path: "",
                element: <SettingService />,
              },
              {
                path: "create",
                element: <SettingServiceForm />,
              },
              {
                path: ":id",
                element: <SettingServiceForm />,
              },
            ],
          },
          {
            path: "note",
            element: <SettingNote />,
          },
          {
            path: "duration",
            children: [
              {
                path: "",
                element: <SettingDuration />,
              },
              {
                path: "create",
                element: <SettingDurationForm />,
              },
              {
                path: ":id",
                element: <SettingDurationForm />,
              },
            ],
          },
          {
            path: "contact-us",
            element: <SettingContactUs />,
          },
          {
            path: "faq",
            element: <SettingFaq />,
          },
          {
            path: "about",
            element: <SettingAbout />,
          },
        ],
      },
    ],
  },
]);

axios.interceptors.response.use((response: any) => {
  return response.data;
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <BreadcrumbProvider> */}
    <RouterProvider router={router} />
    {/* </BreadcrumbProvider> */}
  </React.StrictMode>
);
