import React from 'react'
import { preloadedState } from '../utils/store';
import { RESET_TEAMS } from '../utils/actions';
import { useDispatch } from 'react-redux';

function Reset() {
    //Set up dispatch function
    const dispatch = useDispatch();

    function resetApp() {
        localStorage.removeItem("savedState");
        dispatch({
            type: RESET_TEAMS
        });
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            <h2>Reset</h2>
            <p className='col-10 col-md-8'>
                Here, you can reset the draft to its preloaded state.  And why wouldn't 
                you want to?  After all, Batman absolutely deserves to be ranked number 1.
            </p>
            <button className='btn btn-warning col-4 col-md-2' onClick={() => resetApp()}>Reset</button>
        </div>
    )
}

export default Reset