import React from 'react'
import {Card} from 'react-bootstrap'

const DisplayError = () => {
        return (
            <div>
                <Card className="text-center">
                <Card.Body>
                    <h4>Sorry, you need to be upgraded to professional caterer to view this page</h4>
               </Card.Body>
            </Card>
            </div>
        );
    }

    export default DisplayError;

