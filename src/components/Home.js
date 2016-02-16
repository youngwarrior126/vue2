import React from 'react';
import Base from './Base';
import LoginOverlay from './LoginOverlay';
// import Tabs from './Tabs';
// import Tab from './Tab';
import Nav from './Nav';
import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';
import DisabledTab from './DisabledTab';

const favoritesTooltip = 'Log in to start favoriting sets!';
const eventsTooltip = 'Log in to see recommended events';

export default class Home extends Base {
	constructor(props) {
		super(props);
		this.state = {
			disabled: true
		};
	}
	componentWillMount() {
		const { push, loginStatus } = this.context;
		push({ currentPage: 'Home' });
		if(loginStatus) {
			this.setState({ disabled: false });
		}
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextContext.loginStatus) {
			this.setState({ disabled: false });
		}
	}
	componentDidMount() {
		// mixpanel.track("User Home Page Open");
	}
	render() {
		return (
			<div className='view'>
				{/*<Tabs>
					<Tab to='/home'>STREAM</Tab>
					<Tab to='/home/favorites' disabled={this.state.disabled} disabledText='Log in to start favoriting sets!'>FAVORITES</Tab>
					<Tab to='/home/events' disabled={this.state.disabled} disabledText='Log in to see recommended events!'>NEW EVENTS</Tab>
				</Tabs>*/}
				<Nav>
					<IndexLink to='/home'><p>STREAM</p></IndexLink>
					{this.context.loginStatus ? <Link to='/home/favorites'><p>FAVORITES</p></Link> : <DisabledTab tooltip={favoritesTooltip}>FAVORITES</DisabledTab>}
					{this.context.loginStatus ? <Link to='/home/events'><p>EVENTS</p></Link> : <DisabledTab tooltip={eventsTooltip}>EVENTS</DisabledTab>}
				</Nav>
				{
					React.cloneElement(this.props.children, {
						appState: this.props.appState
					})
				}
			</div>
		);
	}
}

Home.contextTypes =  {
	push: React.PropTypes.func,
	user: React.PropTypes.object,
	loginStatus: React.PropTypes.bool
};