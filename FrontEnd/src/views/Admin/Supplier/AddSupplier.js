import React, { useState, useEffect } from 'react'

import axios from 'axios'

import Button from '../../../components/Button/Button'

const AddSupplier = () => {
    return (
        <div>
            <h2 className="page-header">
                <b>Thêm nhà cung cấp</b>
            </h2>
            <div>
                <h1>Tên nhà cung cấp</h1>
                <input type={"text"} placeholder={"Tên nhà cung cấp"}/> <br/>
            </div>
            <div>
            <Button type="button">
                <a>
                Thêm
                </a>
            </Button>
            <Button type="button">
                <a href="./Suppliers">
                Quay về
                </a>
            </Button>
            </div>
        </div>
    )
}

export default AddSupplier
