import React from 'react';
import './WorkoutTable.css'

const WorkoutTableHeader = () => {
    return (
      <thead>
        <tr>
          <th colSpan="2">Name</th>
          <th>Description</th>
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
                    desc = row.number + " seconds";
                } else {
                    desc = row.number + " reps";
                }
                if (row.desc !== "") {
                    desc += ". " + row.desc;
                }
            } else {
                name = "Rest";
                desc = row.number + " seconds";
            }
            var nameMain = <td key={index + 1000}>{(shift > 0 ? "in repeat: " : "") + name}</td>;
            var namePlaceholder = <td key={index + 2000} className="space"></td>;
            var other = [
                <td key={index + 3000}>{desc}</td>,
            ];
            // placeholder is separate so that some elements are indented in
            // this is temporary, will be replaced by SortableJS
            var fragment;
            if (shift > 0) {
                fragment = [namePlaceholder, nameMain, ...other];
            } else {
                fragment = [nameMain, namePlaceholder, ...other];
            }
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

    if (workoutData !== null) {
        console.log(workoutData)
        return (
            <table>
              <WorkoutTableHeader />
              <WorkoutTableBody 
                  workoutData={workoutData}
              />
            </table>
          )
    } else {
        return <table></table>;
    }
    
}

export default WorkoutTable