import { useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "../../../context/breadcrumb";
import { Input } from "../../../components/ui/input";
import trashIcon from "../../../assets/images/trash-border.svg";
import addIcon from "../../../assets/images/plus-basic.svg";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "../../../components/ui/deleteDialog";
import axios from "axios";

interface ISerivice {
  id: string;
  name: string;
}

const SettingService = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const navigate = useNavigate();
  const [services, setServices] = useState<ISerivice[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  useEffect(() => {
    setShowTitle(true);
    setTitle("Layanan");
    setShowBackIcon(true);
    setPrevPath("settings");
    populateData();
  }, []);

  const createService = () => {
    navigate("create");
  };

  const detailService = (id: string) => {
    navigate(`/settings/service/${id}`);
  };

  const populateData = () => {
    const url: string = `${import.meta.env.VITE_API_URL}/service`;
    axios.get(url).then((response: any) => setServices(response));
  };

  return (
    <>
      <div className="mx-4 h-screen">
        <div className="bg-white sticky top-[115px] pb-4">
          <Input placeholder="Pencarian" type="text" />
        </div>

        {services.map((duration: ISerivice) => (
          <div
            className="flex justify-between py-3 px-2 border rounded-sm cursor-pointer mb-2"
            key={duration.id}
            onClick={() => detailService(duration.id)}
          >
            <div className="">
              <p className="font-bold">{duration.name}</p>
            </div>
            <img
              className="cursor-pointer w-[1.438rem]"
              src={trashIcon}
              alt="trash"
              onClick={() => setShowDeleteDialog(true)}
            />
          </div>
        ))}
      </div>

      <div className="w-full sm:w-[480px] px-4 fixed flex justify-end bottom-[6rem]">
        <img
          className="cursor-pointer"
          src={addIcon}
          alt=""
          onClick={createService}
        />
      </div>

      <DeleteDialog
        visible={showDeleteDialog}
        message="Hapus Layanan?"
        setVisible={setShowDeleteDialog}
      />
    </>
  );
};

export default SettingService;
