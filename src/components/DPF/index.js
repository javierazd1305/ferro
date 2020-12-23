import React, { Component } from 'react'
import Navbar from "../Features/Navbar"
import Papa from 'papaparse';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, DiscreteColorLegend } from 'react-vis';
import { Table } from 'react-bootstrap';

export default class index extends Component {



    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            width: window.innerWidth,
            labels: [],
            banks: [],
            data: []


        }


        this.getData = this.getData.bind(this);
    }

    getData(result) {
        var xaxis = result.data[0].slice(0, 5)
        var final = {}
        var banks = []
        for (var i = 0; i < result.data.length - 1; i++) {
            if (i !== 0) {
                var row = result.data[i]
                var values = []
                for (var j = 0; j < 5; j++) {
                    var value = row[j]
                    if (value === "----") {
                        values.push({ x: xaxis[j], y: 0.0 })
                    } else {
                        values.push({ x: xaxis[j], y: parseFloat(row[j]) })
                    }


                }
                final[row[5]] = values
                banks.push(row[5])
            }
        }
        this.setState({ labels: xaxis })
        this.setState({ banks: banks })
        this.setState({ data: final })
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
        return fetch('data/data.csv').then(function (response) {
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
        const { isLoading, width, labels, banks, data } = this.state
        console.log(isLoading, labels, data, data['BBVA'])
        if (isLoading) {
            return <div className="App">Loading...</div>;
        }
        else {
            console.log(data['BBVA'][0].y);

            return (
                <div style={{ zIndex: "1.5", marginTop: "70px", backgroundColor: "transparents" }}>
                    <Navbar />

                    <h3 style={{ marginTop: "90px" }}> DEPOSITO A PLAZO</h3>
                    <DiscreteColorLegend items={banks} orientation='horizontal' />
                    <XYPlot
                        width={width}
                        height={400}
                        xType="ordinal"
                    >
                        <HorizontalGridLines />

                        {banks.map(banks => (
                            <LineSeries
                                title={banks}
                                data={data[banks]}
                            />
                        ))}



                        <YAxis />
                        <XAxis />
                    </XYPlot>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Banco</th>
                                {labels.map(labels => (
                                    <th>{labels}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>

                            {banks.map(banks => (
                                <tr>
                                    <td>{banks}</td>
                                    <th>{data[banks][0].y}</th>
                                    <th>{data[banks][1].y}</th>
                                    <th>{data[banks][2].y}</th>
                                    <th>{data[banks][3].y}</th>
                                    <th>{data[banks][4].y}</th>


                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </div>
            )
        }
    }
}
