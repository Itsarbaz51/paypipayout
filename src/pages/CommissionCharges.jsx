import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AddCommission from "../components/forms/AddCommission";
import { getUserCommissions } from "../redux/slices/commissionSlice";
import CommissionTable from "../components/tabels/CommissionTable";

const CommissionCharges = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.currentUser);
  const { commissions } = useSelector((state) => state.commission);

  const [chargesData, setChargesData] = useState([]);
  useEffect(() => {
    dispatch(getUserCommissions(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (commissions && Array.isArray(commissions)) {
      setChargesData(commissions);
    }
  }, [commissions]);

  const currentUser = useSelector((state) => state.auth?.currentUser);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Commission & Charges
        </h1>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>

      {/* Form */}
      {currentUser.role === "ADMIN" && (
        <AddCommission
          chargesData={chargesData}
          setChargesData={setChargesData}
        />
      )}

      {/* Table */}
      <CommissionTable
        chargesData={chargesData}
        setChargesData={setChargesData}
      />
    </div>
  );
};

export default CommissionCharges;
