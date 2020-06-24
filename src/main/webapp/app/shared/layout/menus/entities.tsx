import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/bottle">
      Bottle
    </MenuItem>
    <MenuItem icon="asterisk" to="/spirit">
      Spirit
    </MenuItem>
    <MenuItem icon="asterisk" to="/category">
      Category
    </MenuItem>
    <MenuItem icon="asterisk" to="/sub-category">
      Sub Category
    </MenuItem>
    <MenuItem icon="asterisk" to="/primary-barrel">
      Primary Barrel
    </MenuItem>
    <MenuItem icon="asterisk" to="/secondary-barrel">
      Secondary Barrel
    </MenuItem>
    <MenuItem icon="asterisk" to="/distillery">
      Distillery
    </MenuItem>
    <MenuItem icon="asterisk" to="/brand">
      Brand
    </MenuItem>
    <MenuItem icon="asterisk" to="/parent">
      Parent
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-history">
      User History
    </MenuItem>
    <MenuItem icon="asterisk" to="/my-book">
      My Book
    </MenuItem>
    <MenuItem icon="asterisk" to="/favorite">
      Favorite
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
