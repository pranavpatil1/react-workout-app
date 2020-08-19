import React, { Component } from 'react'
import './WorkoutForm.css'
import { FormControl, InputGroup } from 'react-bootstrap';

class WorkoutForm extends Component {
    initialState = {
        isRepeat: false,
        isRest: false,
        name: "",
        desc: "",
        isTime: true,
        number: 30,
        children: 0
    }

    state = this.initialState;

    // -1 = not repeating. anything else = add elements to repeat
    repeatSection = -1;

    buttonMessage = "Add";

    handleChange = (event) => {
        const { name, value } = event.target

        if (name === "number" && value !== "") {
            this.setState({
                [name]: parseFloat(value),
            });
        } else {
            this.setState({
                [name]: value,
            });
        }
    }

    validateRepeat = () => {
        var error = false;
        if (document.getElementById("repeatName").value === "") {
            document.getElementById("repeatName").classList.add("error");
            error = true;
        } else {
            document.getElementById("repeatName").classList.remove("error");
        }
        if (document.getElementById("repeatNum").value === "" || parseFloat(document.getElementById("lengthNum").value) <= 0) {
            document.getElementById("repeatNum").classList.add("error");
            error = true;
        } else {
            document.getElementById("repeatNum").classList.remove("error");
        }
        
        if (document.getElementById("repeatSubmitButton").classList.contains("disabled"))
            error = true;

        return error;
    }

    addRepeat = () => {
        // if an error is found, exit
        if (this.validateRepeat()) return;

        this.repeatSection = this.props.workoutData.data.length;
        document.getElementById("repeatSubmitButton").classList.add("disabled");
        document.getElementById("endRepeatButton").classList.remove("disabled");
        
        this.setState({
            isRepeat: true,
            isRest: false,
            desc: "",
            isTime: true,
            number: parseInt(document.getElementById("repeatNum").value)
        }, () => {
            this.props.addElement(this.state, -1); // change -1 to the latest parent
            this.buttonMessage = "Add to Repeat x" + this.state.number;
        });
    }

    endRepeat = () => {
        document.getElementById("repeatSubmitButton").classList.remove("disabled");
        document.getElementById("endRepeatButton").classList.add("disabled");
        this.buttonMessage = "Add";
        this.repeatSection = -1;
    }

    validateElement = () => {
        var error = false;
        if (document.getElementById("exerciseName").value === "") {
            document.getElementById("exerciseName").classList.add("error");
            error = true;
        } else {
            document.getElementById("exerciseName").classList.remove("error");
        }
        if (document.getElementById("lengthNum").value === "" || parseFloat(document.getElementById("lengthNum").value) < 0) {
            document.getElementById("lengthNum").classList.add("error");
            error = true;
        } else {
            document.getElementById("lengthNum").classList.remove("error");
        }
        return error;
    }

    addElement = () => {
        if (this.validateElement()) return;

        this.setState({
            isRepeat: false,
            isRest: false,
            number: parseFloat(document.getElementById("lengthNum").value),
            isTime: document.getElementById("time1").classList.contains("selected")
        }, () => {
            this.props.addElement(this.state, this.repeatSection); // change -1 to the latest parent
        });
        
    }

    validateRest = () => {
        var error = false;
        if (document.getElementById("restTime").value === "" || parseFloat(document.getElementById("restTime").value) < 0) {
            document.getElementById("restTime").classList.add("error");
            error = true;
        } else {
            document.getElementById("restTime").classList.remove("error");
        }
        return error;
    }
    addRest = () => {
        if (this.validateRest()) return;

        this.setState({
            isRepeat: false,
            isRest: true,
            name: "",
            desc: "",
            isTime: true,
            number: parseFloat(document.getElementById("restTime").value)
        }, () => {
            this.props.addElement(this.state, this.repeatSection); // change -1 to the latest parent
        });
    }

    setTimeMode = (event) => {
        this.setState({
            isTime: true
        });
        document.getElementById("lengthLabel").innerText = "seconds";
        document.getElementById("time1").classList.add("selected");
        document.getElementById("time2").classList.remove("selected");
    }

    setRepMode = (event) => {
        this.setState({
            isTime: false
        });
        document.getElementById("lengthLabel").innerText = "reps";
        document.getElementById("time2").classList.add("selected");
        document.getElementById("time1").classList.remove("selected");
    }

    render() {
        return (
            <div>
                <h3>Edit Workout</h3>
            <h5>Create a Repeating Section</h5>
            <div className="container">
                <form>
                    <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="repeatName"
                            placeholder="Circuit 1"
                            onChange={this.handleChange} />
                    <label htmlFor="repeatNum">Length</label>
                    <InputGroup className="mb-3 length-group">
                        <FormControl
                            id="repeatNum" type="number" name="number" className="form-control" onChange={this.handleChange} aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">repeats</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>

                    <input id="repeatSubmitButton" className="btn" type="button" value="Add" onClick={this.addRepeat} />
                    <input id="endRepeatButton" className="btn disabled" type="button" value="End Repeat" onClick={this.endRepeat} />
                </form>
            </div>
            <h5>Add an element</h5>
            <div className="container inputRow">
                <div className="inputColumn ">
                    <h5 className="no-margin-top">Exercise</h5>
                    <form>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="exerciseName"
                            placeholder="Pushup"
                            onChange={this.handleChange} />

                        <label htmlFor="desc">Description</label>
                        <input
                            type="text"
                            name="desc"
                            id="desc"
                            onChange={this.handleChange} />

                        <label htmlFor="time">Time or # of Reps?</label>
                        <div id="time-rep-selector" className="btn-group btn-group-justified" role="group" aria-label="...">
                            <div className="btn-group" role="group">
                                <input onClick={this.setTimeMode} value="Time" name="time" id="time1" type="button" className="btn btn-default selected" />
                            </div>
                            <div className="btn-group" role="group">
                                <input onClick={this.setRepMode} value="Reps" name="time" id="time2" type="button" className="btn btn-default" />
                            </div>
                        </div>

                        <label htmlFor="number">Length</label>
                        
                        <InputGroup className="mb-3 length-group">
                            <FormControl
                                id="lengthNum" type="number" name="number" className="form-control" onChange={this.handleChange} aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="lengthLabel">seconds</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        <input id="exerciseAddButton" type="button" value={this.buttonMessage} onClick={this.addElement} />
                    </form>
                </div>
                
                <div className="inputColumn">
                    <h5 className="no-margin-top">Rest Time</h5>
                    <form>
                        <label htmlFor="restTime">Length</label>
                        
                        <InputGroup className="mb-3 length-group">
                            <FormControl
                                id="restTime" type="number" name="number" className="form-control" onChange={this.handleChange} aria-describedby="basic-addon2" 
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="lengthLabel">seconds</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        <input id="restAddButton" type="button" value={this.buttonMessage} onClick={this.addRest} />
                    </form>
                </div>
            </div>
            </div>
        );
    }
}

export default WorkoutForm;