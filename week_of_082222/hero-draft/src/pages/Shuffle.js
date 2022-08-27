import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SHUFFLE_TEAMS, LOAD_SAVED_STATE, SHUFFLE_HEROES } from '../utils/actions';

function Shuffle() {
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

    function shuffleTeams() {
        const output = {
            teams: [],
            availableHeroes: [...state.availableHeroes],
            currentTeam: state.currentTeam
        }
        while(output.teams.length < state.teams.length) {
            //Get a random team
            const randomTeam = { ...state.teams[Math.floor(Math.random()*state.teams.length)] };
            let count = 0;
            for(let i = 0; i < output.teams.length; i++) {
                if(randomTeam.name === output.teams[i].name) {
                    count++;
                    break;
                }
            }
            if(count === 0) {
                randomTeam.order = output.teams.length + 1;
                output.teams.push(randomTeam);
            }
        }
        return output;
    }

    function shuffleHeroes() {
        const output = {
            teams: [...state.teams],
            availableHeroes: [],
            currentTeam: state.currentTeam
        }

        while(output.availableHeroes.length < state.availableHeroes.length) {
            //Create a copy of a random hero
            const randomHero = { ...state.availableHeroes[Math.floor(Math.random()*state.availableHeroes.length)]};
            let count = 0;
            //Ensure hero not already in array
            for(let i = 0; i < output.availableHeroes.length; i++) {
                if(randomHero.name === output.availableHeroes[i].name) {
                    count++;
                    break;
                }
            }

            //If match wasn't found, add to array
            if(count === 0) {
                randomHero.rank = output.availableHeroes.length + 1;
                output.availableHeroes.push(randomHero);
            }
        }
        return output;
    }

    const shuffleDraftOrder = () => {
        console.log("Button clicked")
        const updatedState = shuffleTeams();
        dispatch({
            type: SHUFFLE_TEAMS,
            updatedState
        });
        console.log("Updated State: ")
        console.log(updatedState);
        localStorage.setItem("savedState", JSON.stringify(updatedState));
    }

    const shuffleHeroRankings = () => {
        const updatedState = shuffleHeroes();
        dispatch({
            type: SHUFFLE_HEROES,
            updatedState
        });
        console.log("Updated State: ")
        console.log(updatedState);
        localStorage.setItem("savedState", JSON.stringify(updatedState));
    }

    console.log(state.teams);

    return (
        <div className='d-flex flex-column align-items-center'>
            <h2>Shuffle</h2>
            <p className='col-10 col-md-8'>Here, you can see the current draft order and the current hero rankings.  You can shuffle 
                the heroes and the teams by hitting the respective buttons, but you cannot re-rank things 
                manually.  I have not given you that power.
            </p>
            <div className='d-flex flex-column align-items-center'>
                <h3>Draft Order</h3>
                <div className='d-flex flex-wrap col-10'>
                    <div className='col-12 col-md-4'>
                        <button className='btn btn-primary' onClick={() => shuffleDraftOrder()}>Shuffle Draft Order!</button>
                    </div>
                    <div className='col-12 col-md-8 d-flex flex-wrap'>
                        {state.teams.map((t, i) => {
                            return <div className='col-6 col-md-3' key={i}>{t.order}. {t.name}</div>
                        })}
                    </div>
                </div>
                <h3>Hero Rankings</h3>
                <div className='d-flex flex-wrap col-10'>
                    <div className='col-12 col-md-4'>
                        <button className='btn btn-primary' onClick={() => shuffleHeroRankings()}>Shuffle Hero Rankings!</button>
                    </div>
                    <div className='col-12 col-md-8 d-flex flex-wrap'>
                        {state.availableHeroes.map((h, i) => {
                            return <div className='col-6 col-md-3' key={i}>{h.rank}. {h.name}</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shuffle