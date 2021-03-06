import React from "react";
import firebase from "firebase";
import { Typography } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Button from "@material-ui/core/Button";
import avatarPlaceholder from "../assets/avatar.png";
import { Auth } from "../Auth";
import TextField from "@material-ui/core/TextField";
import "../dashboard/dashboard.css";
const DATABASE_URL = "https://corona404-2499f.firebaseio.com";

export class Profile extends React.Component {
  state = {
    url: "",
    file: null,
    user: null,
    authSubscription: null,
    name: "",
    newName: "",
  };

  fetchUserData = () => {
    fetch(`${DATABASE_URL}/name/${this.state.user.uid}.json`)
      .then((response) => response.json())
      .then((name) => this.setState({ name }));
  };

  componentDidMount() {
    const authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user }, () => {
        this.fetchUserData();
        firebase
          .storage()
          .ref(`avatars/${this.state.user.uid}`)
          .getDownloadURL()
          .then((url) => this.setState({ url }));
      });
    });
    this.setState({ authSubscription });
    console.log(this.state.name);
  }

  componentWillUnmount() {
    this.state.authSubscription && this.state.authSubscription();
  }

  handleOnChange = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();

    firebase
      .storage()
      .ref(`avatars/${this.state.user.uid}`)
      .put(this.state.file)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          this.setState({ url, file: null });
        });
      });
  };

  handleOnDataChage = (event) => {
    this.setState({
      newName: event.target.value,
    });
  };

  handleOnDataSubmit = (event) => {
    event.preventDefault();

    fetch(`${DATABASE_URL}/name/${this.state.user.uid}.json`, {
      method: "PUT",
      body: JSON.stringify(this.state.newName),
    }).then(() => {
      this.setState({ newName: "" });
      this.fetchUserData();
    });
  };

  render() {
    return (
      <Auth>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height:"100vh",
            backgroundImage: "linear-gradient(#ffffff 0%, #b2dddf 91%)"
          }}
        >
          <h1 className="header2__span" style={{margin:"25px"}}>Uzupełnij Profil</h1>

          <h2 className="header2__title" style={{ marginTop: "50px" }}>
            Cześć {this.state.name}!
          </h2>

          <img
            alt="avatar"
            style={{
              width: "240px",
              height: "210px",
              marginBottom: "15px",
              borderRadius: "25px",
            }}
            src={this.state.url || avatarPlaceholder}
          />

          <form
            onSubmit={this.handleOnSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              accept="image/*"
              id="avatar"
              type="file"
              style={{ display: "none" }}
              onChange={this.handleOnChange}
            />
            <label htmlFor="avatar">
              <Button
                component="span"
                variant="outlined"
                color="secondary"
                startIcon={<PhotoCamera />}
              >
                Zmień avatar.
              </Button>
            </label>
            {this.state.file && (
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                style={{ marginTop: "5px" }}
              >
                Wyślij
              </Button>
            )}
          </form>
          <Typography variant="caption">
            {this.state.file && this.state.file.name}
          </Typography>

          <form
            onSubmit={this.handleOnDataSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <TextField
              label="Wpisz imię..."
              value={this.state.newName}
              onChange={this.handleOnDataChage}
            />
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              style={{ marginTop: "20px" }}
            >
              Save
            </Button>
          </form>
        </div>
      </Auth>
    );
  }
}
