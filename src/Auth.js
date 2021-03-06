import React from 'react';
import firebase from 'firebase';
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

export class Auth extends React.Component {
    state = {
        user: null,
        authSubscription: null
    }

    componentDidMount() {
        const authSubscription = firebase.auth().onAuthStateChanged(user => {
            this.setState({user})
        })

        this.setState({authSubscription});
    }

    componentWillUnmount() {
        this.state.authSubscription && this.state.authSubscription();
    }

    render() {
        return this.state.user
            ? this.props.children
            : (
                <div className="component-container">
                    <Typography variant="h6" style={{marginTop: '20px', textAlign: 'center'}}>
                        Aby wyświetlić zawartość. Proszę <Link to="/sign-in">Zaloguj Się</Link>.
                    </Typography>
                </div>
            )
    }
}
