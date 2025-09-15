import React, { useState, useEffect } from "react";
import { Pencil, ArrowLeft, LogOut, X } from "lucide-react";
import { fetchProfile, updateName } from "../redux/actions/dashboard-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, profileLoading, userLoading } = useSelector(
    (state) => state.dashboard
  );

  const UserName = profile?.[0]?.name;
  const UserEmail = profile?.[0]?.email;
  console.log(UserEmail, UserName, "username profiles ");

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  console.log(profile, "profile user ");

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
    navigate("/dashboard");
  };

  const isValidName = () => {
    const trimmedName = tempName.trim();
    return trimmedName.length > 0 && trimmedName !== UserName?.trim();
  };

  return profileLoading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="bg-[#0B0132]">
      <div className="min-h-screen  bg-[#0B0132] text-white flex flex-col relative max-w-[400px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={handleBack}>
              {" "}
              <ArrowLeft className="w-6 h-6 cursor-pointer" />
            </button>

            <h1 className="text-lg font-semibold">Profile</h1>
          </div>

          {/* Profile Icon */}
          <div className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <g clipPath="url(#clip0_1570_4473)">
                <path
                  d="M16 2.66675C8.63996 2.66675 2.66663 8.64008 2.66663 16.0001C2.66663 23.3601 8.63996 29.3334 16 29.3334C23.36 29.3334 29.3333 23.3601 29.3333 16.0001C29.3333 8.64008 23.36 2.66675 16 2.66675ZM16 6.66675C18.2133 6.66675 20 8.45341 20 10.6667C20 12.8801 18.2133 14.6667 16 14.6667C13.7866 14.6667 12 12.8801 12 10.6667C12 8.45341 13.7866 6.66675 16 6.66675ZM16 25.6001C12.6666 25.6001 9.71996 23.8934 7.99996 21.3067C8.03996 18.6534 13.3333 17.2001 16 17.2001C18.6533 17.2001 23.96 18.6534 24 21.3067C22.28 23.8934 19.3333 25.6001 16 25.6001Z"
                  fill="#24A57F"
                />
              </g>
              <defs>
                <clipPath id="clip0_1570_4473">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
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
