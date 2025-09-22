import React, { useState, useEffect } from "react";
import { Pencil, ArrowLeft, LogOut, X } from "lucide-react";
import { fetchProfile, updateName } from "../redux/actions/dashboard-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate, Link } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, profileLoading, userLoading } = useSelector(
    (state) => state.dashboard
  );

  const UserName = profile?.[0]?.name;
  const UserEmail = profile?.[0]?.email;

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(UserName || "");
  const [tempName, setTempName] = useState(name);

  const handleSave = async () => {
    if (tempName.trim()) {
      await dispatch(updateName({ name: tempName }));
      await dispatch(fetchProfile());
      setName(tempName);
      setIsEditing(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(`/auth/login`);
  };

  const handleRetake = () => {
    navigate("/questions/grade");
  };

  const isValidName = () => {
    const trimmedName = tempName.trim();
    return trimmedName.length > 0 && trimmedName !== UserName?.trim();
  };

  const handleClick = () => {
    navigate("/dashboard/microexperience");
  };
  return profileLoading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="bg-[#0B0132]">
      <div className="flex justify-between items-center text-white p-4">
        <div onClick={handleClick}>
          <img
            src="/assets/logo.svg"
            alt="Lucidus Logo"
            width={128}
            height={24}
          />
        </div>
        <Link to="/profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <g clip-path="url(#clip0_112_2331)">
              <path
                d="M16.0003 2.66669C8.64033 2.66669 2.66699 8.64002 2.66699 16C2.66699 23.36 8.64033 29.3334 16.0003 29.3334C23.3603 29.3334 29.3337 23.36 29.3337 16C29.3337 8.64002 23.3603 2.66669 16.0003 2.66669ZM16.0003 6.66669C18.2137 6.66669 20.0003 8.45335 20.0003 10.6667C20.0003 12.88 18.2137 14.6667 16.0003 14.6667C13.787 14.6667 12.0003 12.88 12.0003 10.6667C12.0003 8.45335 13.787 6.66669 16.0003 6.66669ZM16.0003 25.6C12.667 25.6 9.72032 23.8934 8.00033 21.3067C8.04033 18.6534 13.3337 17.2 16.0003 17.2C18.6537 17.2 23.9603 18.6534 24.0003 21.3067C22.2803 23.8934 19.3337 25.6 16.0003 25.6Z"
                fill="#4ED0AA"
              />
            </g>
            <defs>
              <clipPath id="clip0_112_2331">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </div>
      <div className="min-h-screen  bg-[#0B0132] text-white flex flex-col relative max-w-[400px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={handleBack}>
            {" "}
            <ArrowLeft className="w-6 h-6 cursor-pointer" />
          </button>

          <h1 className="text-lg font-semibold ">Profile</h1>
          <div></div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-6 px-6 mt-6">
          {/* Name */}
          <div>
            <label className="block text-sm mb-1">Name</label>
            <div className="flex items-center bg-[#E8DFFB] rounded-lg px-4 py-3 text-black justify-between">
              <span className="text-[#5C2DB3] font-medium">{UserName}</span>
              <Pencil
                className="w-4 h-4 text-[#5C2DB3] cursor-pointer"
                onClick={() => {
                  setTempName(name);
                  setIsEditing(true);
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="bg-[#E8DFFB] rounded-lg px-4 py-3 text-[#5C2DB3]">
              {UserEmail}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-auto flex flex-col gap-4 px-6 pb-8">
          <button
            onClick={handleRetake}
            className="border border-[#0F8864] cursor-pointer text-[#0F8864] py-3 rounded-lg font-medium"
          >
            Retake Quiz
          </button>
          <button
            onClick={handleLogout}
            className="border border-[#0F8864] cursor-pointer text-[#0F8864] py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            Logout
          </button>
        </div>

        {/* Bottom Sheet Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50 max-w-[400px] mx-auto">
            <div className="bg-white w-full rounded-t-3xl p-6 shadow-lg">
              {/* Close */}
              <div className="flex justify-end">
                <X
                  className="w-6 h-6 text-green-600 cursor-pointer"
                  onClick={() => setIsEditing(false)}
                />
              </div>

              <p className="text-center text-black mb-4">Enter your name.</p>

              {/* Input */}
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Type here..."
                className="w-full border bg-[#EFEAFF] border-purple-400 rounded-full px-4 py-3 text-center text-purple-600 mb-6 outline-none"
              />

              {/* Save Button */}
              <button
                disabled={userLoading || !isValidName()}
                onClick={handleSave}
                className="w-full bg-[#0F8864] text-white py-3 rounded-lg font-medium"
              >
                {userLoading ? "Saving..." : "Save Name"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
