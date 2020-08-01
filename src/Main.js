import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ls from 'local-storage'

import Home from './pages/Home'
import EditWorkout from './pages/EditWorkout'
import RunTimer from './pages/RunTimer'
import Login from './pages/Login'
import Profile from './pages/Profile'
import PasswordReset from './pages/PasswordReset'
import Signup from './pages/Signup'

import UserProvider from './UserProvider'

class Main extends Component {
    state = {
        workouts: JSON.parse(ls.get('workouts')) || []
    }
    removeWorkout = (index) => {
        const {workouts} = this.state;

        this.setState ({
            workouts: workouts.filter((character, i) => {
                return i !== index
            })

        }, () => {
            ls.set('workouts', JSON.stringify(this.state.workouts));
        })
    }

    handleSubmit = (workout) => {
        this.setState({workouts: [...this.state.workouts, workout]}, () => {
            ls.set('workouts', JSON.stringify(this.state.workouts));
        });
    }

    updateWorkout = (index, workout) => {
        this.setState({
            workouts: [
                ...this.state.workouts.slice(0, index), 
                workout, 
                ...this.state.workouts.slice(index + 1)
            ]
        }, () => {
            ls.set('workouts', JSON.stringify(this.state.workouts));
        })
    }

    updateRepeat = (index, number) => {

    }

    render () {
        return (
            <UserProvider>
                <Switch>
                        <Route exact path="/" render={props => 
                            (<Home workouts={this.state.workouts} handleSubmit={this.handleSubmit} removeWorkout={this.removeWorkout} />) }/>
                        <Route exact path="/edit" render={props => 
                            (<EditWorkout search={props.location.search} workouts={this.state.workouts} updateWorkout={this.updateWorkout} />) }/>
                        <Route exact path="/go" render={props => 
                            (<RunTimer search={props.location.search} workouts={this.state.workouts} />) }/>
                        <Route exact path='/login' component={Login}></Route>
                        <Route exact path='/profile' component={Profile}></Route>
                        <Route exact path='/password-reset' component={PasswordReset}></Route>
                        <Route exact path='/signup' component={Signup}></Route>
                </Switch>
            </UserProvider>
        );
    }
}

export default Main;