import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

import WorkoutTable from '../WorkoutTable'
import Header from '../Header'
import { serverGetWorkoutById } from '../Firebase';

const View = (props) => {
    const [workout, setWorkout] = useState(null);
    const [redirect, setRedirect] = useState("");

    useEffect (() => {
        // need a check if the id parameter is not there or the workout doesnt exist
        if (props.id == "") {
            setRedirect("/");
            return;
        }

        if (workout === null) {
            serverGetWorkoutById(props.id)
            .then((data) => {
                if (data !== null) {
                    console.log(data);
                    setWorkout(data);
                } else {
                    setRedirect("/");
                    return;
                }
            })
        }
        
    });

    if (redirect) {
        return <Redirect to={redirect} />
    }
    if (workout === null) {
        return (
            <>
            <Header />
            </>
        );
    }
    return (
        <>
        <Header />
        <div className="container">
            <h1>View Workout: {workout.name}</h1>
            <p>{workout.desc !== "" ? "Description: " + workout.desc : ""}</p>
            <WorkoutTable workoutData={workout} />
        </div>
        </>
    );
  }

export default View;
