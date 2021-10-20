import React, { useState } from 'react';

import useImageSearch from './services/useImageSearch';

import './app.scss';


const App = () => {
	const [query, setQuery] = useState('');
	const [tempQuery, setTempQuery] = useState('');
	const [pageNumber, setPageNumber] = useState(1);

	function handleInput(e) {
		setTempQuery(e.target.value);
	}

	function handleSearch() {
		setQuery(tempQuery);
		setPageNumber(1);
	}

	useImageSearch(query, pageNumber);

	return (
		<div className="app">
			<input type="text" className="search-input" onChange={handleInput} />
			<button className="search-input-btn" onClick={handleSearch}>поиск</button>
			<div className="result-container">

			</div>
		</div>
	)
}

export default App;
