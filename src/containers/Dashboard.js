import React, { Component } from 'react';
import axios from 'axios';
import { s3Upload } from "../libs/awsLib";

import Select from 'react-select';

import * as Constants from '../constants';
import {apiData} from '../apiData';
import config from '../config';
import {gapiWrapper} from '../components/gapiWrapper';
import Button from '../components/Button';
import PostCreator from '../components/PostCreator'
import LoginOnGoogle from '../components/LoginOnGoogle';
import PageSelector from '../components/PageSelector';

const gapi = gapiWrapper.init();

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languageCode: "it-IT",
      topicType: Constants.topicType.standard,
      selectedLocations: [],
    }

    this.googleHeaders = {};

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
        this.googleHeaders = {
          'Authorization': `Bearer ${this.state.userInstance.oauthToken}`
        }
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

      axios.get(url, {headers: this.googleHeaders}).then(function(response) {
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

        axios.get(url, {headers: this.googleHeaders}).then(function(response) {
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

  changeFile = (event) => {
    this.file = event.target.files[0];
  }

  createPicture(locationUrl) {
    let component = this;
    return new Promise(function(resolve, reject) {

      let urlMediaCreate = apiData.gmb_api_version + '/' + locationUrl + '/media:startUpload';

      axios.post(urlMediaCreate, {} ,{headers: component.googleHeaders}).then(function(response) {
        console.log(response);
        resolve(response.data.resourceName, locationUrl);
      }).catch(function(err) {
        console.log(err);
        reject(err);
      });
    })
  }

  uploadPicture(ref, locationUrl) {
    var blobFile = document.getElementById('file-upload').files[0];
    /*var formData = new FormData();
    formData.append("photo", blobFile);
    formData.append("ref", ref);
    formData.append("token", this.state.userInstance.oauthToken);*/
    /*return new Promise((resolve, reject) => {
      let urlMediaUpload = apiData.gmb_api_version_upload + '/media/' + ref + '?upload_type=media';

      axios.post('http://localhost:3010/upload', formData).then(function(response) {
        console.log(response);
        resolve(response);
      }).catch(function(err) {
        console.log(err);
        reject(err);
      });
    })*/
    return new Promise((resolve, reject) => {
      if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
        let err = `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`;
        reject(err);
      } else {
        s3Upload(blobFile).then(res => {
          console.log(Constants.awsApi.url + res.key);
        }).catch(err => {
          console.log(err);
        })
        reject();
      }
    })
  }

  gmbPicture(response, locationUrl, ref) {
    let component = this;
    return new Promise(function(resolve, reject) {

      let urlMediaCreate = apiData.gmb_api_version + '/' + locationUrl + '/media';

      let data = {
        mediaFormat: 'PHOTO',
        locationAssociation: {
          "category": 'ADDITIONAL'
        },
        "dataRef": {
          "resourceName": ref
        }
      };

      axios.post(urlMediaCreate, data, {headers: component.googleHeaders}).then(function(response) {
        console.log(response);
        resolve(response);
      }).catch(function(err) {
        console.log(err);
        reject(err);
      });
    })
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
    let component = this;
    const locationsToSend = this.state.selectedLocations;
    locationsToSend.forEach((el) => {

    let locationUrl = apiData.gmb_api_version + '/' + el.value;

    let pictureRef;

    this.createPicture(el.value).then((response) => {
        pictureRef = response;
      this.uploadPicture(response, el.value).then((response) => {
        console.log(response)
        this.gmbPicture(response, el.value, pictureRef).then((response) => {
          console.log(response);
          data.media = [
            {
              mediaFormat: 'PHOTO',
              sourceUrl: response.data.googleUrl,
            }
          ];

          let postUrl = locationUrl + '/localPosts';
          axios.post(postUrl, JSON.stringify(data), {headers: component.googleHeaders}).then(function(response) {
              console.log(response);
            }).catch(function(err) {
              console.log(err);
            });
        }).catch((err) => {
          console.log(err)
        })
      }).catch((error) => {
        console.log(error)
      });
    })
    .catch((error) => {
      console.log(error)
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
    return (
      /*const accountPages = (this.state.locations) ? (this.state.locations.map((location) => {
        //return <PageSelector key={location.name} pageName={location.locationName} pageId={location.name} onChange={this.selectLocations} />
        locations.push({
          value: location.name,
          label: location.locationName
        });
      })) : '';*/
      <div>
        <LoginOnGoogle clientReady={this.getAccounts} clientNotReady={() => console.log('client not ready')} />
        <div className="page-selector__list">
            <Select options={this.state.locations} isMulti={true} isSearchable={true} onChange={this.selectLocations} />
        </div>
        <PostCreator onSubmit={this.getDataToSend} uploadImage={this.uploadImage} textChanged={this.textChangeFunction} />
      </div>
    )
  }
}