import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Axios from 'axios';

class EditComponent extends React.Component {

    state = {
        campName: "",
        campEmail: "",
        campPhone: "",
        campAddress: "",
        selectRole: 0
    }

    render() {

        return (
            <form>
                <div class="form-row justify-content-center">
                    <div class="form-group col-md-4">
                        <label for="inputPassword4">Name  </label>
                        <input type="text" class="form-control" placeholder="Name" value={this.state.campName} onChange={(value) => this.setState({ campName: value.target.value })} />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputEmail4">Email</label>
                        <input type="email" class="form-control" placeholder="Email" value={this.state.campEmail} onChange={(value) => this.setState({ campEmail: value.target.value })} />
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputEmail4">ID</label>
                        <input type="email" class="form-control" placeholder="Enter ID " value={this.state.campEmail} onChange={(value) => this.setState({ campEmail: value.target.value })} />

                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputEmail4">&nbsp;</label>
                        <button type="submit" className="form-control btn btn-success" >Cari </button>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputState">Role</label>
                        <select id="inputState" class="form-control" onChange={(value) => this.setState({ selectRole: value.target.value })}>
                            <option selected>Choose...</option>
                            <option value="1">1. Admin</option>
                            <option value="2">2. Projek Manager</option>
                            <option value="3">3. Programmer</option>
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Phone</label>
                        <input type="number" class="form-control" placeholder="Phone" value={this.state.campPhone} onChange={(value) => this.setState({ campPhone: value.target.value })} />
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" value={this.state.campAddress} placeholder="1234 Main St" onChange={(value) => this.setState({ campAddress: value.target.value })} />
                </div>

                <button type="submit" onClick={() => this.sendSave()} className="btn btn-primary">Add Employee</button>
            </form>
        );
    }

    sendSave() {
        if (this.state.selectRole === 0) {
            alert("Please select role ")
        } else if (this.state.campPhone === "") {
            alert("Please enter telepohne number")
        } else if (this.state.campName === "") {
            alert("Please enter Name")
        } else if (this.state.campEmail === "") {
            alert("Please enter Email")
        } else if (this.state.campAddresss === "") {
            alert("Please enter Address")
        } else {
            const baseUrl = "http://localhost:3000/employee/create"

            const datapost = {
                name: this.state.campName,
                email: this.state.campEmail,
                phone: this.state.campPhone,
                address: this.state.campAddress,
                role: this.state.selectRole
            }

            Axios.post(baseUrl, datapost)
                .then(response => {
                    if (response.data.success === true) {
                        alert(response.data.message)
                    } else {
                        alert(response.data.message)
                    }
                }).catch(error => {
                    alert("Error 34 " + error)
                })
        }
    }
}


export default EditComponent;