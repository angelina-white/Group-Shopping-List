import Sku from "./Sku"
import OrderItem from "./OrderItem"
import Name from "./Name"
import { useState } from "react"
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

function Home( { names, orders, skus, handleAddOrderItem, handleUpdateOrderItem, handleDeleteOrder } ) {

    //finds the shopper name
    const shopperName = names.map(name_obj => 
    {
        if (name_obj.name === 'Billy')
        {
            return name_obj.name
        }
    })

    const shopperId = names.map((item) =>
    {
        if (item.name === 'Billy')
        {
            return item.id
        }
    })

    //get shop year
    const shopYear = orders.map((item) =>
    {
        if (item.year == '2022')
        {
            return item.year
        }
    })

    //get shop month
    const shopMonth = orders.map((item) =>
    {
        if (item.month == '06')
        {
            return item.month
        }
    })

    //get shop day
    const shopDay = orders.map((item) =>
    {
        if (item.day == '25')
        {
            return item.day
        }
    })

    //get name and nameId from drop down 
    const [chosenName, setChosenName] = useState("Billy")
    const [chosenNameId, setChosenNameId] = useState(shopperId[0])
    function changeName(nameObj)
    {
        setChosenName(nameObj.name)
        setChosenNameId(nameObj.nameId)
    }

    //populate drop down with names
    const nameList = names.map((item) =>
    {
        return (
            <Name nameId={ item.id } name={ item.name } changeName={ changeName }/>
        )
    })

    //list of orders for dom
    const [orderItem, setOrderItem] = useState("")
    const handleOrderItem = (order) =>
    {
        setOrderItem(order)
    }

    //find shopping day first
    const filteredShoppingByDate = orders.filter((item) =>
    {
        if (item.year == shopYear[0] && item.month == shopMonth[0] && item.day == shopDay[0])
        return (
            item
        )
    })

    //get shopping list
    const shoppingList = filteredShoppingByDate.map((item) =>
    {
        return (
            <OrderItem skuId={ item.sku_id } totalQty={ item.quantity } skus={ skus } orderPrice={ item.order_price } nameId={ item.name_id } names={ names } deleteInput={ deleteInput } orderId={ item.id }/>
        )
    })

    //adds input to orders
    function addInput()
    {
        let submitOrderObj = 
        {
            sku_id: parseInt(orderItem.skuId),
            quantity: parseFloat(orderItem.totalQty),
            name_id: parseInt(chosenNameId),
            year: parseInt(shopYear[0]),
            month: parseInt(shopMonth[0]),
            day: parseInt(shopDay[0]),
            order_price: parseFloat(orderItem.orderPrice)
        }

        //finding whether post or patch
        const filteredOrders = orders.filter((item) =>
        {
            if (item.name_id == chosenNameId && item.year == shopYear[0] && item.month == shopMonth[0] && item.day == shopDay[0] && item.sku_id == orderItem.skuId)
            {
                return (item)
            }
        })

        //get item id for patch request
        const filteredOrderId = filteredOrders.map((item) =>
        {
            return item.id
        })

        if (filteredOrders == "")
        {
            fetch("http://localhost:9292/orders", 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitOrderObj)
            })
            .then(resp => resp.json())
            .then(data => handleAddOrderItem(data)) 
        }
        else
        {
            fetch(`http://localhost:9292/orders/${filteredOrderId[0]}`,
            {
                method: "PATCH",
                headers:
                {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitOrderObj)
            })
            .then(resp => resp.json())
            .then(data => handleUpdateOrderItem(data))
        }
    }

    //delete input
    function deleteInput(event)
    {
        const orderId = parseInt(event.target.value)

        fetch(`http://localhost:9292/orders/${orderId}`, {
            method: "DELETE",
          })
            .then((r) => r.json())
            .then((deletedReview) => handleDeleteOrder(deletedReview));
    }

    //list of skus
    const skuList = skus.map((item) =>
    {
        return (
            <Sku id={item.id} label={ item.label } totalUnits={ item.unit_count } price={ item.price } handleOrderItem={ handleOrderItem } addInput={ addInput }/>
        )
    })

    return (
        <div>
            <div className="shoppingInfoContainer">
                <h3>Shopper: { shopperName[0]}</h3>
                <h3>{ shopYear[0] }-{ shopMonth[0] }-{ shopDay[0] } </h3>
                <h3>Store: Costco</h3>
            </div>
            <div className="orderInputContainer">
                <Dropdown>
                    <h4 id="name">Buying:</h4>
                    <Dropdown.Toggle variant="success" id="nameDropdown">
                        { chosenName }
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        { nameList }
                    </Dropdown.Menu>
                </Dropdown>
                <div className="orderInputs">
                    <Table className="orderInputTable" striped bordered hover size="sm">
                        <thead>
                            <th scope="col">Label</th>
                            <th scope="col">Units</th>
                            <th scope="col">Price</th>
                            <th scope="col">Qty</th>
                            <th scope="col">You pay:</th>
                            <th scope="col">Action</th>
                        </thead>
                        <tbody>
                            { skuList }
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className="shoppingListContainer">
                <h2 id="shoppingListTitle">Shopping List</h2>
                <Table className="shoppingListLines" striped bordered hover size="sm">
                    <thead>
                        <th scope="col">Name</th>
                        <th scope="col">Label</th>
                        <th scope="col">Total Qty</th>
                        <th scope="col">Price</th>
                    </thead>
                    <tbody>
                        { shoppingList }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Home