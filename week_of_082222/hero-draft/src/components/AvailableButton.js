import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_SAVED_STATE, SELECT_HERO } from '../utils/actions';


function AvailableButton({ hero }) {
    const dispatch = useDispatch();
    const [stateLoaded,setStateLoaded] = useState(false);
    //Grab the state information from global state
    const state = useSelector(state => {
        return { ...state };
    });

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

    function selectHero() {
        const newState = { ...state };
        if(newState.currentTeam) {
            let i = 0;
            while(newState.teams[i].name !== newState.currentTeam.name) {
                i++;
            }
            //Add the chosen hero to the correct team
            newState.currentTeam.members = [...newState.currentTeam.members, { ...hero }];
            newState.availableHeroes = newState.availableHeroes.filter(h => h.name !== hero.name);
            newState.teams[i].members = [...newState.teams[i].members, { ...hero }];
            dispatch({
                type: SELECT_HERO,
                selectedHero: { ...hero }
            });
            localStorage.setItem("savedState", JSON.stringify(newState));
        }
    }

    return (
        <div className='col-6 col-md-3 px-1 py-1'>
            <button className='btn btn-success' onClick={() => selectHero()}>{hero.rank}. {hero.name}</button>
        </div>
    )
}

export default AvailableButton