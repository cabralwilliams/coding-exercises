import React from 'react'

function Header() {
    return (
        <header className='d-flex flex-wrap justify-content-around bg-dark'>
            <h1 className='text-light'>Family Tree</h1>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a className="nav-link" href="/create">Create</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header;