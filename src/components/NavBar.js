import React from 'react';

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href={"/login"}>Bulls And Cows</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;