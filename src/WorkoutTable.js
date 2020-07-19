import React from 'react';
import './WorkoutTable.css'

const WorkoutTableHeader = () => {
    return (
      <thead>
        <tr>
          <th colSpan="2">Name</th>
          <th>Description</th>
          <th>Remove</th>
        </tr>
      </thead>
    )
  }

    const WorkoutTableBody = (props) => {
        // handles the keys needing to include the children of repeat elements
        var shift = 0;
        var name, desc;
        const rows = props.workoutData.data.map((row, index) => {
            if (row.isRepeat) {
                name = "Repeat x" + row.number;
                desc = row.name;
            } else if (!row.isRest) {
                name = row.name;
                if (row.isTime) {
                    desc = row.number + " reps";
                } else {
                    desc = row.number + " seconds";
                }
                if (row.desc !== "") {
                    desc += ". " + row.desc;
                }
            } else {
                name = "Rest";
                desc = row.number + " seconds";
            }
            var nameMain = <td>{(shift > 0 ? "in repeat: " : "") + name}</td>;
            var namePlaceholder = <td className="space"></td>;
            var other = [
                <td>{desc}</td>,
                <td className="delete"><span  onClick={() => console.log("yeet")} className="glyphicon glyphicon-remove" aria-hidden="true"></span></td>
            ];
            // placeholder is separate so that some elements are indented in
            // this is temporary, will be replaced by SortableJS
            var fragment;
            if (shift > 0) {
                fragment = [namePlaceholder, nameMain, ...other];
            } else {
                fragment = [nameMain, namePlaceholder, ...other];
            }
            console.log(index);
            const main = (
                <tr key={index} className={`workoutRow${row.isRepeat ? " repeat": ""}${shift > 0 ? " child": ""}`}>
                    {fragment}
                </tr>
            )
            if (row.isRepeat) {
                shift = row.children;
            } else {
                shift --;
            }
            return main;
        })
        return <tbody>{rows}</tbody>
    }

const WorkoutTable = (props) => {
    const { workoutData } = props

    return (
      <table>
        <WorkoutTableHeader />
        <WorkoutTableBody 
            workoutData={workoutData}
        />
      </table>
    )
}

export default WorkoutTable