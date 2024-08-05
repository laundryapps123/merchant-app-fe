import { useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "../../../context/breadcrumb";
import { Input } from "../../../components/ui/input";
import trashIcon from "../../../assets/images/trash-border.svg";
import addIcon from "../../../assets/images/plus-basic.svg";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "../../../components/ui/deleteDialog";
import axios from "axios";

interface IDuration {
  created_at: string;
  duration: number;
  id: string;
  name: string;
  type: string;
}

const SettingDuration = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [durations, setDurations] = useState<IDuration[]>([]);

  useEffect(() => {
    setShowTitle(true);
    setTitle("Durasi");
    setShowBackIcon(true);
    setPrevPath("settings");
    populateData();
  }, []);

  const createDuration = () => {
    navigate("create");
  };

  const detailDuration = (id: string) => {
    if (showDeleteDialog) {
      navigate(`/settings/duration/${id}`);
    }
  };

  const populateData = () => {
    const url: string = `${import.meta.env.VITE_API_URL}/duration`;
    axios.get(url).then((response: any) => {
      setDurations(response);
    });
  };

  const openDeleteDialog = () => {
    setShowDeleteDialog(true);
    console.log("click", showDeleteDialog);
  };

  return (
    <>
      <div className="mx-4 h-screen">
        <div className="bg-white sticky top-[115px] pb-4">
          <Input placeholder="Pencarian" type="text" />
        </div>

        {durations.map((duration: IDuration) => (
          <div
            className="flex justify-between py-3 px-2 border rounded-sm cursor-pointer z-10 mb-2"
            key={duration.id}
            onClick={() => detailDuration(duration.id)}
          >
            <div className="">
              <p className="font-bold">{duration.name}</p>
              <p className="text-[10px]">
                {duration.duration} {duration.type}
              </p>
            </div>
            <img
              className="cursor-pointer w-[1.438rem] z-50"
              src={trashIcon}
              alt="trash"
              onClick={openDeleteDialog}
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
