import Sidebar from "components/Sidebar";
import ListFreelancer from "features/Freelancers/components/ListFreelancer";
import "./index.scss";
import React from "react";

function FindFreelancer() {
    return (
        <div className="FindFreelancer container flex">
            <div className="FindFreelancer__sidebar overflow-y-scroll">
                <Sidebar />
            </div>
            <div className="FindFreelancer__list flex-1 overflow-y-scroll mr-1">
                <ListFreelancer />
            </div>
        </div>
    );
}

export default FindFreelancer;
