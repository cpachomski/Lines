import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
var styles = require("../../styles/main.scss");

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(nextValue) {
    // Available thanks to contextTypes below
    const { router } = this.context;
    router.transitionTo(`/${nextValue}`);
  }

  render() {
    // Injected by React Router
    const { location, children } = this.props;
    const { pathname } = location;
    const value = pathname.substring(1);

    return (
        <div>
          <div className={styles.header}>
            <Link to="/">Home</Link>
            { pathname }
          </div>
          <hr />
          <hr />
          {children}
        </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(
  mapStateToProps
)(App);
