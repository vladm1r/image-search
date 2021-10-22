import React, { useState, useRef, useEffect } from 'react';

import useImageSearch from './services/useImageSearch';
// import useIntersectionObserver from './services/useIntersectionObserver';
import loader from './assets/preloader.gif';

import './app.scss';

const App = () => {
	const [query, setQuery] = useState('');
	const [tempQuery, setTempQuery] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [lastElement, setLastElement] = useState(null);

	const {
		images,
		loading,
		hasMore,
		error
	} = useImageSearch(query, pageNumber);

	const observer = useRef(
		new IntersectionObserver(
			(entries) => {
				const first = entries[0];
				if (first.isIntersecting) {
					setPageNumber((prevNum) => prevNum + 1);
				}
			})
	);

	useEffect(() => {
		if (loading || !hasMore) return;

		const currentElement = lastElement;
		const currentObserver = observer.current;

		if (currentElement) {
			currentObserver.observe(currentElement);
		}

		return () => {
			if (currentElement) {
				currentObserver.unobserve(currentElement);
			}
		};
	}, [lastElement, loading, hasMore]);

	function handleInput(e) {
		setTempQuery(e.target.value);
	}

	function handleSearch() {
		setQuery(tempQuery);
		setPageNumber(1);
	}


	return (
		<div className="app">

			<div className="search-input-container">
				<input type="text" className="search-input"
					onChange={handleInput}
					onKeyPress={(e) => e.key === "Enter" && handleSearch()}
					placeholder="e. g. cat" />
				<button className="search-input-btn" onClick={handleSearch}>search</button>
			</div>

			<div className="result-container">
				{images.map((item, index) => {
					if (images.length === index + 1) {
						return (
							<div key={item} className="image-container" ref={setLastElement}>
								<img src={item} alt="" />
							</div>
						)
					} else {
						return (
							<div key={item} className="image-container">
								<img src={item} alt="" />
							</div>
						)
					}
				})}
			</div>
			{loading &&
				<div className="loader-container">
					<img src={loader} alt="" />
				</div>
			}
			{error &&
				<div className="error-container">
					Somethig went wrong :(
				</div>
			}
		</div>
	)
}

export default App;
