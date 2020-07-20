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
                <h2>Create a workout</h2>
                <Form handleSubmit={this.props.handleSubmit} />
                <Table workoutData={this.props.workouts} removeWorkout={this.props.removeWorkout}/>
            </div>
            </>
      );
    }
  }

export default Home;
