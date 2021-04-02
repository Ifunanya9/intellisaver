import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import MenuSummary from './MenuSummary';
import { Table, Row, Col } from 'react-bootstrap';
// import {addMealToCart} from '../../store/actions/cartActions';
// import {connect} from 'react-redux'

class MenuList extends Component{
    state = {
        search: '',
        criteria: null,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    updateSearch = (e) => {
        e.preventDefault();
        this.setState({
            search: e.target.value.substr(0, 20)
        })
    }

    render(){

        const {menus, auth, user} = this.props;
        console.log(menus);

        const catererMenus = menus && menus.filter((menu) => {
            return menu.authId === auth.uid
            }
        )

        const menusFilter = menus && menus.filter((menu) => {
            // const criteriaSelect = this.state.criteria;
                return (menu.company.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
        })

        if(user.category !== 'customer' && user.category !== 'dispatcher'){
            return(
                <div>
                {catererMenus && catererMenus.map((menu, index) => 
                (menu.authId !== auth.uid)?<div claaaName='Contianer'></div>:
                <div claaaName='Contianer'>
                    <Table>
                        <Row>
                            <Col>
                                <MenuSummary menu={menu} key={index}/>
                            </Col>
                        </Row>
                    </Table>
                </div>
                )}
                </div>
            )
        }

        if(user.category !== 'caterer' && user.category !== 'dispatcher'){ 
        return (
            <div className="Container" >
                <Table>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Row>
                                    <Col md>
                                        <Form.Group>
                                            <h6>Search by Hotel or Caterer</h6>
                                            <input type="text"
                                            className="search"
                                            placeholder='Search menu...'
                                            value={this.state.search}
                                            onChange={this.updateSearch}
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md>
                                        <Form.Group>
                                            <h6>Search by Meanu Time</h6>
                                            <input type="text"
                                            className="search"
                                            placeholder='Search menu...'
                                            value={this.state.searchByMenuTime}
                                            onChange={this.updateSearchByMenuTime}
                                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                            </Form>
                            {menusFilter && menusFilter.map((menu, index) => 
                                <Link to={'/menu/'+menu.menuId} key={menu.menuId}>
                                    <MenuSummary menu={menu} key={index}/>
                                </Link>
                            )}
                    </Col>
                </Row>
                </Table>
                <br/>
                <br />
            </div>
        )}else {
            return <div></div>
        }
    }

}

export default MenuList;