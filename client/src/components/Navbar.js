import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    const { isLoggedIn, logout } = this.props;
    return (
      <Menu inverted>
        <Menu.Item>
          <NavLink to="/">Home</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/jokes">Jokes</NavLink>
        </Menu.Item>
        {
          isLoggedIn &&
        <Menu.Menu position="right">
          <Menu.Item onClick={logout}>Logout</Menu.Item>
        </Menu.Menu>
        }
      </Menu>
    );
  }
}

export default Navbar;
