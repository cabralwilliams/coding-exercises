import React, { useEffect, useState } from 'react'
//Import the functions that allow me to use global state
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_SAVED_STATE } from '../utils/actions';

function Home() {
    const [savedStateLoaded,setSavedStateLoaded] = useState(false);
    //You don't have to grab everything from state if you don't want to
    //Here, I have done so
    const state = useSelector(state => {
        return { ...state };
    });

    const [statusText,setStatusText] = useState("Running!");
    const [textClass,setTextClass] = useState("text-success");

    const dispatch = useDispatch();

    useEffect(() => {
        if(!savedStateLoaded) {
            //Always check to see whether state has been saved in localStorage
            let savedState = JSON.parse(localStorage.getItem("savedState"));

            if(!savedState) {
                savedState = { ...state };
            }

            //Load the savedState in localStorage and global store
            localStorage.setItem("savedState", JSON.stringify(savedState));

            dispatch({
                type: LOAD_SAVED_STATE,
                savedState
            });
            setSavedStateLoaded(true)
        }
    },[savedStateLoaded])

    useEffect(() => {
        if(state.draftUnderway) {
            setStatusText("Running!");
            setTextClass("text-success");
        } else {
            setStatusText("Paused");
            setTextClass("text-danger");
        }
    },[state.draftUnderway]);

    if(state.currentTeam === null) {
        return(
            <div className='d-flex flex-column align-items-center'>
                <h2>Draft Status: <span className={textClass}>{statusText}</span></h2>
                <h3>Meet the Teams</h3>
                <div className='d-flex flex-wrap col-10'>
                    {state.teams.map(t => {
                        return <div className='col-6 col-md-3'>{t.name}</div>
                    })}
                </div>
            </div>
        )
    }
    return (
        <div>Home</div>
    )
}

export default Home