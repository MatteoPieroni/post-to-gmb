import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Select from 'react-select';

import * as Constants from '../constants';
import {apiData} from '../apiData';
import {gapiWrapper} from './gapiWrapper';
import Button from './Button';
import PostCreator from './PostCreator'
import LoginOnGoogle from './LoginOnGoogle';
import PageSelector from './PageSelector';

const gapi = gapiWrapper.init();

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      languageCode: "it-IT",
      topicType: Constants.topicType.standard,
      selectedLocations: [],
    }

    this.getUserAndToken = this.getUserAndToken.bind(this);
    this.getAccounts = this.getAccounts.bind(this);
    this.getLocations = this.getLocations.bind(this);
    this.selectLocations = this.selectLocations.bind(this);
    this.getDataToSend = this.getDataToSend.bind(this);
    this.postToGMB = this.postToGMB.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.textChangeFunction = this.textChangeFunction.bind(this);
  }

  getUserAndToken() {
    return new Promise((resolve, reject) => {
      let user = gapi.auth2.getAuthInstance().currentUser.get();
      let oauthToken = user.getAuthResponse().access_token;
      if(user && oauthToken) {
        this.setState({
          userInstance: {
            user: user,
            oauthToken: oauthToken,
          }
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.userInstance.oauthToken}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        resolve();
      } else {
        let error = 'NOT_CONNECTED';
        reject(error);
      }
    })
  }

  getAccounts() {
    let component = this;

    this.getUserAndToken().then(() => {

      let url = apiData.gmb_api_version + '/accounts';

      axios.get(url).then(function(response) {
        console.log(response);
        component.getLocations(response.data.accounts);
      }).catch(function(err) {
        console.log(err);
      });

    }).catch(error => {
      console.log(error);
    })
  }

  getLocations(accounts) {
    let component = this;
    for(let i = 0; i < accounts.length; i++) {
        let url = apiData.gmb_api_version + '/' + accounts[i].name + '/locations';

        axios.get(url).then(function(response) {
          console.log(response);

          let locations = [];
          response.data.locations.map((location) => {
            if(location.openInfo.status === Constants.placeStatus.open && location.locationState.isVerified === true) {
              locations.push({
                value: location.name,
                label: `${location.locationName} (${(location.storeCode) ? location.storeCode : 'no-sc' })`
              });
            };
          });
          component.setState({
            locations: locations,
          });
        }).catch(function(err) {
          console.log(err);
        });

    }
  }

  selectLocations(selectedOption) {
    let selectedLocations = this.state.selectedLocations;

    /*if(e.target.checked) {
      selectedLocations.push(e.target.id);
    } else {
      let index = selectedLocations.indexOf(e.target.id);
      if (index > -1) {
        selectedLocations.splice(index, 1);
      }
    }*/

    this.setState({
      selectedLocations: selectedOption,
    });
  }

  getDataToSend(event) {
    event.preventDefault();

    const formToSubmit = document.getElementById(event.target.id);
    const formElements = formToSubmit.elements;
    const dataToSend = {};
    dataToSend.languageCode = this.state.languageCode;
    dataToSend.callToAction = {};
    dataToSend.topicType = this.state.topicType;

    for(let i = 0; i < formElements.length; i++) {
      switch(formElements[i].name) {
        case 'post-text':
          dataToSend.summary = formElements[i].value;
          break;
        case 'post-button':
          dataToSend.callToAction.actionType = formElements[i].value;
          break;
        case 'post-button-url':
          dataToSend.callToAction.url = formElements[i].value;
          break;
      }
    }

    if(dataToSend.callToAction.actionType === Constants.button.notSpecified)
      delete dataToSend.callToAction;

    this.postToGMB(dataToSend);

  }

  postToGMB(data) {
    const locationsToSend = this.state.selectedLocations;
    locationsToSend.forEach((el) => {
    let url = apiData.gmb_api_version + '/' + el.value + '/localPosts';

    axios.post(url, JSON.stringify(data)).then(function(response) {
        console.log(response);
      }).catch(function(err) {
        console.log(err);
      });
    })
  }

  uploadImage() {
    console.log('uploading');
  }

  textChangeFunction() {
    console.log('text changed');
  }

  render() {
    const locations = [];
    /*const accountPages = (this.state.locations) ? (this.state.locations.map((location) => {
      //return <PageSelector key={location.name} pageName={location.locationName} pageId={location.name} onChange={this.selectLocations} />
      locations.push({
        value: location.name,
        label: location.locationName
      });
    })) : '';*/
    return (
      <div className="App">
        <LoginOnGoogle clientReady={this.getAccounts} clientNotReady={() => console.log('client not ready')} />
        <header className="App-header">
        </header>
        <div className="page-selector__list">
          <Select options={this.state.locations} isMulti={true} isSearchable={true} onChange={this.selectLocations} />
        </div>
        <PostCreator onSubmit={this.getDataToSend} uploadImage={this.uploadImage} textChanged={this.textChangeFunction} />
      </div>
    );
  }
}

export default App;
