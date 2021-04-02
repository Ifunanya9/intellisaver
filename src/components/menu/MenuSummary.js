import React from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import MealList from '../meals/MealList';
// import MealSummary from '../meals/MealSummary';
// import moment from 'moment';

const MenuSummary = (props) => {
    const {menu} = props;
    const {} = menu;
    return (
        <Link to={'/menus/'+ menu.menuId} key={menu.menuId}>
            <Button variant="non" type="button">
                <Card>
                    <Card.Header className='bg-secondary text-white'>Click to Open Menu</Card.Header>
                    <Card.Body>
                        <Card.Title><strong>{menu.menuName}</strong></Card.Title>
                        <Card.Text>{menu.menuTime}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <strong>Created By: <span/> {menu.company}</strong>
                        {/* <strong>Date Created: {moment(createdAt.toDate()).format('MMMM Do YYYY, h:mm:ss a')}{' || '}{menu.company}</strong> */}
                    </Card.Footer>
                </Card> 
            </Button>
        </Link>
    )
}

export default MenuSummary;
