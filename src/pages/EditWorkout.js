import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Prompt } from 'react-router';

import WorkoutTable from '../WorkoutTable'
import WorkoutForm from '../WorkoutForm'
import Header from '../Header'

import queryString from 'querystring'

class EditWorkout extends Component {
    state = {
        workout: {
            name: "",
            job: "",
            data: []
        },
        redirect: null,
        unsaved: false
    };

    componentDidMount () {
        // need a check if the id parameter is not there or the workout doesnt exist
        if (this.props.search.length === 0) {
            this.setState({
                redirect:"/"
            });
            return;
        }
        this.index = queryString.parse(this.props.search.substring(1)).id;
        if (this.index === undefined || this.index >= this.props.workouts.length) {
            this.setState({
                redirect:"/"
            });
            return;
        }
        var workout = {...this.props.workouts[this.index]};
        workout.data = [...workout.data];
        this.setState({
            workout: workout
        });
    }

    componentDidUpdate = () => {
        if (this.state.unsaved) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    }

    addElement = (element, parent) => {
        if (parent === -1) {
            this.setState({
                workout: {
                    name: this.state.workout.name,
                    job: this.state.workout.job,
                    data: [...this.state.workout.data, element]
                }
            });
        } else {
            var newParent = {...this.state.workout.data[parent]};
            newParent.children ++;
            this.setState({
                workout: {
                    name: this.state.workout.name,
                    job: this.state.workout.job,
                    data: [...this.state.workout.data.slice(0, parent), 
                        newParent,
                        ...this.state.workout.data.slice(parent+1), 
                        element]
                }
            }, () => {
                console.log(this.state.workout);
            });
        }
        this.setState({
            unsaved: true
        });
    }

    submitChanges = () => {
        this.props.updateWorkout(this.index, this.state.workout);
        
        this.setState({
            unsaved: false
        });
    }

    render() {
    if (this.state.redirect) {
        console.log("yeet");
        return <Redirect to={this.state.redirect} />
    }
      return (
            <>
            <Header />
            <div className="container">
                <h1>Edit Workout: {this.state.workout.name}</h1>
                <p>A workout consists of exercises (either for an amount of time or number of reps) or rest time. 
                    You can also repeat a set of exercises (for example, 1 round of a HITT circuit). To do so, start a repeating section and add the exercises you want to repeat.</p>
                <WorkoutForm addElement={this.addElement} workoutData={this.state.workout} />
                <input id="submitWorkout" className="btn" type="button" value="Save Changes" onClick={this.submitChanges} />
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
