import { useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "../../../context/breadcrumb";
import { Input } from "../../../components/ui/input";
import trashIcon from "../../../assets/images/trash-border.svg";
import addIcon from "../../../assets/images/plus-basic.svg";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "../../../components/ui/deleteDialog";

interface ISerivice {
  id: number;
  name: string;
}

const SettingService = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const navigate = useNavigate();
  const dummyService: ISerivice[] = [
    {
      id: 1,
      name: "Test",
    },
  ];
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  useEffect(() => {
    setShowTitle(true);
    setTitle("Layanan");
    setShowBackIcon(true);
    setPrevPath("settings");
  }, []);

  const createService = () => {
    navigate("create");
  };

  const detailService = (id: number) => {
    // navigate(`/settings/duration/${id}`);
  };

  return (
    <>
      <div className="mx-4 h-screen">
        <Input className="mb-4" placeholder="Pencarian" type="text" />

        {dummyService.map((duration: ISerivice) => (
          <div
            className="flex justify-between py-3 px-2 border rounded-sm cursor-pointer"
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
