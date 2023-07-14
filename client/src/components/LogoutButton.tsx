const LogoutButton = () => {
	const logout = () => {
		localStorage.removeItem("token");
		console.log("User is logged out");
	};

	return (
		<button
			className="border border-white-600 hover:border-slate-400 rounded-full font-bold px-8 py-2"
			onClick={logout}>
			Logout
		</button>
	);
};

export default LogoutButton;
