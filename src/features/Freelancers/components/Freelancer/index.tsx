import { EnvironmentOutlined, StarFilled } from "@ant-design/icons";
import React from "react";
import "./index.scss";

Freelancer.propTypes = {};

function Freelancer() {
    return (
        <div className="freelancer transition flex flex-col">
            <div className="freelancer__overview flex flex-grow flex-wrap items-center">
                <div className="flex-1">
                    {/* avata */}
                    <div className="freelancer__avatar">
                        <a href="/">
                            <img
                                src="https://www.vasterad.com/themes/hireo/images/user-avatar-big-03.jpg"
                                alt="avatar"
                            />
                        </a>
                    </div>
                    {/* name */}
                    <div className="freelancer__name mt-4">
                        <h4>
                            <a href="/">
                                Sindy Forest{" "}
                                <img
                                    className="flag ml-1"
                                    src="https://www.vasterad.com/themes/hireo/images/flags/au.svg"
                                    alt=""
                                />
                            </a>
                        </h4>
                        <span>Magento Certified Developer</span>
                    </div>
                    {/* rating */}
                    <div className="freelancer__rating mt-1">
                        <span className="point mr-2">5.0</span>
                        <span className="star"><StarFilled /></span>
                        <span className="star"><StarFilled /></span>
                        <span className="star"><StarFilled /></span>
                        <span className="star"><StarFilled /></span>
                        <span className="star"><StarFilled /></span>
                    </div>
                </div>
            </div>

            <div className="freelancer__details">
                <div className="info">
                    <ul>
                        <li className="relative">
                            Location 
                            <strong><EnvironmentOutlined className="relative -top-1" /> Brisbane</strong>
                        </li>
                        <li>
                            Rate 
                            <strong>$70 / hr</strong>
                        </li>
                        <li>
                            Job Success 
                            <strong>100%</strong>
                        </li>
                    </ul>
                </div>

                <a href="/">
                    <button className="view-profile">
                        View Profile 
                    </button>
                </a>
            </div>
        </div>
    );
}

export default Freelancer;
