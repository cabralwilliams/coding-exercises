import React, { useState } from 'react'
import AvailableButton from './AvailableButton'
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_SAVED_STATE } from '../utils/actions';

function Available() {
    const [stateLoaded,setStateLoaded] = useState(false);
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

    return (
        <div className='d-flex flex-wrap'>
            <h3 className='col-12 border-bottom border-dark'>On The Board</h3>
            {state.availableHeroes.map((h, i) => {
                return <AvailableButton hero={h} key={i} />
            })}
        </div>
    )
}

export default Available