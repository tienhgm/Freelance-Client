import Sidebar from "components/Sidebar";
import ListFreelancer from "features/Freelancers/components/ListFreelancer";
import "./index.scss";

function FindFreelancer() {
    return (
        <div className="flex FindFreelancer">
            <div className="overflow-y-scroll FindFreelancer__sidebar">
                <Sidebar />
            </div>
            <div className="flex-1 mr-1 overflow-y-scroll FindFreelancer__list">
                <ListFreelancer />
            </div>
        </div>
    );
}

export default FindFreelancer;
