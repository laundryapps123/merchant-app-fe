import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "../../context/breadcrumb";
import { Input } from "../../components/ui/input";
import trashIcon from "../../assets/images/trash-border.svg";
import addIcon from "../../assets/images/plus-basic.svg";

const SettingDuration = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);

  useEffect(() => {
    setShowTitle(true);
    setTitle("Durasi");
    setShowBackIcon(true);
    setPrevPath("settings");
  }, []);

  return (
    <div className="mx-4 h-screen">
      <Input className="mb-4" placeholder="Pencarian" type="text" />

      <div className="flex justify-between py-3 px-2 border rounded-sm">
        <span className="font-bold">Test</span>
        <img
          className="cursor-pointer w-[1.438rem]"
          src={trashIcon}
          alt="trash"
        />
      </div>

      <img
        className="fixed bottom-[6rem] right-6 sm:right-[13rem] lg:right-[13rem]  cursor-pointer"
        src={addIcon}
        alt=""
      />
    </div>
  );
};

export default SettingDuration;
