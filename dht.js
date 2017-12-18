const DHT = require('bittorrent-dht');

module.exports = () => (port, needle, cb) => {
	// Fake an info hash
	needle = needle.slice(0, 40);

	// Join Bittorrent DHT
	const dht = new DHT();
	dht.listen();

	// Advertisment of the local peer
	dht.announce(needle, port);

	// Searching for remote peers
	dht.lookup(needle);
	dht.on('peer', (peer) => cb(peer));

	// Return stop method
	return () => dht.destroy();
};
