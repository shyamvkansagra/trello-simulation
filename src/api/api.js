const getTasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
const setTasks = (tasks) => window.localStorage.setItem("tasks", JSON.stringify(tasks));

const DataApis = {
	checkAndInit: () => {
		if (!window.localStorage.getItem("tasks")) {
			window.localStorage.setItem("tasks", JSON.stringify([]));
		}
	},
	createTask: (status) => {
		const tasks = getTasks || [];
		tasks.push({
			id: +new Date(),
			content: "",
			status: status
		});
		setTasks(tasks);
		return tasks;
	},
	getTasks: () => {
		return getTasks;
	},
	updateTask: (id, content, status) => {
		const tasks = getTasks;
		const taskToUpdate = tasks.filter(t => t.id == id)[0];
		taskToUpdate.content = content;
		setTasks(tasks);
	},
	deleteTask: (id) => {
		const tasks = getTasks;
		const taskToDeleteIndex = tasks.findIndex(t => t.id == id);
		tasks.splice(taskToDeleteIndex, 1);
		setTasks(tasks);
		return tasks;
	}
};

export default DataApis;