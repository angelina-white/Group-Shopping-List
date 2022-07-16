import React, {useState, useEffect} from "react";
import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"

function App() {
  const [names, setNames] = useState([]);
  const [orders, setOrders] = useState([]);
  const [skus, setSkus] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/names")
    .then((res) => res.json())
    .then(setNames)
  }, []);

  useEffect(() => {
    fetch("http://localhost:9292/orders")
    .then((res) => res.json())
    .then(setOrders)
  }, []);

  useEffect(() => {
    fetch("http://localhost:9292/skus")
    .then((res) => res.json())
    .then(setSkus)
  }, []);

  function handleAddOrderItem(newOrderItem)
  {
    setOrders([newOrderItem, ...orders])
  }

  function handleUpdateOrderItem(updatedOrderItem)
  {
    const changeOrder = orders.map((item) =>
    {
      if (item.id == updatedOrderItem.id)
      {
        return updatedOrderItem
      }
      else
      {
        return item
      }
    })
    setOrders(changeOrder)
  }


  function handleDeleteOrder(orderItem)
  {
    const filteredListing = orders.filter(item => item.id !== orderItem.id)
    setOrders(filteredListing)
  }

  return (
    <div className="App">
      <h1 id="title">Group Shopping List</h1>
      <Home names= {names} orders = {orders} skus={skus} handleAddOrderItem={ handleAddOrderItem } handleUpdateOrderItem={ handleUpdateOrderItem } handleDeleteOrder={ handleDeleteOrder }/>
  </div>
);
}

export default App;