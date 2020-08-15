import React, { useState, useEffect } from 'react';

import { serverGetPublicWorkouts } from "./Firebase";
import './PublicList.css'

const PublicList = () => {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        serverGetPublicWorkouts()
        .then((result) => {
            setWorkouts(result);
        }, (error) => {
            console.log(error);
        });
    })

    if (workouts === null) {
        return (
            <>
                <h2>New</h2>
                <p>No public workouts</p>
            </>
            );
    } else {
        const boxes = workouts.map((row, index) => {
            return (
                <div className="workoutItem">
                    <p className="workoutTitle">{row.workout.name}</p>
                    <p className="no-margin-top">Description: {row.workout.desc}</p>
                </div>
            );
        });
    
        return (
            <>
                <h2>New</h2>
                <div id="workoutBox">
                    {boxes}
                </div>
            </>
        );
    }
}

export default PublicList;