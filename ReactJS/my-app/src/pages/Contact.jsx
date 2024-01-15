import React from 'react'
import { CommerceModule, faker } from '@faker-js/faker';

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        alert('Nama Kamu adalah : ' + this.state.value)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* <p className='text-lg font-bold'>Ini Contact</p> */}
                <label class="ui input mr-3">
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Masukkan Nama..."/>
                </label>
                <input type="submit" value="Submit" class="ui button" />
            </form>
        )
    }
}

export default Contact