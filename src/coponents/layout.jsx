import { AppItem, makeStyles, NavDivider, NavDrawer, NavDrawerBody, NavItem } from '@fluentui/react-components';
import { BookTheta20Filled, BookTheta20Regular, bundleIcon, Payment20Filled, Payment20Regular } from '@fluentui/react-icons';
import { Link, Outlet, useLocation } from 'react-router';
import { Logo } from './logo';

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: '1000vh',
		position: 'relative'
	},

	layout: {
		height: '100vh',
		overflow: 'initial',

		display: 'grid',
		gridTemplateColumns: '260px 1fr',
		gridTemplateRows: '1fr'
		// gridTemplateAreas:
		// `side header
		//  side main `,
	},

	sidebar: {
		gridColumn: '1/2',
		gridRow: '1/2',
		// gridArea: 'side',

		position: 'fixed',
		top: 0,
		left: 0,
		height: '100%'
	},

	main: {
		gridColumn: '2/3',
		gridRow: '1/2',
		margin: '1rem'
		// gridArea: 'main',
	},

	fullwidth: {
		width: '100%'
	},

	restLink: {
		textDecorationLine: 'none'
	}
});

const Contract = bundleIcon(BookTheta20Filled, BookTheta20Regular);
const Payment = bundleIcon(Payment20Filled, Payment20Regular);

export function Layout() {
	const _styles = useStyles();
	const { pathname } = useLocation();

	return (
		<div className={_styles.layout}>
			<NavDrawer defaultSelectedValue={pathname} defaultSelectedCategoryValue='' open type='inline' multiple className={_styles.sidebar}>
				<NavDrawerBody>
					<Link className={_styles.fullwidth} to='/'>
						<AppItem className={_styles.fullwidth}>
							<Logo />
						</AppItem>
					</Link>
					<NavDivider />
					<Link to='/contract' className={_styles.restLink}>
						<NavItem icon={<Contract />} value='/contract'>
							Contract
						</NavItem>
					</Link>
					{/*  */}
					<Link to='/payment-request' className={_styles.restLink}>
						<NavItem icon={<Payment />} value='/payment-request'>
							Payment Request
						</NavItem>
					</Link>
				</NavDrawerBody>
			</NavDrawer>
			<div className={_styles.main}>
				<Outlet />
			</div>
		</div>
	);
}
