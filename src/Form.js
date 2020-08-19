import React, { Component } from 'react'
import { UserContext } from './UserProvider';

class Form extends Component {
    static contextType = UserContext;

    initialState = {
        name: '',
        desc: '',
        data: [],
        dateCreated: 0,
        uid: "",
        isPublic: 0
    }

    state = this.initialState;

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
        const {name, desc} = this.state;

        return (
            <form>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.handleChange} />
            <label htmlFor="desc">Notes</label>
            <input
                type="text"
                name="desc"
                id="desc"
                value={desc}
                onChange={this.handleChange} />
            <input type="button" value="Create" onClick={this.submitForm} />
            </form>
        );
    }
}

export default Form;