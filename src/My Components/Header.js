import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
    let headerStyle = {
        background: "linear-gradient(to right top, #F4E306, #EE0169)",
        fontWeight: "600",
    };
    let imgShow = {
        width: "50px",
        height: "100%",
    };
    return (
        <>
            <nav
                className="navbar navbar-expand-lg bg-body-tertiary px-5 py-3"
                style={headerStyle}
            >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={props.logo} alt="logo" style={imgShow} />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className="nav-link active"
                                    aria-current="page"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">
                                    About
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-dark" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}
