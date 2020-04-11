import React, { Component } from 'react';
import TaskItem from './TaskItem';
import './styles.scss';

export default class TrelloBoard extends Component {
	state = {
		tasks: []
	};

	addTask = (status) => {
		const { DataApis } = this.props;
		const tasks = DataApis.createTask(status);
		this.setState({ tasks });
	}

	deleteTask = id => {
		const { DataApis } = this.props;
		const tasks = DataApis.deleteTask(id);
		this.setState({ tasks });
	}

	onDragOver = (event) => event.preventDefault();

	onDragStart = (event, id) => event.dataTransfer.setData("id", id);

	onDrop = (event, status) => {
		const { DataApis } = this.props;
		let id = event.dataTransfer.getData("id");
		let tasks = this.state.tasks.filter((task) => {
			if (task.id == id) {
				task.status = status;
			}
			return task;
		});
		this.setState({ tasks }, () => {
			DataApis.updateTask(id, tasks.filter(t => t.id == id)[0].content, status);
		});
	}

	componentDidMount = () => {
		const { DataApis } = this.props;
		const tasks = DataApis.getTasks() || [];
		this.setState({ tasks });
	}

	render() {
		var tasks = {
			todo: [],
			wip: [],
			done: []
		};
		const { DataApis } = this.props;

		this.state.tasks.forEach((t) => {
			tasks[t.status].push(
				<TaskItem
					key={t.id}
					task={t}
					onDragStart={(e) => this.onDragStart(e, t.id)}
					DataApis={DataApis}
					deleteTask={this.deleteTask}
				/>
			);
		});
		
		return (
			<div className="notes-container">
				<div
					className="border-right task-col"
					onDragOver={e => this.onDragOver(e)}
					onDrop={e => this.onDrop(e, "todo")}
				>
					<h2 className="">TODO</h2>
					{tasks.todo}
					<button className="add-task-btn" onClick={() => this.addTask("todo")}>+ Add task</button>
				</div>
				<div
					className="border-right task-col"
					onDragOver={(e) => this.onDragOver(e)}
					onDrop={(e) => this.onDrop(e, "wip")}
				>
					<h2 className="">IN PROGRESS</h2>
					{tasks.wip}
					<button className="add-task-btn" onClick={() => this.addTask("wip")}>+ Add task</button>
				</div>
				<div
					className="task-col"
					onDragOver={(e) => this.onDragOver(e)}
					onDrop={(e) => this.onDrop(e, "done")}
				>
					<h2 className="">DONE</h2>
					{tasks.done}
					<button className="add-task-btn" onClick={() => this.addTask("done")}>+ Add task</button>
				</div>
			</div>
		);
	}
}

