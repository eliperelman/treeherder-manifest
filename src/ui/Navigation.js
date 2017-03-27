import React from 'react';
import { Route } from 'react-router-dom';
import { Nav, Navbar, NavbarToggler, NavbarBrand, Collapse, NavItem } from 'reactstrap';
import Icon from 'react-fontawesome';
import NavLink from './NavLink';
import logoUrl from '../logo.png';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <Navbar toggleable fixed="top" light style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fff' }}>
        <NavbarToggler right onClick={() => this.toggle()} />
        <NavbarBrand href="/">
          <img src={logoUrl} className="img-fluid" style={{ maxHeight: 26, verticalAlign: 'baseline' }} />
        </NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar className="mr-auto">
            <NavItem>
              <Route path="/:pushId">
                {({ match }) => !!match && (
                  <NavLink to={`/${match.params.pushId}`} active={match.isExact}>
                    <Icon name="sitemap" /> Suites
                  </NavLink>
                )}
              </Route>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
