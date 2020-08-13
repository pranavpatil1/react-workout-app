import React, { useState } from 'react';

import { serverGetPublicWorkouts } from "./Firebase";

const PublicList = () => {
    const [workouts, setWorkouts] = useState(null);

    serverGetPublicWorkouts()
    .then((result) => {
        setWorkouts(result);
    }, (error) => {
        console.log(error);
    });

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
                <>
                    <p>Name: {row.workout.name}</p>
                    <p className="no-margin-top">Description: {row.workout.desc}</p>
                </>
            );
        });
    
        return (
            <>
                <h2>New</h2>
                <div className="workoutBox"></div>
                {boxes}
            </>
        );
    }
}

export default PublicList;