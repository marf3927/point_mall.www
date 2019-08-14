import React from 'react';
import {  Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './point_mall/Home';
import Header from './point_mall/Header';
import Footer from './point_mall/footer';
import ItemDetail from './point_mall/ItemDetail';
import Login from './point_mall/Login';
import MyItems from './point_mall/My-items';
import CategoyDetail from './point_mall/CategoryDetail';
import CartItem from './point_mall/Cartitems';
import Register from './point_mall/register';

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path = '/' component = {Home}/>
        <Route exact path = '/login' component = {Login}/>
        <Route exact path='/items/:itemId' component = {ItemDetail} />
        <Route exact path = '/me/:items' component = {MyItems}/>
        <Route exact path = '/categories/:categoryId' component = {CategoyDetail}/>
        <Route exact path = '/cart/items' component = {CartItem}/>
        <Route exact path = '/register' component = {Register}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
