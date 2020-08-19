import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { serverGetPublicWorkouts, serverGetUserWorkouts, serverAddWorkout } from "./Firebase";
import './PublicList.css'
import { PlayFill, PencilSquare, PlusSquare } from 'react-bootstrap-icons';
import { UserContext } from './UserProvider';

const WorkoutItem = (props) => {
    const context = useContext(UserContext);
    var el = props.workout;
    return (
        <div className="workoutItem">
            <p className="workoutTitle">
                <b>{el.workout.name}</b><br />
                {el.workout.desc !== undefined && el.workout.desc !== "" ? "Description: " + el.workout.desc : " "}
            </p>
            <div className="workoutButtons">
                <Link to={"/view/"+el.id}>
                    View
                </Link>
                
                <div>
                    <Link className={"editButton" + (context !== null && el.workout.uid === context.uid ? "" : " hide")} to={"/edit/"+el.id}>
                        <PencilSquare size={20}/>
                    </Link>
                    <Link to={"/go/"+el.id}>
                        <PlayFill size={24}/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const MyWorkoutList = () => {
    const [workouts, setWorkouts] = useState(null);
    const [name, setName] = useState("");
    const [redirect, setRedirect] = useState("");
    const context = useContext(UserContext);
    
    useEffect(() => {
        if (context != null && workouts === null) {
            serverGetUserWorkouts(context.uid).then((res) => {
                setWorkouts(res)
            })
        }
    })

    const createWorkout = () => {
        var workout = {
            name: name,
            desc: "",
            data: [],
            dateCreated: 0,
            uid: context.uid,
            isPublic: 0
        };
        serverAddWorkout(workout)
        .then((id) => {
            setRedirect("/edit/"+id);
        })
    }

    var boxes = (
        <div className="workoutItem">
            <p>Create Workout</p>
            <div id="createWrapper">
                <input
                    type="text"
                    name="name"
                    id="nameInput"
                    placeholder="Workout Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)} />
                <div onClick={createWorkout} className="clickable">
                    <PlusSquare id="createButton" size={30}/>
                </div>
            </div>
        </div>
    );
    if (context == null || !context.uid) {
        boxes = <p>You must be signed in</p>;
    } else if (workouts === null) {
        
    } else {
        boxes = [
            boxes,
            workouts.map((row, index) => {
                return <WorkoutItem workout={row} />;
            })
        ];
    }

    if (redirect !== "") {
        return <Redirect to={redirect} />;
    }

    return (
        <div id="workoutBox">
            {boxes}
        </div>
    );
}

const NewList = () => {
    const [workouts, setWorkouts] = useState(null);
    
    useEffect(() => {
        serverGetPublicWorkouts()
        .then((result) => {
            setWorkouts(result);
        }, (error) => {
            console.log(error);
        });
    })

    var boxes;
    if (workouts == null || workouts.length === 0) {
        boxes = <p>No public workouts</p>;
    } else {
        boxes = workouts.map((row, index) => {
            return <WorkoutItem workout={row} />
        });
    }
    return (
        <div id="workoutBox">
            {boxes}
        </div>
    );
}

const PublicList = () => {
    return (
        <Tabs defaultActiveKey="home" id="controlled-tab">
            <Tab eventKey="home" title="New">
            </Tab>
            <Tab eventKey="my" title="My Workouts">
                <MyWorkoutList/>
            </Tab>
            <Tab eventKey="profile" title="Trainer" disabled>

            </Tab>
        </Tabs>
    );
}

export default PublicList;