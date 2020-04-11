import React from 'react';

const colorCodes = {
	"todo": "skyblue",
	"wip": "yellow",
	"done": "lawngreen"
};

export default class TaskItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputVal: props.task.content
		}
	}

	handleOnChange = (e) => {
		this.setState({ inputVal: e.currentTarget.value });
	}

	saveTask = () => {
		const { DataApis, task } = this.props;
		const { inputVal } = this.state;
		DataApis.updateTask(task.id, inputVal, task.status);
	}

	render() {
		const { task, onDragStart, deleteTask } = this.props;
		const { inputVal } = this.state;
		return (
			<div className="task-item-wrap">
				<textarea
					onDragStart={(e) => onDragStart(e, task.id)}
					draggable
					className="task-item"
					style={{ backgroundColor: colorCodes[task.status] }}
					placeholder="Add something"
					value={inputVal}
					onChange={this.handleOnChange}
					onBlur={this.saveTask}
				>{inputVal}</textarea>
				<button
					className="btn-plain"
					onClick={() => deleteTask(task.id)}
				>x</button>
			</div>
		);
	}
}