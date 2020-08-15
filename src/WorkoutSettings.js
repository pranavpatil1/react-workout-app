import React, { Component } from 'react'
// import './WorkoutForm.css'

class WorkoutSettings extends Component {
    initialState = {
        name: "",
        desc: "",
        isPublic: 0,
        updated: false
    }

    state = this.initialState;

    componentDidUpdate = () => {
        if (!this.state.updated) {
            this.setState({
                name: this.props.workoutData.name,
                desc: this.props.workoutData.job,
                isPublic: this.props.workoutData.isPublic,
                updated: true
            });
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target

        if (name === "isPublic" && value !== "") {
            this.setState({
                [name]: parseInt(value),
            });
        } else {
            this.setState({
                [name]: value,
            });
        }
    }

    submitDetails = () => {
        console.log(this.state)
        this.props.updateDetails(this.state.name, this.state.desc, this.state.isPublic);
    }

    render() {
        return (
            <>
            <h3>Edit Workout Details</h3>
            <div className="container">
                <form>
                    <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="workoutName"
                            placeholder="HIIT"
                            onChange={this.handleChange}
                            value={this.state.name} />
                    <label htmlFor="desc">Details</label>
                        <input
                            type="text"
                            name="desc"
                            id="workoutDetails"
                            placeholder="Tuesdays"
                            value={this.state.desc}
                            onChange={this.handleChange} />
                    
                    <label htmlFor="isPublic">Privacy</label>
                    <select name="isPublic" 
                            id="privacy" 
                            onChange={this.handleChange}
                            value={this.state.isPublic}>
                        <option value="0">Private</option>
                        <option value="1">Unlisted</option>
                        <option value="2">Public</option>
                    </select>
                    <input id="submitSettingsButton" className="btn" type="button" value="Update Details" onClick={this.submitDetails} />
                </form>
            </div>
            </>
        );
    }
}

export default WorkoutSettings;