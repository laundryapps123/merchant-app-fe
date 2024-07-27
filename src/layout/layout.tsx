import ongoing from "../assets/images/ongoing-order.svg";
import orders from "../assets/images/orders.svg";
import order from "../assets/images/order.svg";
import customer from "../assets/images/customer.svg";
import settings from "../assets/images/settings.svg";
import ongoingActive from "../assets/images/ongoing-order-active.svg";
import ordersActive from "../assets/images/orders-active.svg";
import customerActive from "../assets/images/customer-active.svg";
import settingsActive from "../assets/images/settings-active.svg";
import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BreadcrumbContext } from "../context/breadcrumb";
import backIcon from "../assets/images/back.svg";

const Layout = () => {
  const [activeMenu, setActiveMenu] = useState("ongoing");
  const navigate = useNavigate();
  const { title, showBackIcon, showTitle, prevPath } =
    useContext(BreadcrumbContext);

  const handleClickMenu = (menu: string) => {
    setActiveMenu(menu);
    navigate(menu);
  };

  return (
    <div className="bg-white w-[100vw] sm:w-[480px] h-[100vh] mx-auto my-0 relative">
      <div className="fixed top-0 bg-white w-[100vw] sm:w-[480px]">
        <div className="flex border-b-[1px] py-3 px-4 relative drop-shadow">
          <div className="absolute left-4">LOGO</div>
          <h1 className="text-center m-auto font-bold">Laundry Jaya</h1>
        </div>

        {showTitle && (
          <div className="border-b-[1px] border-custom-gray px-4 py-3 flex gap-2">
            {showBackIcon && (
              <img
                className="cursor-pointer"
                src={backIcon}
                onClick={() => navigate(prevPath)}
              />
            )}
            <span className="font-bold">{title}</span>
          </div>
        )}
      </div>

      <main
        className={`${showTitle ? "mt-[7.188rem]" : "mt-[3.125rem]"} pb-20`}
      >
        <Outlet />
      </main>

      <div className="border-t-[1px] border-custom-gray fixed bottom-0 py-3 px-4 rounded-lg flex justify-between bg-white w-[100vw] sm:w-[480px]">
        <div
          className="cursor-pointer"
          onClick={() => handleClickMenu("ongoing")}
        >
          <img
            className="mx-auto"
            src={activeMenu === "ongoing" ? ongoingActive : ongoing}
            alt="ongoing"
          />
          <label htmlFor="" className="text-xs">
            Diproses
          </label>
        </div>

        <div
          className="cursor-pointer"
          onClick={() => handleClickMenu("orders")}
        >
          <img
            className="mx-auto"
            src={activeMenu === "orders" ? ordersActive : orders}
            alt=""
          />
          <label htmlFor="" className="text-xs">
            Transaksi
          </label>
        </div>

        <div
          className="mt-[-1.563rem] cursor-pointer"
          onClick={() => handleClickMenu("order")}
        >
          <div className="bg-water-3 rounded-[50%] w-9 h-9 flex mx-auto">
            <img className="m-auto" src={order} alt="" />
          </div>
          <label htmlFor="" className="text-xs">
            Buat Baru
          </label>
        </div>

        <div
          className="cursor-pointer"
          onClick={() => handleClickMenu("customer")}
        >
          <img
            className="mx-auto"
            src={activeMenu === "customer" ? customerActive : customer}
            alt=""
          />
          <label htmlFor="" className="text-xs">
            Pelanggan
          </label>
        </div>

        <div
          className="cursor-pointer"
          onClick={() => handleClickMenu("settings")}
        >
          <img
            className="mx-auto"
            src={activeMenu === "settings" ? settingsActive : settings}
            alt=""
          />
          <label htmlFor="" className="text-xs">
            Pengaturan
          </label>
        </div>
      </div>
    </div>
  );
};

export default Layout;
