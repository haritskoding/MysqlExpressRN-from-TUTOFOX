import React, { Component } from 'react'
class Nabung extends Component {

    constructor() {
        super();
        this.state = {
            nilai1: '',
            nilai2: '',
            operator: '',
            hasil: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleSubmit(e) {
        e.preventDefault();
        let nilai1 = parseInt(this.refs.nilai1.value)
        let nilai2 = parseInt(this.refs.nilai2.value)
        let operator = this.refs.operator.value

        let hasil;
        switch (operator) {
            case '+':
                hasil = nilai1 + nilai2;
                break;
            case '-':
                hasil = nilai1 - nilai2;
                break;
            case '/':
                hasil = nilai1 / nilai2;
                break;
            case '*':
                hasil = nilai1 * nilai2;
                break;
            default:
                hasil = "Inputan atau operatr yang anda pilih salah"
        }
        this.setState({
            nilai1: nilai1,
            nilai2: nilai2,
            operator: operator,
            hasil: hasil
        });
        console.log("nilai1:" + nilai1 + "nilai2: operator:" + operator + nilai2 + "hasil:" + hasil)

    }

    handleHasil() {
        if ((this.state.hasil) && (this.state.hasil !== "Inputan atau operatr yang anda pilih salah")) {
            return (
                <p className="alert alert-success">
                    hasil dari {this.state.nilai1} di {this.state.operator} {this.state.nilai2} = {this.state.hasil}
                </p>
            )
        } else if (this.state.hasil === "Inputan atau operatr yang anda pilih salah") {
            return (
                <p className="alert alert-danger">
                    Anda belum meilih operator
                </p>
            )
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Nilai1 </label>
                        <input type="text" className="form-control" ref="nilai1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Nilai 2</label>
                        <input type="text" className="form-control" ref="nilai2" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Operator</label>
                        <select name="" id="" className="form-control" ref="operator">
                            <option>-----Please Choose -----</option>
                            <option value="+">+</option>
                            <option value="*">*</option>
                            <option value="-">-</option>
                            <option value="/">/</option>
                            <option value="^">kuadrat</option>
                        </select>
                    </div>
                    <div className="form-group">
                        {this.handleHasil()}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Lihat Hasil</button>
                    </div>

                </form>

            </div>
        )
    }
}

export default Nabung