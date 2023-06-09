import React from "react";

function Die(props){
    const styles={backgroundColor: props.isHeld ? "#59E391" : "white"}
    return (
        <div className="die"
            style={styles}
            onClick={props.hold}
        >
            <h2>{props.value}</h2>
        </div>
    )
}

export default Die