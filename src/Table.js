import React from 'react';
import { Link } from 'react-router-dom';

const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
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
            <td>{row.name}</td>
            <td>{row.job}</td>
            <td >
                <Link to={"/edit?id="+index}>
                    <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </Link>
            </td>
            <td >
                <Link to={"/go?id="+index}>
                    <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                </Link>
            </td>
            <td>
            <span  onClick={() => props.removeWorkout(index)} className="glyphicon glyphicon-trash" aria-hidden="true"></span>
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