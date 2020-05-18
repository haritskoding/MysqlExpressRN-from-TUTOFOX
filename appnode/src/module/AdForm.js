import React, { Component } from 'react'


let separator;



export default class AdForm extends Component {

    state = {
        pilihan: null,
        saldo: 20000,
        nabung: null,
        ambil: null
    }

    componentDidMount() {


    }

    disablePrevDates = (startDate) => {
        const startSeconds = Date.parse(startDate);
        return (date) => {
            return Date.parse(date) < startSeconds;
        }
    }

    memilih() {
        let pil = parseInt(this.refs.choice.value)
        this.setState({
            pilihan: pil
        })
    }

    menabung() {
        //this.refs.nabung.value
        let nad = this.refs.nabung.value
        if (isNaN(nad)) {
            alert('harus angka')
        } else {
            let number_string = nad.replace(/[^,\d]/g, '').toString(),
                split = number_string.split(','),
                sisa = split[0].length % 3,
                rupiah = split[0].substr(0, sisa),
                ribuan = split[0].substr(sisa).match(/\d{1,3}/gi);

            if (ribuan) {
                separator = sisa ? '.' : '';
                rupiah += separator + ribuan.join('.');
            }

            rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;

            let saldoAkhir = this.state.saldo + parseInt(this.refs.nabung.value)
            console.log('panjang ' + rupiah)
            this.setState({
                saldo: saldoAkhir
            })

            //alert('uang anda ' + rupiah)

            const oneDay = 1000 * 60 * 60 * 24;
            let tang1 = new Date(this.refs.tanggal1.value)
            let tang2 = new Date(this.refs.tanggal2.value)
            let kurang = (tang2 - tang1) / oneDay
            alert('kurang' + tang2 + ' - ' + tang1 + 'hari : ' + kurang)
            return (
                <div>
                    {kurang}
                </div>
            )
        }

    }

    formatCurrent = (uang) => {
        uang = parseInt(uang)
        if (isNaN(uang)) {
            alert('harus angka oke')
        } else {
            let number_string = uang.toString(),
                split = number_string.split(','),
                sisa = split[0].length % 3,
                rupiah = split[0].substr(0, sisa),
                ribuan = split[0].substr(sisa).match(/\d{1,3}/gi);

            if (ribuan) {
                separator = sisa ? '.' : '';
                rupiah += separator + ribuan.join('.');
            }

            rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
            // return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
            console.log('uangggg ' + rupiah)
            return (
                <div>
                    Saldo Rp.{rupiah}
                </div>
            )
        }
    }


    tarikTunai() {
        let ambil = parseInt(this.refs.ambil.value)
        if (this.state.saldo > 10000) {
            if ((this.state.saldo < 1000) || (this.state.saldo < ambil + 10000)) {
                alert('maaf saldo tidak mencukupi batas limit saldo tidak boleh kurang dari rp.10000')
            } else {

                let saldoAkhir = this.state.saldo - ambil
                this.setState({
                    saldo: saldoAkhir
                })
            }
        } else {

            alert('maaf saldo tidak mencukupi')

        }

        console.log('maaf saldo kurang')
    }

    submit(e, index) {
        this.state.pilihan[index] = e.target.value
        this.setState({ pilihan: this.state.pilihan })
    }

    tampilanForm() {
        if (this.state.pilihan === 1) {
            return (
                <div className="form-group">
                    <div className="alert alert-success">
                        anda memilih menabung
                   </div>
                    <div className="form-group row  center">
                        <div className="col-md-9">
                            <input type="text"
                                className="form-control"
                                ref="nabung"
                                placeholder="Masukan Jumlah Uang yang ingin di tabung" />
                        </div>
                        <div className="col-md-2">
                            <button type="submit" className="btn btn-success" onClick={() => this.menabung()}>Tabung</button>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.pilihan === 2) {
            console.log('pilihan' + this.state.pilihan)
            return (
                <div className="form-group">
                    <div className="alert alert-primary">
                        anda memilih tarik tunai
               </div>
                    <div className="form-group row  center">
                        <div className="col-md-9">
                            <input type="number"
                                className="form-control"
                                ref="ambil"
                                placeholder="Masukan Jumlah Uang yang ingin di ambil" />
                        </div>
                        <div className="col-md-2">
                            <button type="submit" className="btn btn-success" onClick={() => this.tarikTunai()}>Tarik</button>
                        </div>
                    </div>
                </div>
            )
        } else if ((this.state.pilihan < 1 || this.state.pilihan > 2) && this.state.pilihan !== null) {
            console.log('pilihan' + this.state.pilihan)
            return (
                <div className="alert alert-danger">
                    Maaf saat ini menu belum tersedia
                </div>
            )
        }
    }

    render() {
        const startDate = new Date();
        return (
            <div>

                tannggal
                <input type="date" ref="tanggal1" />
                <input type="date" ref="tanggal2" />
                <h1>ini adalah add form Nasabah</h1>
                <div class="card">
                    <div class="card-header">
                        Bank Online
                     </div>
                    <div class="card-body">
                        <h5 class="card-title">{this.formatCurrent(this.state.saldo)}</h5>
                        <p>Ket: Rp. 10.000 adlah limit saldo anda</p>
                    </div>
                </div>
                <hr />
                <label>Pilih Salah Saatu</label>
                <p></p>

                <div className="form-group row">
                    <div className="col-md-8">
                        <select ref='choice' className="form-control">
                            <option>---Pilih Salah Satu----</option>
                            <option value="1">1. Menabung</option>
                            <option value="2">2. Tarik Tunai</option>
                            <option value="3">3. Transfer</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <button type="submit"
                            onClick={(e) => this.memilih(e)}
                            className="btn btn-success">Pilih
                            </button>
                    </div>
                </div>


                <hr />
                {this.tampilanForm()}
                hr/>
                {(e) => this.formatCurrent(e, this.refs.nabung.value)}
            </div>
        )
    }
}
