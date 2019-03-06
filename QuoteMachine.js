import React, { Component, Fragment } from 'react';


class QuoteMachine extends Component {

constructor(){
	super();
	this.state = {
		quote: {
			content: '',
			link: '',
			title: ''
		},
		hasQuote: false
	}
	this.END_POINT = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback="
}



getRandomQuote = event => {
	fetch(this.END_POINT)
	.then(response => response.json())
	.then(data => {
		if(data[0].content && data[0].title && data[0].link){
			let {quote} = this.state;
			quote.content = data[0].content;
			quote.link = data[0].link;
			quote.title = data[0].title;
			this.setState({quote}, () => {
				if(this.state.hasQuote === false){
					this.setState({ hasQuote: true})
				}
			})
		}
		else {
			return console.error('404 no quote found');
		}
	})
}

renderQuote = () => {
	const {title, content, link} = this.state.quote;
	return(
		<a href={link} target="_blank">
		<div>
			<h1>{title}</h1>
			<p>{content}</p>
			<hr />
		</div>
		</a>
		)
}

	render(){
		const { hasQuote, quote } = this.state;
		return(

<Fragment>
<h1>Quote Machine</h1>
<button onClick={this.getRandomQuote}>
Click me to get random quote
</button>
<br />
{hasQuote === true ?
	this.renderQuote()
	: 'no quote found 404'}
</Fragment>
			)
	}
}

export default QuoteMachine;