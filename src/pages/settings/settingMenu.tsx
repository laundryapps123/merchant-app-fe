import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "../../context/breadcrumb";
import chevronRight from "../../assets/images/chevron-right.svg";
import { useNavigate } from "react-router-dom";

interface ISettingMenu {
  label: string;
  url: string;
}

const SettingMenu = () => {
  const { setShowTitle } = useContext(BreadcrumbContext);
  const menus: ISettingMenu[] = [
    {
      label: "Akun",
      url: "/settings/account",
    },
    {
      label: "Layanan",
      url: "/settings/service",
    },
    {
      label: "Ketentuan",
      url: "/settings/note",
    },
    {
      label: "Durasi",
      url: "/settings/duration",
    },
    {
      label: "Hubungi Kami",
      url: "/settings/contact-us",
    },
    {
      label: "FAQ",
      url: "/settings/faq",
    },
    {
      label: "Tentang Sistem",
      url: "/settings/about",
    },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    setShowTitle(false);
  }, []);

  return (
    <div>
      {menus.map((menu: ISettingMenu) => (
        <div
          key={menu.label}
          className="px-4 py-3 border-b flex justify-between cursor-pointer"
          onClick={() => navigate(menu.url)}
        >
          <span>{menu.label}</span>
          <img src={chevronRight} alt="go" />
        </div>
      ))}
    </div>
  );
};

export default SettingMenu;
