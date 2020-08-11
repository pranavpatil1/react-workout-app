import React from 'react';
import Table from '../Table'
import Form from '../Form'
import Header from '../Header'
import {auth} from '../Firebase'

const Workouts = (props) => {
    if (auth.currentUser !== null && !auth.currentUser) {
        console.log(auth.currentUser)
        // return <Redirect  to="/login"/>
    }
    return (
        <>
        <Header />
        <div className="container">
            <h2>Create a workout</h2>
            <Form handleSubmit={props.handleSubmit} />
            <h2>Workouts</h2>
            <Table workoutData={props.workouts} removeWorkout={props.removeWorkout}/>
        </div>
        </>
    );
}

export default Workouts;
