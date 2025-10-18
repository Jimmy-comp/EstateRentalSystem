import React, { createContext, useContext, useState, useEffect, type ReactNode, type FC } from "react";
import { type Estate, getEstates } from "../services/estateService"; // adjust path if needed

interface EstateContextType {
  estates: Estate[];
  setEstates: React.Dispatch<React.SetStateAction<Estate[]>>;
  isLoading: boolean;
}

const EstateContext = createContext<EstateContextType | undefined>(undefined);

export const EstateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [estates, setEstates] = useState<Estate[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEstates();
        setEstates(data);

        setDistricts(Array.from(new Set(data.map((e) => e.district))));
      } catch (error) {
        console.error("Failed to fetch estates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <EstateContext.Provider value={{ estates, setEstates, isLoading }}>
      {children}
    </EstateContext.Provider>
  );
};

export const useEstateContext = () => {
  const context = useContext(EstateContext);
  if (!context) throw new Error("useEstateContext must be used within EstateProvider");
  return context;
};