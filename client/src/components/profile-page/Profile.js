import React, { Component } from 'react';
import { Container, Header, Input, Button, Segment } from 'semantic-ui-react';
import Axios from 'axios';
import Qs from 'qs';

import HeaderBar from '../header/Header';
import NavBar from '../nav/Nav';

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      categories: null,
      tags: [],
      username: null,
      bio: null
    };
  }

  componentWillMount() {
    if (this.props.id != null) {
      Axios.post("/api/user", Qs.stringify({
        "id" : this.props.id,
        "pic": this.props.profilePic,
        "name": this.props.name
      })).then((res) => {
        this.setState({
          "username" : res.data.username,
          "bio": res.data.bio,
          "tags": res.data.tags
        })
        console.log(res.data);
      })
    }
  }

  updateData() {

    console.log(document.getElementById("bio").value);
    var arr = document.getElementById("tags").value.split(",")
    for(let index = 0; index < arr.length; index++) {
      arr[index] = arr[index].trim()
    }
    Axios.post("/api/user/update", Qs.stringify({
      "id" : this.props.id,
      "username" : document.getElementById("username").value,
      "bio" : document.getElementById("bio").value,
      "tags": arr
    })).then( res => {
      alert("Your profile has been successfully updated!");
    })
  }

  render() {
    return (
      <div className="fullpage">
        <NavBar/>
        <HeaderBar title={
          <div>
          {this.props.name}
          </div>
        }/>
        <Container text>
          <Header>
            Facebook Messenger Username
          </Header>
          <Input id="username" fluid defaultValue={this.state.username}/> 
          <Header>
            Categories
          </Header>
          <Input fluid/>
          <Header>
            Tags
          </Header>
          <Input id="tags" fluid defaultValue={this.state.tags.join(", ")}/>
          <Header>
            About me
          </Header>
          <Input id="bio" fluid defaultValue={this.state.bio}/> 
          <Header>
            Example input field
          </Header>
          <Input fluid placeholder='Input...' />

          <Segment basic>
            <Button onClick={() => {this.updateData()}}>Submit</Button>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default Profile;
