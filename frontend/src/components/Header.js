import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ context }) => {
    const authUser = context.authenticatedUser;
    
    return (
        <Fragment>
            <div>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/css?family=Work+Sans:400,500"
                    rel="stylesheet"
                    type="text/css"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Cousine"
                    rel="stylesheet"
                    type="text/css"
                />
                <link href="../styles/global.css" rel="stylesheet" />
                <title>Mentorship Connect</title>
            </div>
            <div className="header">
                <div className="bounds">
                <NavLink className="header--logo" to="/">Mentorship Connect</NavLink>
                <nav>
                    {authUser ? (
                        <Fragment>
                            <span>Welcome, {`${authUser.firstName}  ${authUser.lastName}`}! </span>
                            <NavLink className="signout" to="/signout">Sign Out</NavLink>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <NavLink className="signup" to="/signup">Sign Up</NavLink>
                            <NavLink className="signin" to="/signin">Sign In</NavLink>
                        </Fragment>
                    )}
                </nav>
                </div>
            </div>
            <hr />
        </Fragment>
    );
}

export default Header;