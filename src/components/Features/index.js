
import React, { Component } from 'react'
import Navbar from "./Navbar"
import Home from "./Home"


export default class index extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Home />
            </div>
        )
    }
}
