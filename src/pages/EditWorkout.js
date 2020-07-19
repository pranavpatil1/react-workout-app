import React, { Component } from 'react';
import WorkoutTable from '../WorkoutTable'
import WorkoutForm from '../WorkoutForm'
import queryString from 'querystring'

class EditWorkout extends Component {
    state = {
        workout: {
            name: "",
            job: "",
            data: []
        }
    };

    componentDidMount () {
        // need a check if the id parameter is not there or the workout doesnt exist
        this.index = queryString.parse(this.props.search.substring(1)).id;
        var workout = {...this.props.workouts[this.index]};
        console.log(workout);
        workout.data = [...workout.data];
        this.setState({
            workout: workout
        });
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
    }

    submitChanges = () => {
        this.props.updateWorkout(this.index, this.state.workout);
    }

    render() {
      return (
          <div className="container">
            <h1>Edit Workout: {this.state.workout.name}</h1>
            <p>A workout consists of exercises (either for an amount of time or number of reps) or rest time. 
                You can also repeat a set of exercises (for example, 1 round of a HITT circuit). To do so, start a repeating section and add the exercises you want to repeat.</p>
            <WorkoutForm addElement={this.addElement} workoutData={this.state.workout} />
            <WorkoutTable workoutData={this.state.workout} />
            <input id="submitWorkout" className="btn" type="button" value="Save Changes" onClick={this.submitChanges} />
        </div>
      );
    }
  }

export default EditWorkout;
