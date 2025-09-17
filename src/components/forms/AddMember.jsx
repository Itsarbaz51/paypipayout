import { useState } from "react";
import { registation } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Title from "../ui/Title";
import ButtonField from "../ui/ButtonField";
import CloseBtn from "../ui/CloseBtn";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";

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
    dispatch(registation(formData));
    setMessage("");
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
        <div className="flex justify-between space-y-3.5">
          <Title />

          <CloseBtn isClose={onClose} />
        </div>
        {message && (
          <div className="mb-4 text-center text-sm text-red-500">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 ">
          {/* Full Name */}
          <InputField
            name="name"
            inputType="text"
            placeholderName="Full Name"
            valueData={formData.name}
            handleChange={handleChange}
          />

          {/* Email */}
          <InputField
            name="email"
            inputType="email"
            placeholderName="Email Address"
            valueData={formData.email}
            handleChange={handleChange}
          />

          {/* Phone */}
          <InputField
            name="phone"
            inputType="text"
            placeholderName="Phone Number"
            valueData={formData.phone}
            handleChange={handleChange}
          />

          {/* Password */}
          <InputField
            name="password"
            inputType="password"
            placeholderName="Password"
            valueData={formData.password}
            handleChange={handleChange}
          />

          {/* Role Selection */}
          <SelectField
            name="role"
            label="Role"
            value={formData.role}
            handleChange={handleChange}
            options={[
              { value: "STATE_HOLDER", label: "State Holder" },
              { value: "MASTER_DISTRIBUTOR", label: "Master Distributor" },
              { value: "DISTRIBUTOR", label: "Distributor" },
              { value: "AGENT", label: "Agent" },
            ]}
          />

          {/* Submit Button */}
          <ButtonField
            type="submit"
            isDisabled={loading}
            icon={null}
            isOpen={null}
            btncss="w-full bg-black/90 text-center bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 hover:bg-gradient-to-r hover:from-cyan-600 hover:via-blue-700 hover:to-indigo-900 duration-300 text-white py-2 rounded-lg hover:bg-black cursor-pointer transition disabled:bg-gray-400"
            name={"Submit"}
          />
        </form>
      </div>
    </div>
  );
}
