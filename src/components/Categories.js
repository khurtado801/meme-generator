import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCategories } from '../actions';
import { setCategory } from '../actions';
import { showDialog } from '../actions';
import { hideDialog } from '../actions';
import { action } from '../actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import '../styles/categories.css';
const JOKE_URL = 'https://api.chucknorris.io/jokes';

const theme = createMuiTheme({
	typography: {
		// Tell Material-UI what the font-size on the html element is.
		htmlFontSize: 10,
	},
});

class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentInfo: '',
			open: false,
		};
	}

	/**
	 * #Once component is mounted, make GET request for categories
	 */
	componentDidMount() {
		this.fetchCategories();
	}

	getCategories = () => {
		axios.get(JOKE_URL + '/categories') // #Promise
			.then((response) => {  // #If all goes well
				this.setState({
					categories: [...response.data] // #Copy response array to object state using spread
				});
				console.log('Category Response: ', response);
			})
			.catch((err) => console.error('Error', err)); //If there is error, console it
	}

	fetchCategories() {
		fetch(JOKE_URL + '/categories', {
			method: 'GET'
		}).then(response => response.json())
			.then(json => {
				this.props.getCategories(json);
			});
	}

	handleCategory = (usrCategories) => {
		let usrCategorySelect = usrCategories.category;
		fetch(`https://api.chucknorris.io/jokes/random?category=${usrCategorySelect}`, {
			method: 'GET'
		}).then(json => {
			this.props.setCategory(json);
		});
	}

	handleNewCategory = (usrCategories) => {
		let temp = usrCategories.category;
		axios.get(`https://api.chucknorris.io/jokes/random?category=${temp}`)
			.then((response) => {
				this.props.setCategory(response.data.value);
				this.props.showDialog(true);
			})
			.catch((err) => console.error('Error', err)); //If there is error, console it
	}

	// handleClose = () => {
	// 	this.setState({
	// 		open: false
	// 	});
	// };

	handleClose = () => {
		this.props.hideDialog();
	}

	render() {
		console.log('Props: ',this.props);
		return (
			<div className="categories-wrapper">
				<h1 className="categories-title-text">Ever wonder how to categorize the pure awesomeness that is Chuck Norris? Wonder no more! Click on one of the categories below to find out!</h1>
				<div>
	  				<div className="flex-container wrap">
	  					<MuiThemeProvider theme={theme}>
	  						{
	  							this.props.categories.map((category, id) => { // #For each element assign index
	  								return <p className="category-joke-item flex-item"><Button className="category-joke-text" onClick={() => this.handleNewCategory({category})} key={id}>{category}</Button></p>; // #Return value wrapped in p-tag
	  							})
	  						}
	  					</MuiThemeProvider>
	  					<Dialog className="dialog-wrapper"
	  						// open={this.state.open}
							open={this.props.openDialog.open}
	  						onClose={this.handleClose}
	  						aria-labelledby="alert-dialog-title"
	  						aria-describedby="alert-dialog-description"
	  					>
	  						<DialogTitle id="alert-dialog-title">{''}</DialogTitle>
	  						<DialogContent>
	  							<DialogContentText id="alert-dialog-description">
	  								{this.state.currentInfo}
	  							</DialogContentText>
	  						</DialogContent>
	  						<DialogActions>
	  							<Button onClick={this.handleClose} color="primary" autoFocus>
									Close
	  							</Button>
	  						</DialogActions>
						</Dialog>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, { getCategories, setCategory, showDialog, hideDialog })(Categories);