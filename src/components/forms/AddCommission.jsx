import { useState } from "react";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addCommission } from "../../redux/slices/commissionSlice";

const roles = ["STATE_HOLDER", "MASTER_DISTRIBUTOR", "DISTRIBUTOR", "AGENT"];
const services = ["NEFT", "IMPS"];
const types = ["FIXED", "PERCENT"];

const AddCommission = ({ chargesData, setChargesData }) => {
  const dispatch = useDispatch();

  const [newSlab, setNewSlab] = useState({
    from: "",
    to: "",
    value: "",
    type: "FIXED",
    role: "",
    service: "NEFT",
  });

  const handleAddSlab = async () => {
    if (
      newSlab.from === "" ||
      newSlab.to === "" ||
      newSlab.value === "" ||
      !newSlab.role ||
      !newSlab.service ||
      !newSlab.type
    ) {
      alert("Please fill all fields and select role/service/type");
      return;
    }

    const exists = chargesData.some(
      (s) =>
        s.role === newSlab.role &&
        s.service === newSlab.service &&
        Number(s.from) === Number(newSlab.from) &&
        Number(s.to) === Number(newSlab.to)
    );
    if (exists) {
      alert("This exact slab already exists for selected role and service");
      return;
    }

    try {
      const result = await dispatch(
        addCommission({
          role: newSlab.role,
          service: newSlab.service,
          from: Number(newSlab.from),
          to: Number(newSlab.to),
          value: Number(newSlab.value),
          type: newSlab.type,
        })
      );

      const created =
        result?.payload?.data || result?.payload || result?.data || null;

      if (created && created.id) {
        setChargesData((prev) => [...prev, created]);
      }
    } catch (err) {
      console.error("Add commission failed", err);
      alert(err?.message || "Failed to add slab");
    }

    setNewSlab({
      from: "",
      to: "",
      value: "",
      type: "FIXED",
      role: "",
      service: "NEFT",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-6 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Slab</h3>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <input
          type="number"
          placeholder="From"
          value={newSlab.from}
          onChange={(e) => setNewSlab({ ...newSlab, from: e.target.value })}
          className="px-3 py-2 border rounded-md"
        />

        <input
          type="number"
          placeholder="To"
          value={newSlab.to}
          onChange={(e) => setNewSlab({ ...newSlab, to: e.target.value })}
          className="px-3 py-2 border rounded-md"
        />

        <input
          type="number"
          placeholder="Value"
          value={newSlab.value}
          onChange={(e) => setNewSlab({ ...newSlab, value: e.target.value })}
          className="px-3 py-2 border rounded-md"
        />

        <select
          value={newSlab.type}
          onChange={(e) => setNewSlab({ ...newSlab, type: e.target.value })}
          className="px-3 py-2 border rounded-md"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={newSlab.service}
          onChange={(e) => setNewSlab({ ...newSlab, service: e.target.value })}
          className="px-3 py-2 border rounded-md"
        >
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={newSlab.role}
          onChange={(e) => setNewSlab({ ...newSlab, role: e.target.value })}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">Select Role</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddSlab}
          className="col-span-1 md:col-span-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-1" /> Add
        </button>
      </div>
    </div>
  );
};

export default AddCommission;
