import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { serverGetPublicWorkouts, serverGetUserWorkouts } from "./Firebase";
import './PublicList.css'
import { PlayFill, PencilSquare, PlusSquare } from 'react-bootstrap-icons';
import UserProvider, { UserContext } from './UserProvider';

const WorkoutItem = (props) => {
    const context = useContext(UserContext);
    var el = props.workout;
    return (
        <div className="workoutItem">
            <p className="workoutTitle">
                <b>{el.workout.name}</b><br />
                Description: {el.workout.desc}
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
    const context = useContext(UserContext);
    
    useEffect(() => {
        if (context != null && workouts === null) {
            serverGetUserWorkouts(context.uid).then((res) => {
                setWorkouts(res)
            })
        }
    })

    var boxes;
    if (context === null) {
        boxes = <p>You must be signed in</p>;
    } else if (workouts === null) {
        boxes = <p>No workouts</p>;
    } else {
        boxes = workouts.map((row, index) => {
            return <WorkoutItem workout={row} />;
        });
    }
    return (
        <div id="workoutBox">            
            <div className="workoutItem">
                <p>Create Workout</p>
                <div id="nameWrapper">
                    <input
                        type="text"
                        name="name"
                        id="nameInput"
                        placeholder="Workout Name"
                        value={name}
                        onChange={setName} />
                </div>
                <Link to={"/edit/"}>
                    <PlusSquare size={30}/>
                </Link>
            </div>
            {boxes}
        </div>
    );
}

const NewList = () => {
    const [workouts, setWorkouts] = useState(null);
    const context = useContext(UserContext);
    
    useEffect(() => {
        serverGetPublicWorkouts()
        .then((result) => {
            setWorkouts(result);
        }, (error) => {
            console.log(error);
        });
    })

    var boxes;
    if (workouts === null) {
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
                <NewList />
            </Tab>
            <Tab eventKey="profile" title="Trainer">
                
            </Tab>
            <Tab eventKey="my" title="My Workouts">
                <MyWorkoutList/>
            </Tab>
        </Tabs>
    );
}

export default PublicList;