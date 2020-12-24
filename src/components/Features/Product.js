import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'


export default class Product extends Component {
    render() {
        return (
            <div style={{ zIndex: "1.5", marginTop: "70px", backgroundColor: "transparents" }}>
                <div className="container" style={{ paddingTop: "15px" }}>
                    <div className="row g-3 align-items-center justify-content-center">
                        <div className="col-md-4 company-item">
                            <Card style={{}}>
                                <Card.Body>
                                    <Card.Title>Deposito a Plazo</Card.Title>
                                    <Card.Text>
                                        Producto que consiste en la entrega de dinero a una entidad financiera durante un tiempo determinado.
                                    </Card.Text>
                                    <Link to="/dpf">
                                        <Button variant="primary">Analisis</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-md-4 company-item">
                            <Card style={{}}>
                                <Card.Body>
                                    <Card.Title>Cuenta de Ahorro</Card.Title>
                                    <Card.Text>
                                        Producto financiero más usado para que puedas ahorrar y disponer de tu dinero de forma rápida.
                                    </Card.Text>
                                    <Link to="/cda">
                                        <Button variant="primary">Analisis</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
