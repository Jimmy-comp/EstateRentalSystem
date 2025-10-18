import React, { useState, useEffect } from "react";
import { getEstatesByForm, type Estate } from "../services/estateService";

const Search: React.FC = () => {
  //const { estates, districts, isLoading } = useAppContext();
  const [estates, setEstates] = useState<Estate[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form, setForm] = useState({
    district: "",
    roomnum: "",
    minarea: "",
    maxarea: "",
    minrent: "",
    maxrent: "",
  });

  //const [page, setPage] = useState(1);
  //const limit = 2;

  useEffect(() => {
    const fetchEstates = async () => {
        try{
            setIsLoading(true);
            const data = await getEstatesByForm(new URLSearchParams(form).toString());
            
            setEstates(data);
            setDistricts(Array.from(new Set(data.map((e) => e.district))));
        } catch(err){
            console.error("(Search) Failed to fetch data:", err);
        } finally {
            setIsLoading(false);
        }
    }
    fetchEstates();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    //setPage(1); // reset pagination when changing filter
  };

  const handleBtnClick = async (e?: React.FormEvent) => {
    e?.preventDefault();

    try{
        setIsLoading(true);
        const data = await getEstatesByForm(new URLSearchParams(form).toString());
        setEstates(data);
    } catch (err){
        console.error("(Search) Failed to fetch data:", err);
    } finally {
        setIsLoading(false);
    }
  };

  // 🧾 Pagination
  //const numPages = Math.ceil(filteredEstates.length / limit);
  //const paginatedEstates = filteredEstates.slice((page - 1) * limit, page * limit);

  if (isLoading)
    return <div className="text-center text-white mt-20 text-lg">Loading estates...</div>;

  return (
    <div className="flex flex-col-reverse md:flex-row w-screen min-h-screen text-white bg-gray-900 pl-8 over-hidden">
    {/* LEFT: Scrollable Property Results */}
        <div className="flex-1 overflow-y-auto pr-6 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {estates.length > 0 ? (
                estates.map((estate) => (
                <div key={estate.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <img
                    src={estate.url}
                    alt={estate.title}
                    className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h1 className="text-4xl font-bold">${estate.rent}</h1>
                        <div className="flex space-x-3">
                            <h3 className="text-2xl font-bold">
                                {estate.title}
                            </h3>
                            {estate.highlighted && (
                                <span className="px-2 py-1 rounded text-sm bg-yellow-500">
                                    🌟 Curated
                                </span>
                            )}
                        </div>
                        <p>{estate.estatename}</p>
                        <p>{estate.district}</p>
                        <p>{estate.roomnum}bd • {estate.area}ft²</p>
                        <p className="text-gray-50 text-opacity-50">ID: {estate.id}</p>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-gray-400 text-center col-span-2">
                    No properties match your search.
                </p>
            )}
            </div>
        </div>

        {/* RIGHT: Fixed Search Panel */}
        <div className="w-full md:w-1/3 bg-gray-800 p-6 border-l border-gray-700 flex flex-col items-center fixed md:sticky top-0 h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center">Property Search</h2>

            <form className="space-y-4 w-full">
                <div>
                    <label className="block mb-1 font-medium">District</label>
                    <select
                        name="district"
                        value={form.district}
                        onChange={handleChange}
                        className="w-full rounded-md bg-gray-700 p-2"
                    >
                    <option value="">Select district here</option>
                    {districts.map((d) => (
                        <option key={d} value={d}>
                        {d}
                        </option>
                    ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Bedrooms</label>
                    <input
                        type="number"
                        name="roomnum"
                        value={form.roomnum}
                        onChange={handleChange}
                        className="w-full rounded-md bg-gray-700 p-2"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Min Area</label>
                        <input
                            type="number"
                            name="minarea"
                            value={form.minarea}
                            onChange={handleChange}
                            className="w-full rounded-md bg-gray-700 p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Max Area</label>
                        <input
                            type="number"
                            name="maxarea"
                            value={form.maxarea}
                            onChange={handleChange}
                            className="w-full rounded-md bg-gray-700 p-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Min Rent (HK$)</label>
                        <input
                            type="number"
                            name="minrent"
                            value={form.minrent}
                            onChange={handleChange}
                            className="w-full rounded-md bg-gray-700 p-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Max Rent (HK$)</label>
                        <input
                            type="number"
                            name="maxrent"
                            value={form.maxrent}
                            onChange={handleChange}
                            className="w-full rounded-md bg-gray-700 p-2"
                        />
                    </div>
                </div>
                <div  className="flex justify-end">
                    <button type="submit" onClick={handleBtnClick}>
                        Search   
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Search;