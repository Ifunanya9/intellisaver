import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { createMeal } from '../../store/actions/mealActions';
import { Redirect } from 'react-router-dom';
import {mealTypes, mealCategories} from '../../constants/MealType';
import { getFirebase} from 'react-redux-firebase';
import DisplayError from '../pages/DisplayError';

class CreateMeal extends Component {

    state = {
        name: '',
        description: '',
        mealType: '',
        mealCategory:'',
        mealCost: 0,
        imageUrl: '',
        progress: 0,
        image: null
    }

    handleChange = (e) => {
        console.log(e);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleImageChange = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }))
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
    //    console.log(this.state);
        this.props.createMeal(this.state)
        this.props.history.push('/meals')
    }


    handleUpload = () => {
        const { image } = this.state;
        const storage = getFirebase().storage();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {
            // progress function ...
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({ progress });
          },
          error => {
            // Error function ...
            console.log(error);
          },
          () => {
            // complete function ...
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                this.setState({imageUrl: url });
              });
          }
        );
      };

    render() {
        const {auth, user} = this.props;
    if(!auth.uid) return <Redirect to='/signin' />
    if(user.category !== 'caterer') return <DisplayError/>;
        return(
            <div>
            <Form className= "form-layout" onSubmit={this.handleSubmit}>  
                <h5>Create meal</h5>

                <Form.Group className= "form-layout" >
                    <Form.Control type="text" id="name" placeholder="Enter meal name" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Control type="text" id="description" placeholder="Enter description" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Control type='number' id='mealCost' placeholder='Enter cost of meal' onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group>
                    <select
                        defaultValue= 'Select meal category'
                        id = 'mealCategory' 
                        className="custom-select" 
                        onChange={this.handleChange}>
                        <option disabled>Select meal category</option>
                       {mealCategories.map((x, y) => <option key={y} value={x}>{x}</option>)}
                    </select>
                </Form.Group>

                <Form.Group>
                    <select
                        defaultValue= 'Select meal type'
                        id = 'mealType' 
                        className="custom-select" 
                        onChange={this.handleChange}>
                        <option disabled>Select meal type</option>
                       {mealTypes.map((x, y) => <option key={y} value={x}>{x}</option>)}
                    </select>
                </Form.Group>

                <Form.File id="formcheck-api-custom" custom>
                    <Form.File.Input isValid onChange={this.handleImageChange}/>
                        <Form.File.Label data-browse="Upload Meal Picture">
                            {!this.state.image? 'No File selected' : this.state.image.name }
                        </Form.File.Label>
                    <Form.Control.Feedback type="valid">{this.state.progress}% file uploaded </Form.Control.Feedback>
                </Form.File>
                <Button onClick={ this.handleUpload } variant="secondary">
                    Upload Image
                </Button>
                <Button variant="secondary" type="submit">
                    Create
                </Button>
            </Form> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        meals: state.firestore.ordered.meals,
        user: state.firebase.profile
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        createMeal: (meal) => dispatch(createMeal(meal))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateMeal);