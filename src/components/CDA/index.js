import React, { Component } from 'react'
import Navbar from "../Features/Navbar"
import Papa from 'papaparse';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LabelSeries, VerticalBarSeries, ChartLabel } from 'react-vis';
import { Table } from 'react-bootstrap';

export default class index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            width: window.innerWidth,
            labels: [],
            banks: [],
            bankList: {},
            data: []
        }


        this.getData = this.getData.bind(this);
    }
    getData(result) {
        var xaxis_cda = result.data[0].slice(0, 4)
        var values = []
        var banks = []
        var bankList = {}


        for (var i = 0; i < result.data.length - 1; i++) {
            if (i !== 0) {
                var row = result.data[i]
                values.push({ x: row[0], y: parseFloat(row[2].replace(",", ".")) })
                console.log(row[0]);
                banks.push(row[0])
                bankList[row[0]] = {
                    "Tasa": parseFloat(row[2].replace(",", ".")),
                    "Tipo": row[1],
                    "Tipo de Cuenta": row[3]
                }
            }
        }
        this.setState({ labels: xaxis_cda })
        this.setState({ banks: banks })
        this.setState({ data: values })
        this.setState({ bankList: bankList })
        this.setState({ isLoading: false });
    }
    handleResize = (e) => {
        this.setState({ width: window.innerWidth });
    };

    componentWillMount() {
        this.setState({ width: window.innerWidth });
        this.getCsvData();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    fetchCsv() {
        return fetch('data/data_ahorro.csv').then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');

            return reader.read().then(function (result) {
                return decoder.decode(result.value);
            });
        });
    }
    async getCsvData() {
        let csvData = await this.fetchCsv();
        Papa.parse(csvData, {
            complete: this.getData
        });
    }

    render() {
        const { isLoading, width, labels, banks, bankList, data } = this.state

        if (isLoading) {
            return <div className="App">Loading...</div>;
        }
        else {
            console.log(bankList, banks);
            return (
                <div>
                    <div style={{ zIndex: "1.5", marginTop: "70px", backgroundColor: "transparents" }}>
                        <Navbar />

                        <h3 style={{ marginTop: "90px" }}> CUENTA DE AHORRO</h3>
                        <XYPlot xType="ordinal" width={width} height={350} xDistance={150} margin={{ bottom: 90 }}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis tickLabelAngle={-70} tickSizeOuter={10} height={60} />
                            <YAxis />
                            <VerticalBarSeries data={data} />
                            <LabelSeries data={banks} getLabel={d => d.x} />
                        </XYPlot>

                    </div>

                    <Table striped bordered hover style={{ marginTop: "30px" }}>
                        <thead>
                            <tr>
                                {labels.map(labels => (
                                    <th>{labels}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {banks.map(banks => (
                                <tr>
                                    <td>{banks}</td>
                                    <td>{bankList[banks]["Tipo"]}</td>
                                    <td>{bankList[banks]["Tasa"]}</td>
                                    <td>{bankList[banks]["Tipo de Cuenta"]}</td>
                                </tr>
                            ))}


                        </tbody>
                    </Table>
                </div>
            )
        }
    }
}
