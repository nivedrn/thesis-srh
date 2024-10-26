const redis = require("redis");

const client = redis.createClient();

async function storeSessionData(sessionId, sessionData) {
	try {
		if (!client.isOpen) {
			await client.connect();
		}
		const sessionDataString = JSON.stringify(sessionData);
		await client.hSet(sessionId, "sessionData", sessionDataString);
		console.log(`Room data stored for session ID: ${sessionId}`);
	} catch (error) {
		console.error("Error storing room data in Redis:", error);
	}
}

async function retrieveSessionData(sessionId) {
	try {
		if (!client.isOpen) {
			await client.connect();
		}
		const sessionDataString = await client.hGet(sessionId, "sessionData");

		if (sessionDataString !== null) {
			const sessionData = JSON.parse(sessionDataString); // Parse JSON back to a JS object
			return sessionData;
		} else {
			console.log(`No room data found for delivery ID: ${sessionId}`);
			return null; // Indicate no data found
		}
	} catch (error) {
		console.error("Error retrieving room data from Redis:", error);
		return null; // Indicate retrieval error
	}
}

module.exports = (io) => {
	io.on("connection", async (socket) => {
		socket.on("join-room", async (sessionId, callback) => {
			socket.join(sessionId);

			io.in(sessionId).emit("feedback", "New viewer joined");
			console.log(socket.id + " joined ROOM ID:" + sessionId);
			callback({
				roomId: sessionId,
				message: socket.id + " joined ROOM ID:" + sessionId,
			});
		});

		socket.on("update-workspace", async (sessionId, workspaceData) => {
			//let sessionData = await retrieveSessionData(sessionId);
            console.log(workspaceData);
			// if (!sessionData) {
			// 	sessionData = {
			// 		routeIndex: 0,
			// 		pathIndex: 0,
			// 		isDeliveryComplete: false,
			// 		completedDeliveries: [],
			// 	};
			// 	await storesessionData(sessionId, sessionData);
			// }

			// if (sessionData) {
			// 	console.log(sessionData);
			// } else {
			// 	console.error(
			// 		`Error: Delivery ID ${sessionId} not found in room data.`
			// 	);
			// }
		});

		socket.on("disconnecting", () => {
			console.log("disconnecting from : ");
			console.log(socket.rooms); // the Set contains at least the socket ID

			socket.rooms.forEach(function (roomId) {
				console.log(socket.id + " disconnecting from " + roomId);
			});
		});

		socket.on("disconnected", () => {
			console.log(socket.id + " disconnected.");
		});

		socket.on("connect_error", (err) => {
			console.log(`connect_error due to ${err.message}`);
		});
	});
};