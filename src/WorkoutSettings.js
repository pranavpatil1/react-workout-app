import React, { Component } from 'react'
// import './WorkoutForm.css'

class WorkoutSettings extends Component {
    
    submitDetails = () => {
        this.props.updateDetails();
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
                            onChange={this.props.handleChange}
                            value={this.props.workoutData.name} />
                    <label htmlFor="desc">Details</label>
                        <input
                            type="text"
                            name="desc"
                            id="workoutDetails"
                            placeholder="Tuesdays"
                            value={this.props.workoutData.desc}
                            onChange={this.props.handleChange} />
                    
                    <label htmlFor="isPublic">Privacy</label>
                    <select name="isPublic" 
                            id="privacy" 
                            onChange={this.props.handleChange}
                            value={this.props.workoutData.isPublic}>
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