import React, { Component } from 'react'
import Product from "./Product"

export default class Home extends Component {
    render() {
        return (
            <div style={{ height: "100vh", backgroundImage: "url(img/background.jfif)", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", opacity: "0.7" }}>
                <Product />
            </div>
        )
    }
}
