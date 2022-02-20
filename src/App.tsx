import React from 'react';
import './App.sass';
import store from './redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './redux/history';
import Layout from './layout';

function App() {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<div className="App">
					<Layout></Layout>
				</div>
			</ConnectedRouter>
		</Provider>
	);
}

export default App;
