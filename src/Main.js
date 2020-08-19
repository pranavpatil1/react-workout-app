import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ls from 'local-storage'

import Home from './pages/Home'
import Workouts from './pages/Workouts'
import EditWorkout from './pages/EditWorkout'
import RunTimer from './pages/RunTimer'
import Login from './pages/Login'
import Profile from './pages/Profile'
import PasswordReset from './pages/PasswordReset'
import Signup from './pages/Signup'
import View from './pages/View'

import { serverAddWorkout, serverGetUserWorkouts, serverUpdateWorkout } from './Firebase';
import { UserContext } from './UserProvider';

class Main extends Component {
    static contextType = UserContext;
    state = {
        workouts: [],
        updated: false,
        redirect: null
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
        var id = serverAddWorkout(workout);
        this.setState({workouts: [...this.state.workouts, {
            id: id,
            workout: workout
        }]});
    }

    updateWorkout = (index, workout) => {
        console.log(workout);
        this.setState({
            workouts: [
                {
                    id: index,
                    workout: workout
                },
                ...this.state.workouts.filter(el => el.id !== index)
            ]
        }, () => {
            serverUpdateWorkout(index, workout);
        })
    }

    componentDidUpdate = () => {
        if (this.context != null && !this.state.updated) {
            serverGetUserWorkouts(this.context.uid).then((res) => {
                this.setState({
                    workouts:res,
                    updated:true
                })
            })
        }
    }

    render () {
        return (
            <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route exact path="/workouts" render={props => 
                    (<Workouts workouts={this.state.workouts} handleSubmit={this.handleSubmit} removeWorkout={this.removeWorkout} />) }/>
                <Route exact path="/edit/:id?" render={props => 
                    (<EditWorkout id={props.match.params.id} workouts={this.state.workouts} updateWorkout={this.updateWorkout} />) }/>
                <Route exact path="/view/:id?" render={props => 
                    (<View id={props.match.params.id} />) }/>
                <Route exact path="/go/:id?" render={props => 
                    (<RunTimer id={props.match.params.id} workouts={this.state.workouts} />) }/>
                <Route exact path='/login' component={Login}></Route>
                <Route exact path='/profile' component={Profile}></Route>
                <Route exact path='/password-reset' component={PasswordReset}></Route>
                <Route exact path='/signup' component={Signup}></Route>
            </Switch>
        );
    }
}

export default Main;