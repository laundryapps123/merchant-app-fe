import btnChecklist from "../../assets/images/btn-checklist.svg";

const OngoingOrderCard = () => {
  return (
    <div className="border rounded-sm ">
      <div className="flex justify-between px-4 py-2">
        <span className="font-bold">INV-23278372326</span>
        <img src={btnChecklist} alt="btnChecklist" className="cursor-pointer" />
      </div>
      <div className="bg-gray-2 px-4 py-2">
        <p className="text-sm font-thin">Arif Ramadhan</p>
        <p className="text-sm text-watermelon-2">Sudah Dibayar</p>
      </div>
    </div>
  );
};

export default OngoingOrderCard;
