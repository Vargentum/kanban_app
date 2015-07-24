import React from "react";
import Note from "./Note";

export default class Notes extends React.Component {

  constructor(props: {
    items: Array;
    onEdit: Function;
  }) {
    super(props)
  }

  removeItem(i) {
    var notes = this.props.items

    notes.splice(i, 1)

    this.setState({
      notes: notes
    })
  }

  render() {
    var notes = this.props.items

    return (
      <ul className="notes">{notes.map((note, i) =>
          <li className="note" key={'note' + i}>
            <Note style={{float: "left"}}
                  value={note.task} 
                  onEdit={this.props.onEdit.bind(null, i)} />
            <button onClick={(i) => this.removeItem(i)}>Remove</button>
          </li>
        )}
      </ul>
    )
  }
}