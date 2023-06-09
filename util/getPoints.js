function getBalance(id, collection) {
	const user = collection.get(id);
	return user ? user.balance : 0;
}