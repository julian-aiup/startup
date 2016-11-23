import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { browserHistory } from 'react-router';
import Drawer from 'material-ui/Drawer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import React, { PropTypes as T } from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

injectTapEventPlugin();

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handlePlayGame = this.handlePlayGame.bind(this);
  }

  static contextTypes: {
    router: T.object
  }

  render () {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance to children
      })
    }

    return (
      <div className='app'>
        <Toolbar className='header'>
          <ToolbarGroup firstChild={true} className='header--left'>
            <IconButton onTouchTap={this.handleToggle}>
              <MenuIcon />
            </IconButton>
            Countries<img src='https://upload.wikimedia.org/wikipedia/commons/5/5d/White_flag_icon.svg' alt='Flag' className='flag-ico'/>
          </ToolbarGroup>
        </Toolbar>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem onTouchTap={this.handleHome}>Home</MenuItem>
            <MenuItem onTouchTap={this.handlePlayGame}>Play game</MenuItem>
          </Drawer>
          {children}
        </div>
      );
    }

    getChildContext() {
      return { muiTheme: getMuiTheme(baseTheme) };
    }

    handleToggle () {
      this.setState({open: !this.state.open});
    }

    handleClose () {
      this.setState({open: false});
    }

    handleHome () {
      this.handleClose();
      browserHistory.push("/");
    }

    handlePlayGame () {
      this.handleClose();
      browserHistory.push("/playGame");
    }
  }

  MainLayout.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };
