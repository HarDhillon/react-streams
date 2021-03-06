import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

  componentDidMount() {
    // window refers to the web page, instance is in the page
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '410480857840-uusbssmcugig55qvbkhdsb14v0tdol50.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        // get instance of auth
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        // listen to when state changes so text updates
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  // update state if isSignedIn changes and send action
  // above, our .listen also passes in a boolean of true or false for signed in
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut()
    }
  }
  // sign in helper method
  onSignInClick = () => {
    this.auth.signIn();
  };
  // sign out helper method
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;

    } else if (this.props.isSignedIn){
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className='google icon' />
          Sign Out
        </button>
      )

    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign in with Google
        </button>
      )
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);