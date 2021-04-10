import React from 'react';
import { Table } from 'reactstrap';

const ProducList = ({ productList }) => {
    if (productList) {
        return (
            <Table hover bordered fixed>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Rating</th>
                        <th>Price</th>
                        <th>Final Price</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map(product => {
                        return (
                            <tr>
                                <td>{product.title}</td>
                                <td>
                                    <img src={product.img} alt={product.title} widht="100" height="100" />
                                </td>
                                <td>{product.rating || 'N/A'}</td>
                                <td>{product.price || 'N/A'}</td>
                                <td>{product.finalPrice || 'N/A'}</td>
                                <td>{product.category || 'N/A'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table >
        )
    }
    else return null;
}


export default ProducList;