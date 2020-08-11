import React, { Component } from 'react'
import { UserContext } from './UserProvider';

class Form extends Component {
    static contextType = UserContext;

    initialState = {
        name: '',
        job: '',
        data: [],
        dateCreated: 0,
        uid: "",
        isPublic: false
    }

    state = this.initialState;

    componentDidMount = () => {
    }

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        });
    }

    submitForm = () => {
        if (this.context !== null) {
            this.setState({
                uid: this.context.uid
            }, () => {
                this.props.handleSubmit(this.state)
                this.setState(this.initialState);
            });
        } else {
            this.props.handleSubmit(this.state)
            this.setState(this.initialState);
        }
    }

    render() {
        const {name, job} = this.state;

        return (
            <form>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.handleChange} />
            <label htmlFor="job">Notes</label>
            <input
                type="text"
                name="job"
                id="job"
                value={job}
                onChange={this.handleChange} />
            <input type="button" value="Create" onClick={this.submitForm} />
            </form>
        );
    }
}

export default Form;