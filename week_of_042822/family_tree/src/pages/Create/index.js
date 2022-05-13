import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Create() {
    const state = useSelector(state => {
        return { currentPerson: state.currentPerson, createdPeople: state.createdPeople };
    });

    const dispatch = useDispatch();

    if(state.createdPeople.length > 0) {
        return(
            <div className='container'>
                <div className='d-flex flex-wrap justify-content-around'>
                    <h2>Select a Member</h2>
                    <button className='btn btn-danger'>Reset Application</button>
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='d-flex flex-column align-items-center'>
                <h2>Create the First Person!</h2>
                <form className='bg-dark rounded text-white d-flex flex-column mb-3 shadow-sm'>
                    <div className='form-group p-3'>
                        <label htmlFor='firstName' className='mb-2'>First Name</label>
                        <input type="text" id='firstName' name='firstName' className='form-control'/> 
                    </div>
                    <div className='form-group p-3'>
                        <label htmlFor='lastName' className='mb-2'>Last Name</label>
                        <input type="text" id='lastName' name='lastName' className='form-control'/> 
                    </div>
                    <div className='p-3 d-flex'>
                        <button type='submit' className='btn btn-primary col-12'>Create!</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Create;