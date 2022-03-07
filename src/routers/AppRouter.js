import React from 'react';
import Home from '../pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path="*" element={<Home />} />
			</Routes>
		</Router>
	);
};
