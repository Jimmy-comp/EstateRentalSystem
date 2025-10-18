import { useEffect, useState, type FC} from "react";
import { getEstates, type Estate } from "../services/estateService";
import EstateCard from "../components/EstateCard";

const Home: FC = () => {
    const [estates, setEstates] = useState<Estate[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEstates();
            //setEstates(data.filter(e => e.highlighted));
            setEstates(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    // automatically play slide
    useEffect(() => {
        if (estates.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % estates.length);
        }, 4000); // 每4秒換
        return () => clearInterval(interval);
    }, [estates]);

    if (loading) return <p className="text-center">Loading estates...</p>;
    if (estates.length === 0) return <p className="text-center">No estates found</p>;

    return(
        <div className="flex flex-col items-center justify-center w-screen min-h-screen relative">
            {/* Current Estate */}
            <EstateCard estate={estates[currentIndex]} />

            {/* Button Shift Left/Right */}
            <button onClick={() => 
                setCurrentIndex((currentIndex - 1 + estates.length) % estates.length)}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full">
                ◀
            </button>
            <button onClick={() => 
                setCurrentIndex((currentIndex + 1) % estates.length)}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full"
            >
                ▶
            </button>

            {/* Indicator */}
            <div className="flex justify-center space-x-2 mt-3">
                {estates.map((_, index) => (
                <span
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                        index === currentIndex ? "bg-blue-600" : "bg-gray-400"
                    }`}
                ></span>
                ))}
            </div>
        </div>
    );
};
export default Home;