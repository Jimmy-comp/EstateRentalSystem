import React from "react";
import type { Estate } from "../services/estateService";

interface EstateProps {
    estate: Estate;
}

const EstateCard: React.FC<EstateProps> = ({ estate }) => (
    <div className="w-full max-w-4xl h-[80vh] rounded-xl shawdow-lg overflow-hidden border flex flex-col">
        <div className="h-[65%]">
            <img
                src={estate.url}
                alt={estate.estatename}
                className="w-full h-full object-cover"
            />
        </div>
        <div className="flex-1 p-3 bg-white">
            <h2 className="text-2xl font-bold">{estate.estatename}</h2>
            <p className="text-gray-600">{estate.district}</p>
            <p className="text-gray-800 mt-2">
                Area: {estate.area} sqft | rent: ${estate.rent}
            </p>
            <p className="text-gray-800 mt-2">
                🛏 {estate.roomnum} | 👥 {estate.tenants}
            </p>
            {estate.highlighted && (
                <span className="inline-block mt-3 px-3 py-1 text-sm bg-yellow-500 rounded">
                🌟 Curated
                </span>
            )}
        </div>
    </div>
);
export default EstateCard;