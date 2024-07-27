import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "../../context/breadcrumb";
import { Input } from "../../components/ui/input";

const SettingPassword = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);

  useEffect(() => {
    setShowTitle(true);
    setTitle("Ubah Password");
    setShowBackIcon(true);
    setPrevPath("/settings/account");
  }, []);

  return (
    <div className="mx-4">
      <div className="mb-2">
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </div>

      <div className="mb-2">
        <label htmlFor="new-password">Password Baru</label>
        <Input id="new-password" type="password" />
      </div>

      <div className="mb-2">
        <label htmlFor="re-new-password">Ulang Password Baru</label>
        <Input id="re-new-passwors" type="password" />
      </div>
    </div>
  );
};

export default SettingPassword;
