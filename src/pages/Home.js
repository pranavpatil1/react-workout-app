import React, { Component } from 'react';
import Table from '../Table'
import Form from '../Form'

class Home extends Component {
    render() {
      return (
          <div className="container">
            <h1>Workout Webapp</h1>
            <p>This tool helps you time yourself during a workout</p>
            <h2>Create a workout</h2>
            <Form handleSubmit={this.props.handleSubmit} />
            <Table workoutData={this.props.workouts} removeWorkout={this.props.removeWorkout}/>
        </div>
      );
    }
  }

export default Home;
