import React from "react";
import Notes from "./Notes";


export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      notes: [
        {task: "Learn Webpack"},
        {task: "Learn React"},
        {task: "Learn ES6"}
      ]
    }
  }

  addItem() {
    this.setState({
      notes: this.state.notes.concat({
        task: "New task"
      })      
    })
  }

  removeItem() {
    var notes = this.state.notes

    this.setState({
      notes: notes.slice(0, -1)
    })
  }

  
  itemEdited(i, task) {
    var notes = this.state.notes

    if(task) {
      notes[i].task = task
    }
    else {
      notes.splice(i, 1)
    }

    this.setState({
      notes: notes
    })
  }


  render(){

    var notes = this.state.notes

    return (
      <div>
        <Notes items={notes}
               onEdit={(i, task) => this.itemEdited(i, task)} />
        <button onClick={() => this.addItem()}>Add Item</button>
      </div>
    );
  }
}