import React, {Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layout/header/Header';
import Footer from './components/layout/Footer/Footer';
import Dashboard from './components/dashbaord/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import MealDetails from './components/meals/MealDetails';
import MealUpdate from './components/meals/MealUpdate';
import MenuUpdate from './components/menu/MenuUpdate';
import CreateMeal from './components/meals/CreateMeal';
import SignUpProvider from './components/auth/SignUpProvider';
import Home from "./components/dashbaord/Home";
import ContactUs from "./components/pages/Contact";
import SignUpDispatcher from './components/auth/SignUpDispatcher';
import CreateMenu from './components/menu/CreateMenu';
import './styles.css'
import MealList from './components/meals/MealList';
import MealDashboard from './components/meals/MealDashboard';
import MenuDashboard from './components/menu/MenuDashboard'
import MenuDetails from './components/menu/MenuDetails'
import CartList from './components/cart/CartList';

class App extends Component {
    render() {
        return (
            <div className="App">
            <BrowserRouter>
            <Header />
                <div className="container">
                    <Switch>
                        <Route exact path='/' component = {Home} />
                        <Route path='/home' component = {Dashboard} />
                        <Route path='/meal/:id/edit' component = { MealUpdate}/>
                        <Route path= '/meal/:id' component = { MealDetails } />
                        <Route path='/signin' component = {SignIn} />
                        <Route path='/signup' component = {SignUp} />
                        <Route path='/provider/signup' component = {SignUpProvider} />                   
                        <Route path='/contact-us' component = {ContactUs} />
                        <Route path='/dispatcher/signup' component = {SignUpDispatcher} />
                        <Route path='/caterer/meals' component = {MealList} />
                        <Route path= '/menus/:id/edit' component = { MenuUpdate } />
                        <Route path= '/menus/:id' component = { MenuDetails } />
                        <Route path='/new-menu' component = {CreateMenu} />
                        <Route path='/new-meal' component = {CreateMeal} />
                        <Route path='/cart' component = {CartList} />
                        <Route path='/menus' component = {MenuDashboard} />
                        <Route path='/meals' component = {MealDashboard} />
                    </Switch>
                </div>
                <Footer/>
            </BrowserRouter>
            </div>
        )
    }
}
export default App;
