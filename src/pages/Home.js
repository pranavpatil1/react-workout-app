import React, { Component } from 'react';
import Header from '../Header'

class Home extends Component {
    render() {
      return (
            <>
            <Header />
            <div className="container">
                <h1>Browse Workouts</h1>
                <p className="margin-top">Create and share workouts, and have them timed for you.</p>
            </div>
            </>
      );
    }
  }

export default Home;
