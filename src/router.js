import {Route, Switch} from 'react-router-dom'
import React from 'react'
import Home from './components/Home/Home'
import MowerSales from './components/Sales/MowerSales'
import BladeSales from './components/Sales/BladeSales'
import SalesLanding from './components/Sales/SalesLanding'
import Service from './components/Service/Service'
import About from './components/About/About'
import Details from './components/Details/Details'
import SalesInfo from './components/AccountInfo/SalesInfo'
import ServiceInfo from './components/AccountInfo/ServiceInfo'
import Cart from './components/Cart/Cart'
import FilteredSales from './components/Sales/FilteredSales'
import ConfirmService from './components/Service/ConfirmService'

export default(
  <Switch>
    <Route component={ Home } exact path='/'></Route>
    <Route component={ MowerSales } path='/mowers'></Route>
    <Route component={ FilteredSales } path='/filteredmowers/:brand'></Route>
    <Route component={ BladeSales } path='/blades'></Route>
    <Route component={ SalesLanding }  path='/sales'></Route>
    <Route component={ Service }  path='/service'></Route>
    <Route component={ About } path='/about'></Route>
    <Route component={Details} path="/details/:type/:id"/>
    <Route component={SalesInfo} path='/salesinfo'/>
    <Route component={ServiceInfo} path='/serviceinfo'/>
    <Route component={Cart} path='/cart'/>
    <Route component={ConfirmService} path='/confirmservice'/>
  </Switch>
)