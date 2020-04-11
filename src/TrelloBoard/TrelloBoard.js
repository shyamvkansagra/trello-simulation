import React, { Component } from 'react';
import './styles.scss';

const colorCodes = {
	"todo": "skyblue",
	"wip": "yellow",
	"done": "lawngreen"
};

export default class TrelloBoard extends Component {
	state = {
		tasks: [
			{
				name:"Learn Angular",
				category:"wip"
			},
			{
				name: "xyz",
				category: "todo"
			},
			{
				name:"React",
				category:"wip"
			},
			{
				name:"Vue",
				category:"done"
			}
		]
	};

	addTask = () => {
		const { DataApis } = this.props;
		DataApis.createTask();
	}

	onDragOver = (event) => event.preventDefault();

	onDragStart = (event, id) => event.dataTransfer.setData("id", id);

	onDrop = (event, cat) => {
		let id = event.dataTransfer.getData("id");
		let tasks = this.state.tasks.filter((task) => {
			if (task.name == id) {
				task.category = cat;
			}
			return task;
		});
		this.setState({
			...this.state,
			tasks
		});
	}

	render() {
		var tasks = {
			todo: [],
			wip: [],
			done: []
		};
		this.state.tasks.forEach((t) => {
			tasks[t.category].push(
				<div className="task-item-wrap">
					<input
						key={t.name}
						onDragStart={(e)=>this.onDragStart(e, t.name)}
						draggable
						className="task-item"
						style={{backgroundColor: colorCodes[t.category]}}
						value={t.name}
					/>
					<button className="btn-plain">x</button>
				</div>
			);
		});
		
		return (
			<div className="notes-container">
				<div className="border-right task-col">
					<h2 className="">TODO</h2>
					{tasks.todo}
					<button onClick={this.addTask}>+ Add task</button>
				</div>
				<div
					className="border-right task-col"
					onDragOver={(e)=>this.onDragOver(e)}
					onDrop={(e)=>{this.onDrop(e, "wip")}}
				>
					<h2 className="">IN PROGRESS</h2>
					{tasks.wip}
				</div>
				<div
					className="task-col"
					onDragOver={(e)=>this.onDragOver(e)}
					onDrop={(e)=>this.onDrop(e, "done")}
				>
					<h2 className="">DONE</h2>
					{tasks.done}
				</div>
			</div>
		);
	}
}

