import CONFIG from '../globals/config';

const CacheHelper = {
	async cachingAppShell(request) {
		const cache = await this._openCache();
		cache.addAll(request);
	},

	async deleteOldCache() {
		const cachesName = await caches.keys();
		cachesName
			.filter((name) => name !== CONFIG.CACHE_NAME)
			.map((filteredName) => caches.delete(filteredName));
	},

	async revalidateCache(request) {
		const response = await caches.match(request);

		if (response) {
			this._fetchCache(request);
			return response;
		}

		return this._fetchCache(request);
	},

	async _openCache() {
		return caches.open(CONFIG.CACHE_NAME);
	},

	async _fetchCache(request) {
		const response = await fetch(request);

		if (!response || response.status !== 200) {
			return response;
		}

		await this._addCache(request);
		return response;
	},

	async _addCache(request) {
		const cache = await this._openCache();
		console.log(request.method);
		if (!request.method === 'POST') {
			cache.add(request);
		}
	},
};

export default CacheHelper;
