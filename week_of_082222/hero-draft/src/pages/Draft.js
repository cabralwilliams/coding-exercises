import React, { useState } from 'react'
import Available from '../components/Available'
import TeamInfo from '../components/TeamInfo'
import { LOAD_SAVED_STATE, TOGGLE_DRAFT } from '../utils/actions';
import { useSelector, useDispatch } from 'react-redux';
import StartStop from '../components/StartStop';
import DraftStatus from '../components/DraftStatus';

function Draft() {
    // const [buttonText,setButtonText] = useState('');
    // const [stateLoaded,setStateLoaded] = useState(false);
    // //Grab the state information from global state
    // const state = useSelector(state => {
    //     return { ...state };
    // });

    // //Create the dispatch function
    // const dispatch = useDispatch();

    // let savedState = JSON.parse(localStorage.getItem("savedState"));

    // if(savedState === null) {
    //     savedState = { ...state };
    // } else if(!stateLoaded) {
    //     dispatch({
    //         type: LOAD_SAVED_STATE,
    //         savedState
    //     });
    //     setStateLoaded(true);
    // }

    // setButtonText(savedState.draftUnderway ? "Pause Draft" : "Resume Draft");

    return (
        <div className='d-flex flex-wrap'>
            <h2 className='col-12'>The Draft</h2>
            <div className='col-12 col-md-6 d-flex flex-column align-items-center'>
                <StartStop />
                <DraftStatus />
            </div>
            <div className='col-12 col-md-6'>
                <Available />
            </div>
        </div>
    )
}

export default Draft