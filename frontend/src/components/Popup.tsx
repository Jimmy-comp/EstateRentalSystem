import React from "react";

interface PopupProps {
  message: string;
  type?: "error" | "success" | "info";
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({message, type = "info", onClose}) => {
  const bgColor = type === "error" ? "bg-red-600" : type === "success" ? "bg-green-600" : "bg-blue-600";
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className={`rounded-lg shadow-lg w-80 text-center p-6 text-white ${bgColor}`}
      >
        <p className="mb-4 text-lg">{message}</p>
        <button
          onClick={onClose}
          className="bg-white text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;