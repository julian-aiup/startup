import AuthService from '../../utils/AuthService';
import RaisedButton from "material-ui/RaisedButton";
import React, { PropTypes as T } from "react";

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    if(props.auth) {
      this.state = {
        profile: props.auth.getProfile()
      };
      props.auth.on('profile_updated', (newProfile) => {
        this.setState({profile: newProfile});
      });
    }
  }

  static contextTypes: {
    router: T.object
  }

  render () {
    let renderProfile;
    if(this.state) {
      const { profile } = this.state;
      renderProfile = profile.name;
    }

    return (
      <div className="home-page">
        <h2>Welcome to Countries Trivia { renderProfile }!</h2>
      </div>
    );
  }
}

Home.propTypes = {
  auth: T.instanceOf(AuthService)
};

export default Home;
