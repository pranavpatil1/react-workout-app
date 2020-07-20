import React, { Component } from 'react';
import Table from '../Table'
import Form from '../Form'
import Header from '../Header'

class Home extends Component {
    render() {
      return (
            <>
            <Header />
            <div className="container">
                <p className="margin-top">Use this website to create a workout, edit it to add a sequence of exercises and rest, and click play to have it timed for you.</p>
                <h2>Create a workout</h2>
                <Form handleSubmit={this.props.handleSubmit} />
                <h2>Workouts</h2>
                <Table workoutData={this.props.workouts} removeWorkout={this.props.removeWorkout}/>
            </div>
            </>
      );
    }
  }

export default Home;
