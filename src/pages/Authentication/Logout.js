import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

// import { logoutUser } from '../../store/actions';
import { logOut } from '../../store/auth/actions';

class Logout extends Component {

    
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount() {
    logOut();
    this.props.history.push('login')
        // Fire Action for Remove all Item from localstorage and redirect to login page
     

    }

    render() {
        return (
            <React.Fragment>
               <h1>&nbsp;</h1>
            </React.Fragment>
        );
    }
}

export default Logout

