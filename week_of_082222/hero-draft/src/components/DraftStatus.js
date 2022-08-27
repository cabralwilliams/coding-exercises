import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

function DraftStatus() {
    //This is the only property that I care about in this component
    const state = useSelector(state => {
        return { status: state.draftUnderway };
    });
    const [statusText,setStatusText] = useState("Running!");
    const [textClass,setTextClass] = useState("text-success");

    useEffect(() => {
        if(state.status) {
            setStatusText("Running!");
            setTextClass("text-success");
        } else {
            setStatusText("Paused");
            setTextClass("text-danger");
        }
    },[state.status]);

    return (
        <div>Status: <span className={textClass}>{statusText}</span></div>
    )
}

export default DraftStatus