import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "../context/breadcrumb";
import { Input } from "../components/ui/input";
import OngoingOrderCard from "../components/ui/ongoingOrderCard";

const OngoingOrder = () => {
  const { setTitle, setShowBackIcon } = useContext(BreadcrumbContext);
  const dummyData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  useEffect(() => {
    setTitle("Cucian Yang Sedang Diproses");
    setShowBackIcon(false);
  }, []);
  return (
    <div>
      {/* make it fixed top */}
      <Input className="mb-5" placeholder="Pencarian No Nota & Nama..." />

      {dummyData.map(() => (
        <div className="mb-2">
          <OngoingOrderCard />
        </div>
      ))}
    </div>
  );
};

export default OngoingOrder;
