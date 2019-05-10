import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import axios from "axios";

export default class Sql extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sql: "",
            sqlResponse: ""
        };
    }

    validateForm() {
        return this.state.sql.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/admin/sql',
                data: {
                    sql: this.state.sql
                }
            });

            if (response.status === 200) {
                this.setState({ sqlResponse: JSON.stringify(response.data, null, 4) })
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    render() {
        return (
            <div className="sql">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="sql" bsSize="large">
                        <label>SQL</label>
                        <FormControl
                            autoFocus
                            type="textarea"
                            value={this.state.sql}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Send SQL
                    </Button>
                </form>
                <pre style={{float: 'left', textAlign: 'left'}}>{this.state.sqlResponse}</pre>
            </div>
        );
    }
}