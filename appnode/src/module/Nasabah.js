import React, { Component } from 'react'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
//const baseUrl = "http://localhost:3000"

export default class Nasabah extends Component {

    state = {
        dataEmployee: {},
        noRek: "",
        saldo: "",
        namaAyah: "",
        namaAkun: "",
        aksi: "",
        noTelp: "",


        campName: "",
        campEmail: "",
        campAddress: ""
    }

    componentDidMount() {

    }

    handleSubmit(e) {
        e.preventDefault();
        let noRek = this.refs.name.value


        this.setState({
            noRek: noRek
        });

        console.log("no rekening:" + noRek)
    }


    infoSaldo() {
        if (this.state.namaAkun) {
            return (
                <p className="alert alert-success">
                    No rek {this.state.noRek} memiliki saldo Rp.2000.0000
                </p>
            )
        }
    }

    render() {
        console.log('data data', this.state.campName)
        return (

            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row justify-content-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">No rekening</label>
                            <input type="text" className="form-control"
                                placeholder="Enter No rek."
                                value={this.state.noRek}
                                ref="norek"
                                onChange={(value) => this.setState({ noRek: value.target.value })}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">&nbsp;</label>
                            <button type="button" className="form-control btn btn-success"
                                onClick={() => this.sendSearching()}>Klik Untuk mencari</button>
                        </div>
                    </div>



                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Nama Pemilik Akun</label>
                            <input type="text" className="form-control"
                                placeholder="Name"
                                value={this.state.campName}
                                onChange={this.sendSearching} />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Nama Ayah Kandung</label>
                            <input type="email" className="form-control" placeholder="Email"
                                value={this.state.campEmail} onChange={(value) => this.setState({ campEmail: value.target.value })} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            {this.infoSaldo()}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputState">Aksi</label>
                            <select id="inputState" className="form-control" onChange={(value) => this.setState({ selectRole: value.target.value })}>
                                <option>---Pilih Salah Satu----</option>
                                <option value="1">Tarik tunai</option>
                                <option value="2">Menabung</option>
                                <option value="3">Transfer</option>
                                <option value="4">Pembayaran Online</option>
                                <option value="5">Top up emoney</option>
                                <option value="6">Cek Saldo</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Phone</label>
                            <input type="number" className="form-control" placeholder="Phone"
                                value={this.state.campPhone} onChange={(value) => this.setState({ campPhone: value.target.value })} />
                        </div>
                    </div>



                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" onClick={() => this.sendUpdate()}>Update</button>
                        <button type="button" className="btn btn-danger" onClick={this.resetForm} >Reset</button>

                    </div>
                </form>
            </div>
        )
    }

    sendSearching() {
        if (this.state.noRek === 0) {
            return (
                <div>
                    fkjfkjkfjk
                </div>
            )
        } else {
            const url = "http://localhost:3000/employee/get/" + this.state.noRek


            axios.get(url)
                .then(res => {
                    if (res.data.success) {

                        const data = res.data.data[0]
                        this.setState({
                            dataEmployee: data,
                            campName: data.name,
                            campEmail: data.email,
                            campPhone: data.phone,
                            campAddress: data.address,
                            stringRole: data.role.role,
                            selectRole: data.roleId
                        })
                        // console.log(JSON.stringify(data.role.roleId))
                    }
                    else {
                        alert("Error web service")
                    }
                })
                .catch(error => {
                    alert("Error server " + error)
                })
        }
    }
}

