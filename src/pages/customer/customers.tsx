import { useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "../../context/breadcrumb";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import trashIcon from "../../assets/images/trash-border.svg";
import addIcon from "../../assets/images/add-customer.svg";
import menAccount from "../../assets/images/men-account.svg";
import womenAccount from "../../assets/images/women-account.svg";
import { DeleteDialog } from "../../components/ui/deleteDialog";
import axios from "axios";

type Gender = "Laki-laki" | "Perempuan";

interface ICustomer {
  address: string;
  created_at: string;
  email: string;
  gender: Gender;
  id: string;
  name: string;
  phone_number: string;
}

const Customers = () => {
  const { setTitle, setShowBackIcon, setPrevPath, setShowTitle } =
    useContext(BreadcrumbContext);
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    setShowTitle(false);
    populateData();
  }, []);

  // useEffect(() => {
  //   populateData();
  // }, [data]);

  const createDuration = () => {
    navigate("create");
  };

  const detailCustomer = (id: string) => {
    navigate(`${id}`);
    if (showDeleteDialog) {
    }
  };

  const populateData = () => {
    const url: string = `${import.meta.env.VITE_API_URL}/customer`;
    axios.get(url).then((res: any) => setCustomers(res));
  };

  const openDeleteDialog = () => {
    setShowDeleteDialog(true);
  };

  return (
    <>
      <div className="mx-4 h-screen">
        <div className="bg-white sticky top-[65px] pb-4 mb-4">
          <Input placeholder="Pencarian" type="text" />
        </div>

        {customers.map((customer: ICustomer) => (
          <div
            className="flex justify-between py-3 px-2 border rounded-sm cursor-pointer z-10 mb-2"
            key={customer.id}
            onClick={() => detailCustomer(customer.id)}
          >
            <div className="flex gap-2">
              <img
                src={
                  customer.gender === "Laki-laki" ? menAccount : womenAccount
                }
                alt=""
              />

              <div className="">
                <p className="font-bold">{customer.name}</p>
                <p className="text-[10px]">{customer.phone_number}</p>
              </div>
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

export default Customers;
