import React from 'react'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}

const MyForm = () => (
    <Styles>
        <h2>Redux Form</h2>
        
        <Form
        onSubmit={onSubmit}
        initialValues={{ employed: false }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <Field
                name="firstName"
                component="input"
                type="text"
                placeholder="First Name"
                />
            </div>
            <div>
                <label>Last Name</label>
                <Field
                name="lastName"
                component="input"
                type="text"
                placeholder="Last Name"
                />
            </div>
            <div>
                <label>Employed</label>
                <Field name="employed" component="input" type="checkbox" />
            </div>
            <div>
                <label>Framework Technology</label>
                <div>
                    <label>
                        <Field name="tech" component="input" type="checkbox" value="Node JS" />{' '}
                        Node JS
                    </label>
                    <label>
                        <Field name="tech" component="input" type="checkbox" value="Vue" />{' '}
                        Vue
                    </label>
                    <label>
                        <Field name="tech" component="input" type="checkbox" value="Angular" />{' '}
                        Angular
                    </label>
                    <label>
                        <Field name="tech" component="input" type="checkbox" value="Bootstrap" />{' '}
                        Bootstrap
                    </label>
                    <label>
                        <Field name="tech" component="input" type="checkbox" value="Django" />{' '}
                        Django
                    </label>
                </div>
            </div>
            <div>
                <label>Position</label>
                <div>
                    <label>
                        <Field name="position" component="input" type="radio" value="Front End" />{' '}
                        Front End
                    </label>
                    <label>
                        <Field name="position" component="input" type="radio" value="Back End" />{' '}
                        Back End
                    </label>
                    <label>
                        <Field name="position" component="input" type="radio" value="Fullstack" />{' '}
                        Fullstack
                    </label>
                </div>
            </div>
            <div>
                <label>Notes</label>
                <Field name="notes" component="textarea" placeholder="Notes" />
            </div>
            <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                    Submit
                </button>
                <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                    >
                    Reset
                </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
        )}
        />
    </Styles>
)

export default MyForm