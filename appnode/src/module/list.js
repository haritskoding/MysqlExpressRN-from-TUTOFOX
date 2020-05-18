import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from "react-router-dom"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


class listComponent extends React.Component {

    state = {
        listEmployee: []
    }


    componentDidMount() {
        const url = "http://172.17.242.145:3000/employee/list"

        axios.get(url)
            .then(res => {
                if (res.data.success) {
                    const data = res.data.data
                    console.log(data.name + " ini sat");
                    this.setState({ listEmployee: data });
                } else {
                    alert("error in webservice")
                }
            })
            .catch(error => {
                alert("server error")
            })
    }

    loadFillData() {
        return this.state.listEmployee.map((data) => {
            console.log(data);
            // console.log("<tr><td>" + data.name + "</td></tr>")

            return (
                <tr key={data.id}>
                    <th>{data.id}</th>
                    <td>{data.role.role}</td>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.address}</td>
                    <td>{data.phone}</td>
                    <td>
                        <Link className="btn btn-outline-info" to={"/edit/" + data.id} >Edit</Link>
                    </td>
                    <td>
                        <button className="btn btn-outline-danger" onClick={() => this.onDelete(data.id)}> Delete </button>
                    </td>
                </tr>
            )
        })
    }

    onDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!' + id,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.sendDelete(id)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        });
    }

    sendDelete(userId) {
        //backend url
        window.location.reload(false)
        const baseUrl = "http://localhost:3000/employee/delete"
        //network
        axios.post(baseUrl, {
            id: userId
        })
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Deleted',
                        'Your Employee has been deleted. ',
                        'success'
                    )
                }
            })
            .catch(error => {
                alert("Error 325")
            })
    }

    render() {



        return (
            <table className="table table-hover table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Role</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.loadFillData()}
                </tbody>
            </table>
        );
    }
}

export default listComponent;