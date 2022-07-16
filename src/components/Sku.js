import { useState } from "react"

function Sku({ id, label, totalUnits, price, handleOrderItem, addInput })
{
    const [youPay, setYouPay] = useState("$0.00")

    //handles unit quantity change
    function handleUnitQtyChange(event)
    {
        if (event.target.value == 0 || event.target.value == "" || event.target.value == "NaN")
        {
            setYouPay("$0.00")
        }
        else
        {
            let qty = ( eval(event.target.value) )
            let total = (price * qty).toFixed(2)
            setYouPay(total)
            
            let orderObj = 
            {
                skuId: id,
                label: label,
                totalQty: qty,
                orderPrice: total
            }

            handleOrderItem(orderObj)
        }
    }

    return (
        <tr>
            <td>{ label }</td>
            <td>{totalUnits}</td>
            <td>{ price }</td>
            <td>
                <input className="orderInput unitQtyInput" onChange={ handleUnitQtyChange }></input>
            </td>
            <td>{youPay}</td>
            <button onClick={ addInput } className="addButton">Add</button>
        </tr>
    )
}

export default Sku