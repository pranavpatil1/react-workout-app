import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Prompt } from 'react-router';
import { UserContext } from '../UserProvider';
import {serverGetWorkoutById, serverUpdateWorkout, serverDeleteWorkoutById} from '../Firebase';

import WorkoutTable from '../WorkoutTable'
import WorkoutForm from '../WorkoutForm'
import Header from '../Header'
import WorkoutSettings from '../WorkoutSettings';
import { Trash } from 'react-bootstrap-icons';
import { Button, Modal } from 'react-bootstrap';

import './EditWorkout.css'

class EditWorkout extends Component {
    static contextType = UserContext;

    state = {
        workout: null,
        servWorkout: null,
        redirect: null,
        unsaved: false,
        showWarning: false
    };

    componentDidMount () {
        // need a check if the id parameter is not there or the workout doesnt exist
        if (this.props.id == "") {
            this.setState({
                redirect:"/"
            });
            return;
        }

        if (this.state.workout === null) {
            serverGetWorkoutById(this.props.id)
            .then((data) => {
                if (data !== null) {
                    var copy = {...data};
                    copy.data = [...copy.data];
                    this.setState({
                        workout: data,
                        servWorkout: copy
                    });
                } else {
                    this.setState({
                        redirect: "/"
                    });
                    return;
                }
            }, () => {
                this.setState({
                    redirect:"/"
                });
            })
        }
        
    }

    componentDidUpdate = () => {
        if (this.state.unsaved) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = undefined;
        }
    }

    addElement = (element, parent) => {
        var newWorkout = {...this.state.workout};
        if (parent === -1) {
            newWorkout.data = [...this.state.workout.data, element];
            this.setState({
                workout: newWorkout
            }, () => {
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
            });
        }
        this.setState({
            unsaved: true
        });
    }

    updateDetails = () => {
        var newWorkout = {...this.state.servWorkout};
        newWorkout.name = this.state.workout.name;
        newWorkout.desc = this.state.workout.desc;
        newWorkout.isPublic = this.state.workout.isPublic;
        this.setState({
            servWorkout: newWorkout
        });
        serverUpdateWorkout(this.props.id, newWorkout);
    }

    submitChanges = () => {
        var newWorkout = {...this.state.servWorkout};
        newWorkout.data = [...this.state.workout.data]
        this.setState({
            servWorkout: newWorkout
        });
        serverUpdateWorkout(this.props.id, newWorkout);
        
        this.setState({
            unsaved: false
        });
    }

    handleChange = (event) => {
        var newWorkout = {...this.state.workout};

        const { name, value } = event.target

        if (name === "isPublic" && value !== "") {
            newWorkout[name] = parseInt(value);
        } else {
            
            newWorkout[name] = value;
        }

        this.setState({
            workout: newWorkout
        });
    }

    confirmDelete = () => {
        this.setState({showWarning: true})
        serverDeleteWorkoutById(this.props.id);
        this.setState({
            redirect: "/"
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        if (this.state.workout === null) {
            return <Header />;
        }
        return (
            <>
            <Header />
            <div className="container">
                <div id="editHeader">
                    <h1>Edit Workout: {this.state.workout.name}</h1>
                    <Trash className="clickable" size={30} onClick={() => this.setState({showWarning: true})}/>
                </div>
                <p>A workout consists of exercises (either for an amount of time or number of reps) or rest time. 
                    You can also repeat a set of exercises (for example, 1 round of a HITT circuit). To do so, start a repeating section and add the exercises you want to repeat.</p>
                <WorkoutSettings workoutData={this.state.workout} handleChange={this.handleChange} updateDetails={this.updateDetails}/>
                <WorkoutForm addElement={this.addElement} workoutData={this.state.workout} />
                <input id="submitWorkout" className="btn" type="button" value="Save Workout" onClick={this.submitChanges} />
                <WorkoutTable workoutData={this.state.workout} />
                <Prompt
                    when={this.state.unsaved}
                    message='You have unsaved changes, are you sure you want to leave?'
                />
                <Modal show={this.state.showWarning} onHide={() => this.setState({showWarning: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this workout? This action cannot be undone</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({showWarning: false})}>
                            Cancel
                        </Button>
                        <Button id="confirmDeleteButton" variant="danger" onClick={this.confirmDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            </>
        );
    }
  }

export default EditWorkout;
