import React, { Component } from "react";
import { GiftedChat } from "react-web-gifted-chat";
//import axios from "axios";
import UserChatBox from "./UserChatBox";
import ContactBox from "./ContactBox";
import HomeChatBox from "./HomeChatBox";
import VideoChatBox from "./VideoChatBox";
//import ErrorHandling from "./ErrorHandling";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.handleStopVideo = this.handleStopVideo.bind(this);

    this.state = {
      messages: [
        /*{
                  id: "81d9eeaf-918e-4184-9d29-cb2b88ada876",
                  text: "Hello Medium!",
                  user: {
                    avatar:
                      "https://lh4.googleusercontent.com/-5_Q2XW37ylw/AAAAAAAAAAI/AAAAAAAAC1c/tFrvjFVXwyg/photo.jpg",
                    id: "er3JJoRkKwVfmRepUYMr46367P22",
                    name: "Jan Romaniak"
                  }
                }*/
        /*,
                {
                  id: "81d9eeaf-918e-4184-9d29-cb2b88ada876",
                  text: "Hi!",
                  user: {
                    avatar:
                      "https://lh4.googleusercontent.com/-5_Q2XW37ylw/AAAAAAAAAAI/AAAAAAAAC1c/tFrvjFVXwyg/photo.jpg",
                    id: "er3JJoRkKwVfmRepUYMr46367P22",
                    name: "Jan Romaniak"
                  }
                }*/
      ],
      contacts: [
        {
          avatar:
            "https://lh4.googleusercontent.com/-5_Q2XW37ylw/AAAAAAAAAAI/AAAAAAAAC1c/tFrvjFVXwyg/photo.jpg",
          id: "er3JJoRkKwVfmRepUYMr46367P22",
          name: "Jan Romaniak",
          isSelected: false
        },
        {
          avatar:
            "https://lh4.googleusercontent.com/-5_Q2XW37ylw/AAAAAAAAAAI/AAAAAAAAC1c/tFrvjFVXwyg/photo.jpg",
          id: "er3JJoRkKwVfmRepUYMr46367P22",
          name: "Bertrand Novak",
          isSelected: false
        },
        {
          avatar:
            "https://lh4.googleusercontent.com/-5_Q2XW37ylw/AAAAAAAAAAI/AAAAAAAAC1c/tFrvjFVXwyg/photo.jpg",
          id: "er3JJoRkKwVfmRepUYMr46367P22",
          name: "Paul Busmut",
          isSelected: false
        },
        {
          avatar:
            "https://lh4.googleusercontent.com/-5_Q2XW37ylw/AAAAAAAAAAI/AAAAAAAAC1c/tFrvjFVXwyg/photo.jpg",
          id: "er3JJoRkKwVfmRepUYMr46367P22",
          name: "Ian Joubert",
          isSelected: false
        }
      ],
      selectedUser: {},
      isAuthenticated: false,
      isSelected: false,
      isCallInitiator: false,
      isCallOnGoing: false,
      isCallAccepted: false,
      isCallStopped: false,
      selectedAvatar: "",
      selectedName: "",
      callRoomId: ""
    };
  }
  handleChange(user, e) {
    if (user) {
      user.isSelected = true;
      this.setState({
        selectedUser: user,
        selectedAvatar: user.avatar,
        selectedName: user.name,
        isSelected: true
      });
      return user;
    }
  }

  handleCall(e) {
    this.setState({
      isCallInitiator: true,
      isCallOnGoing: true
    });
  }

  handleStopVideo(e) {
    this.setState({
      isCallOnGoing: false,
      isSelected: false
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  saveMessage(message) {
    //save messages into database related to the user sent to selected user
    //to call inside OnSend()
  }
  loadMessages() {
    //Load messages from database related to the user and selected user
  }

  /*onSend(messages) {
      for (const message of messages) {
        this.saveMessage(message);
      }
    }*/

  renderUserChatBox() {
    return (
      <UserChatBox
        handleCall={this.handleCall}
        name={this.state.selectedName}
        avatar={this.state.selectedAvatar}
        location={"Bruxelles"}
      ></UserChatBox>
    );
  }

  renderContacts() {
    const contacts = [];
    const entries = this.state.contacts.entries();
    for (const [i, item] of entries) {
      contacts.push(
        <ContactBox handleChange={this.handleChange} user={item} key={i} />
      );
    }
    return contacts;
  }

  renderHomeChatBox() {
    return <HomeChatBox />;
  }

  renderGiftedChat() {
    return (
      <GiftedChat
        user={this.state.selectedUser}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
      />
    );
  }

  renderVideoChatBox() {
    return (
      <VideoChatBox
        user={this.state.selectedUser}
        handleStopVideo={this.handleStopVideo}
      />
    );
  }
  //componentWillMount() {}
  componentDidMount() {
    //Query the API to retrieve the list of contact
    //Query the API to retrieve the list of Message
    /*axios.get("http://localhost:7878/api/todos").then(res => {
                  const todos = res.data;
                  this.setState({ todos });
                });*/
    if (this.state.isSelected && this.state.isCallOnGoing) {
      console.log("ENTER INIT");
      const script = document.createElement("script");
      script.src = "../webrtc/ClientWebRTC.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }

  render() {
    return (
      <div className="chat" style={styles.container}>
        <div style={styles.contactList}> {this.renderContacts()} </div>
        {!this.state.isSelected && !this.state.isCallOnGoing && (
          <div style={styles.chat}>
            <div style={styles.chat}>{this.renderHomeChatBox()}</div>
          </div>
        )}
        {this.state.isSelected && !this.state.isCallOnGoing && (
          <div style={styles.chat}>
            <div style={styles.chat}>{this.renderUserChatBox()}</div>
            <div style={styles.chat}>{this.renderGiftedChat()}</div>
          </div>
        )}
        {this.state.isSelected && this.state.isCallOnGoing && (
          <div style={styles.chat}>
            <div style={styles.chat}>{this.renderVideoChatBox()} </div>
          </div>
        )}
        <div style={styles.settings}> </div>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "100vh"
  },
  contactList: {
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  chat: {
    display: "flex",
    flex: 2,
    flexDirection: "column",
    borderWidth: "0.5px",
    borderColor: "#ccc",
    borderRightStyle: "solid",
    borderLeftStyle: "solid"
  },
  settings: {
    display: "flex",
    flex: 1,
    flexDirection: "row"
  }
};

export default ChatBox;
