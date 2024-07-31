import { useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "../../../context/breadcrumb";
import { Input } from "../../../components/ui/input";
import trashIcon from "../../../assets/images/trash-border.svg";
import addIcon from "../../../assets/images/plus-basic.svg";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "../../../components/ui/deleteDialog";

interface IDuration {
  id: number;
  name: string;
  duration: string;
}

const SettingDuration = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const navigate = useNavigate();
  const dummyDuration: IDuration[] = [
    {
      id: 1,
      name: "Test",
      duration: "10 Hari",
    },
  ];
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  useEffect(() => {
    setShowTitle(true);
    setTitle("Durasi");
    setShowBackIcon(true);
    setPrevPath("settings");
  }, []);

  const createDuration = () => {
    navigate("create");
  };

  const detailDuration = (id: number) => {
    // navigate(`/settings/duration/${id}`);
  };
  return (
    <>
      <div className="mx-4 h-screen">
        <Input className="mb-4" placeholder="Pencarian" type="text" />

        {dummyDuration.map((duration: IDuration) => (
          <div
            className="flex justify-between py-3 px-2 border rounded-sm cursor-pointer"
            key={duration.id}
            onClick={() => detailDuration(duration.id)}
          >
            <div className="">
              <p className="font-bold">{duration.name}</p>
              <p className="text-[10px]">{duration.duration}</p>
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
          onClick={createDuration}
        />
      </div>

      <DeleteDialog
        visible={showDeleteDialog}
        message="Hapus Durasi?"
        setVisible={setShowDeleteDialog}
      />
    </>
  );
};

export default SettingDuration;
