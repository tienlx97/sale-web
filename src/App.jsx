import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { FluentProvider, makeStyles, webLightTheme } from '@fluentui/react-components';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './router/router';

const qc = new QueryClient();

const useStyles = makeStyles({
	root: {
		// display: 'flex',
		// height: '100vh',
		// width: '100%',
		// overflow: 'initial',
		// alignItems: 'stretch',
		// flexDirection: 'row-reverse',
		// justifyContent: 'flex-end',
	}
});

const App = () => {
	const _styles = useStyles();

	return (
		<StrictMode>
			<QueryClientProvider client={qc}>
				<FluentProvider className={_styles.root} theme={webLightTheme}>
					<RouterProvider router={router} />
				</FluentProvider>
			</QueryClientProvider>
		</StrictMode>
	);
};

export default App;
