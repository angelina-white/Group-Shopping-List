function OrderItem({ skuId, totalQty, skus, orderPrice, nameId, names, deleteInput, orderId})
{
    const label = skus.find(item => item.id === skuId)

    const name = names.find(item => item.id === nameId)

    return (
        <tr>
            <td>{ name.name } </td>
            <td> {label.label} </td>
            <td>{totalQty}</td>
            <td>{ orderPrice } </td>
            <button onClick={ deleteInput } value={ orderId } className="deleteButton">Delete</button>
        </tr>
    )
}

export default OrderItem