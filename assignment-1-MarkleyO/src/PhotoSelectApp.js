import React from 'react';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {dialogOpen: false,
						displayError: false,
						pairs: [],
		  				temporaryURL: "",
		   				temporaryCaption: ""};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	// Borrowing some of this from reactjs documentation
	openDialog(){
		this.setState(state => ({
			dialogOpen: true 
		}));
	}
	closeDialog(){
		this.setState(state => ({
			dialogOpen: false,
			displayError: false,
			pairs: [],
			temporaryURL: "",
			temporaryCaption: ""
		}));
	}
	handleSubmit(event){
		const imageCaptionPair = {image: this.state.temporaryURL, caption: this.state.temporaryCaption} 
		if(imageCaptionPair.image == "" || imageCaptionPair.caption == ""){
			this.setState(state => ({
				displayError: true
			}));
		}else{
			this.setState(prevState => ({
				displayError: false,
				pairs: [imageCaptionPair, ...prevState.pairs],
				temporaryURL: "",
				temporaryCaption: ""
			}))
		}

		event.preventDefault();
	}
	handleChange(event){
		const name = event.target.name;
		this.setState(state => ({
			[name]: event.target.value,
		}))
	}
	render() {
		console.log(this.state);
		let imageElements = this.state.pairs.map((pair, index) => <div key={index} id={index}><img src={pair.image} alt="User Image"/>{pair.caption}</div>)
		return(
			<div class="row">
				<div class="col" id="left side">
					<button onClick = {() => this.openDialog()}> Open photo entry dialog </button>
					
					{
						this.state.dialogOpen ?
						<form onSubmit={this.handleSubmit}>
							<input name="temporaryURL"  type="text" placeholder="Enter Photo URL" value={this.state.temporaryURL} onChange={this.handleChange}/>
							<input name="temporaryCaption" type="text" placeholder="Enter Caption" value={this.state.temporaryCaption} onChange={this.handleChange}/>
							<button type="submit"> Accept </button>
							<button onClick = {() => this.closeDialog()}> Cancel </button>
							{
								this.state.displayError ?
								<div> Please Fill Out Both Fields in Form </div>
								:
								<div></div>
							}
						</form>
						:
						<div></div>
					}
				</div>
				<div class="col" id="right side">
					{imageElements}
				</div>
			</div>
		);
	}
}

export default App;