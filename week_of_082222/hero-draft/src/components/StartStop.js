import React, { useState, useEffect } from 'react'
import { LOAD_SAVED_STATE, TOGGLE_DRAFT } from '../utils/actions';
import { useDispatch, useSelector } from 'react-redux';

function StartStop() {
    const [stateLoaded,setStateLoaded] = useState(false);
    const [buttonText,setButtonText] = useState('Start/Stop');
    //Grab the state information from global state
    const state = useSelector(state => {
        return { ...state };
    });

    //Create the dispatch function
    const dispatch = useDispatch();

    let savedState = JSON.parse(localStorage.getItem("savedState"));

    if(savedState === null) {
        savedState = { ...state };
    } else if(!stateLoaded) {
        dispatch({
            type: LOAD_SAVED_STATE,
            savedState
        });
        setStateLoaded(true);
    }

    // useEffect(() => {
    //     setButtonText(savedState.draftUnderway ? "Pause Draft" : "Resume Draft");
    // }, [buttonText,savedState.draftUnderway])
    // setButtonText(savedState.draftUnderway ? "Pause Draft" : "Resume Draft");

    function toggleDraftStatus() {
        const newStatus = !savedState.draftUnderway;
        const newState = { ...savedState, draftUnderway: newStatus };
        localStorage.setItem("savedState", JSON.stringify(newState));
        dispatch({
            type: TOGGLE_DRAFT
        });
    }

    return (
        <button className='btn btn-primary' onClick={() => toggleDraftStatus()}>{buttonText}</button>
    )
}

export default StartStop