import React from "react";
import "./Title.css";

const Title = props => (
    <div className="nav navbar">
        {props.children}
    </div>
);

export default Title;
