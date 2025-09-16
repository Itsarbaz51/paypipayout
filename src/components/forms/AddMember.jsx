import { useState } from "react";
import { registation } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import HeaderSection from "../ui/HeaderSection";
import Title from "../ui/Title";
import ButtonField from "../ui/ButtonField";

export default function AddMemer({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "STATE_HOLDER",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = dispatch(registation(formData));
    setMessage("");
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-between space-y-3.5">
          <Title />

          <span onClick={onClose}>
            <X />
          </span>
        </div>
        {message && (
          <div className="mb-4 text-center text-sm text-red-500">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="STATE_HOLDER">State Holder</option>
            <option value="MASTER_DISTRIBUTOR">Master Distributer</option>
            <option value="DISTRIBUTOR">Distributer</option>
            <option value="AGENT">Agent</option>
          </select>

          <ButtonField
            type="submit"
            isDisabled={loading}
            icon={null} // yaha se koi icon pass nahi kar rahe
            isOpen={null}
            btncss="w-full bg-black/90 text-white py-2 rounded-lg hover:bg-black cursor-pointer transition disabled:bg-gray-400 "
            name={loading ? "Registering..." : "Register"}
          />
        </form>
      </div>
    </div>
  );
}
