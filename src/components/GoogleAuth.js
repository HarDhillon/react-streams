import React from 'react';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '410480857840-uusbssmcugig55qvbkhdsb14v0tdol50.apps.googleusercontent.com',
        scope: 'email'
      })
    });
  }

  render() {
    return <div>Google Auth</div>;
  }
}

export default GoogleAuth;