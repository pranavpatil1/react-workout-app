import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Prompt } from 'react-router';

import WorkoutTable from '../WorkoutTable'
import WorkoutForm from '../WorkoutForm'
import Header from '../Header'
import WorkoutSettings from '../WorkoutSettings';

class EditWorkout extends Component {
    state = {
        workout: {
            name: "",
            job: "",
            data: [],
            dateCreated: 0,
            uid: "",
            isPublic: 0
        },
        redirect: null,
        unsaved: false
    };

    componentDidMount () {
        // need a check if the id parameter is not there or the workout doesnt exist
        if (this.props.id == "") {
            this.setState({
                redirect:"/workouts"
            });
            return;
        }

        var workoutOrig = this.props.workouts.find(w => w.id === this.props.id);
        
        if (workoutOrig == null) {
            this.setState({
                redirect:"/workouts"
            });
            return;
        }
        var workout = {...workoutOrig.workout};
        workout.data = [...workout.data];
        this.setState({
            workout: workout
        });
    }

    componentDidUpdate = () => {
        if (this.state.unsaved) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = undefined;
        }
    }

    updateDetails = (name, desc, privacy) => {
        var newWorkout = {...this.state.workout};
        newWorkout.name = name;
        newWorkout.job = desc;
        newWorkout.isPublic = privacy;
        this.setState({
            workout: newWorkout
        }, () => {
            this.props.updateWorkout(this.props.id, this.state.workout);
        });
    }

    addElement = (element, parent) => {
        var newWorkout = {...this.state.workout};
        if (parent === -1) {
            newWorkout.data = [...this.state.workout.data, element];
            this.setState({
                workout: newWorkout
            }, () => {
                console.log(this.state.workout);
            });
        } else {
            var newParent = {...this.state.workout.data[parent]};
            newParent.children ++;
            newWorkout.data = [...this.state.workout.data.slice(0, parent), 
                newParent,
                ...this.state.workout.data.slice(parent+1), 
                element];
            this.setState({
                workout: newWorkout
            }, () => {
                console.log(this.state.workout);
            });
        }
        this.setState({
            unsaved: true
        });
    }

    submitChanges = () => {
        this.props.updateWorkout(this.props.id, this.state.workout);
        
        this.setState({
            unsaved: false
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <>
            <Header />
            <div className="container">
                <h1>Edit Workout: {this.state.workout.name}</h1>
                <p>A workout consists of exercises (either for an amount of time or number of reps) or rest time. 
                    You can also repeat a set of exercises (for example, 1 round of a HITT circuit). To do so, start a repeating section and add the exercises you want to repeat.</p>
                <WorkoutSettings  workoutData={this.state.workout} updateDetails={this.updateDetails}/>
                <WorkoutForm addElement={this.addElement} workoutData={this.state.workout} />
                <input id="submitWorkout" className="btn" type="button" value="Save Workout" onClick={this.submitChanges} />
                <WorkoutTable workoutData={this.state.workout} />
                <Prompt
                    when={this.state.unsaved}
                    message='You have unsaved changes, are you sure you want to leave?'
                />
            </div>
            </>
        );
    }
  }

export default EditWorkout;
