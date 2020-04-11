const DataApis = {
	createTask: () => {
		window.localStorage.setItem("shyam", "test");
	},
	getTasks: () => {
		window.localStorage.getItem("");
	}
};

export default DataApis;