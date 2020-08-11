import React from 'react';
import { Link } from 'react-router-dom';

const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Notes</th>
          <th>Edit</th>
          <th>Play</th>
          <th>Remove</th>
        </tr>
      </thead>
    )
  }

  const TableBody = (props) => {
    const rows = props.workoutData.map((row, index) => {
    return (
        <tr key={index}>
            <td>{row.workout.name}</td>
            <td>{row.workout.job}</td>
            <td >
                <Link to={"/edit/"+row.id}>
                    <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </Link>
            </td>
            <td>
                <Link to={"/go/"+row.id}>
                    <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                </Link>
            </td>
            <td>
            <span  onClick={() => props.removeWorkout(row.id)} className="glyphicon glyphicon-trash clickable" aria-hidden="true"></span>
            </td>
        </tr>
        )
    })
    return <tbody>{rows}</tbody>
  }

const Table = (props) => {
    const { workoutData, removeWorkout } = props

    return (
      <table>
        <TableHeader />
        <TableBody 
            workoutData={workoutData}
            removeWorkout={removeWorkout}
        />
      </table>
    )
}

export default Table