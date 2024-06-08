import style from "../style";
import Navbar from "../components/Navbar";
import DataManagement from "../components/DataManagement";
import Footer from "../components/Footer";

const DataManagementPage = () => {
    return (
        <div className="bg-primary w-full relative pt-9">
            <Navbar />

            <div className={`bg-primary ${style.flexStart}`}>
                <div className={`${style.boxWidth}`}>
                    <DataManagement />
                </div>
            </div>

            <div className={`bg-primary ${style.paddingX} ${style.flexCenter}`}>
                <div className={`${style.boxWidth}`}>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default DataManagementPage;