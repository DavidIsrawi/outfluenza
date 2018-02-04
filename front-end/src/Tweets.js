import React, { Component } from 'react';
import Tweet from './Tweet.js';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Tweets.css';

class Tweets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: '',
            key: 0,
            tweets: []
        };
    }

    render() {

        var tweets = this.props.tweets;

        return (
            <div className='feed'>
              <MuiThemeProvider>
                {/* <input
                    type='text'
                    value={this.state.search}
                    onChange={this.callFluLocation}
                />
                <br></br>
                <br></br> */}
                {
                    (this.props.tweets !== 'loading' ?
                        this.props.tweets.map(
                            tweet =>
                            <Tweet
                                user={tweet.user_name}
                                text={tweet.tweet_text}
                            />
                        ) : <CircularProgress mode="indeterminate" />)}
                    </MuiThemeProvider>
            </div>
        );
    }
}

export default Tweets;
