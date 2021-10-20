import { useEffect, useState } from 'react';
import { createApi } from "unsplash-js";

const api = createApi({
	accessKey: "jNqz_6AEsQgeSbDxMEp_2zvSqbtHybqEnrUaaL6wyPY"
});


const useImageSearch = (query: string, pageNumber: number) => {

	useEffect(() => {
		api.search
			.getPhotos({
				query: query,
				page: pageNumber,
				orientation: "landscape"
			})
			.then(result => {
				console.log(result);
			})
			.catch(() => {
				console.log("something went wrong!");
			});
	}, [query, pageNumber])

	return null
}

export default useImageSearch;