import { useEffect, useState } from 'react';
import { createApi } from "unsplash-js";

const api = createApi({
	accessKey: "jNqz_6AEsQgeSbDxMEp_2zvSqbtHybqEnrUaaL6wyPY",
});


const useImageSearch = (query: string, pageNumber: number) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [images, setImages] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		setImages([]);
	}, [query]);

	useEffect(() => {
		setLoading(true);
		setError(false);
		api.search
			.getPhotos({
				query: query,
				page: pageNumber,
				orientation: "landscape",
				perPage: 30
			})
			.then(result => {
				setImages(prevImages => {
					return [...prevImages, ...result.response.results.map(item => item.urls.regular)]
				})
				console.log(result.response.results.length > 0);
				setHasMore(result.response.results.length > 0);
				console.log(hasMore);
				setLoading(false);
			})
			.catch(() => {
				setError(true);
				console.log("something went wrong!");
			});
	}, [query, pageNumber]);

	return { loading, error, images, hasMore };
}

export default useImageSearch;