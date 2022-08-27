import React from 'react'

function Header() {
    return (
        <header className='d-flex flex-wrap justify-content-evenly bg-light align-items-center'>
            <a href='/' className='text-decoration-none col-12 col-md-4'><h1 className='text-dark'>Hero Draft!</h1></a>
            <nav className='col-12 col-md-8 d-flex flex-wrap justify-content-evenly'>
                <a href='/shuffle' className='col-4 col-md-2 text-decoration-none text-dark'>Shuffle</a>
                <a href='/reset' className='col-4 col-md-2 text-decoration-none text-dark'>Reset</a>
                <a href='/draft' className='col-4 col-md-2 text-decoration-none text-dark'>Draft</a>
            </nav>
        </header>
    )
}

export default Header