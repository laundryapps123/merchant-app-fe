import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "../../context/breadcrumb";

const SettingAbout = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);

  useEffect(() => {
    setShowTitle(true);
    setTitle("Tentang Sistem");
    setShowBackIcon(true);
    setPrevPath("settings");
  }, []);

  return (
    <div className="mx-4">
      <p className="mb-5">
        Sistem Pengelolaan antrian dan juga kasir untuk bisnis Laundry Anda.{" "}
      </p>
      <p className="font-bold">Version : 1.9.0</p>
      <p className="font-bold">Support By : Laundry Jaya</p>
    </div>
  );
};

export default SettingAbout;
