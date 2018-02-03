import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import logo from './aux/germs.svg';
import pain from './aux/pain.svg';
import prescription from './aux/prescription.svg';
import like from './aux/like.svg';
import './App.css';
import Notification from './notification.js';
import Tweets from './Tweets.js';
import WebFont from 'webfontloader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { PieChart, Pie, Sector } from 'recharts';

WebFont.load({
    google: {
        families: ['Open Sans:300,400', 'sans-serif']
    }
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: 'loading',
            showTweets: false,
            coordinates: {
              "latitude": 0,
              "longitude": 0
            }
        };
    }

    callAPI(){
        let API_KEY = 'AIzaSyDYXLym9KjBK9xmcoDfTVjpZ24RJwYpZmg'
        fetch('http://api.flutrack.org/?s=flu').then(function (response) {
            return response.json();
        }).then(result => {
            result.map(tweet => {
                fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + tweet.latitude + ',' + tweet.longitude + '&sensor=true&key=' + API_KEY).then(function (response) {
                    return response.json();
                }).then(result => {
                    tweet.location = result;
                    console.log(result);
                })
            })
            this.setState({tweets:result})
            // console.log(this.state.tweets);
        });
    }

    componentDidMount() {
        this.getGeoLoc();
        // this.callAPI();
    }

    toggleTweet() {
        var state = this.state.showTweets;
        this.setState({showTweets:!state});
    }

    callFluLocation = (e) => {
        var zip = e.target.value;

        if(zip.length > 4) {
            console.log("A real zip code");
        }
    }

    getGeoLoc() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition( (position) => {
            var json = {
              "latitude": position.coords.latitude,
              "longitude": position.coords.longitude,
            };
            this.setState({coordinates:json})
        });
      }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div className="App">
                        <div>
                            <img src={logo} className="App-logo" alt="logo" />
                            <h2>Outfluenza</h2>
                        </div>
                        <hr/>
                        <h2> Your community is % </h2>
                        <div className='division'>
                            <div className='personal'>
                                <img src={pain} className="pain" alt="pain" />
                                <h2>You are % likely to contract the flu</h2>
                                <h4>Some more data</h4>
                            </div>
                        </div>
                        <div className='division'>
                            <div className='community'>
                                <img src={prescription} className="prescription" alt="prescription" />
                                <h2>Your community is % infected</h2>
                                <h4>Some more data</h4>
                            </div>
                        </div>
                        <div className='tweets'>
                            <RaisedButton className="button" label="Tweets" primary={true} onClick={this.toggleTweet.bind(this)} />
                            {this.state.showTweets ? <Tweets tweets={this.state.tweets}/> : null}
                        </div>
                        <div className='division'>
                            <div className='footer'>
                                <h4>Made with <img src={like} className="like" alt="like" /></h4>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
