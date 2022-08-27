import React from 'react'

function TeamInfo({ teamData }) {
    return (
        <div className='d-flex align-items-center flex-wrap'>
            <h3 className='col-12 col-md-4'>{teamData.order}. {teamData.name}</h3>
            <div className='col-12 col-md-8 d-flex flex-column align-items-center'>
                <h4 className='border-bottom border-dark'>Current Members</h4>
                {teamData.members.map((m,i) => {
                    return <div className='col-6 col-md-3 d-flex flex-column align-items-center' key={i}>
                        <div>Rank: {m.rank}</div>
                        <div>{m.name}</div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default TeamInfo