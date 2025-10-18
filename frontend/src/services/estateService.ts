import apiClient from "./apiClient";

export interface Estate {
  id: number;
  title: string;
  estatename: string;
  district: string;
  area: number;
  rent: number;
  url: string;
  roomnum: number;
  tenants: number;
  highlighted: boolean;
}

export const getEstates = async (): Promise<Estate[]> => {
    const response = await apiClient.get("/estates");
    return response.data;
};

export const getEstateById = async (id: number): Promise<Estate> => {
    const response = await apiClient.get(`/estates/${id}`);
    return response.data;
};

export const getEstatesByForm = async (formData: string): Promise<Estate[]> => {
    const response = await apiClient.get(`/estates/search?${formData}`);
    return response.data;
};