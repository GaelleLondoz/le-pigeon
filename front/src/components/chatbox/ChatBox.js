import React, { Component } from "react";
import { GiftedChat } from "react-web-gifted-chat";
import UserChatBox from "./UserChatBox";
import ContactBox from "./ContactBox";
import HomeChatBox from "./HomeChatBox";
import VideoCallerChatBox from "./VideoCallerChatBox";
import VideoReceiverChatBox from "./VideoReceiverChatBox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

var serverConnection;

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.monitorIncomingCalls = this.monitorIncomingCalls.bind(this);
    this.handleStopVideo = this.handleStopVideo.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);

    this.state = {
      uuid: "er3JJoRkKwVfmRepUYMr46367P24",
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
          isSelected: false,
        },
        {
          avatar:
            "https://lh4.googleusercontent.com/-5_Q2XW37ylw/AAAAAAAAAAI/AAAAAAAAC1c/tFrvjFVXwyg/photo.jpg",
          id: "er3JJoRkKwVfmRepUYMr46367P23",
          name: "Bertrand Novak",
          isSelected: false,
        },
        {
          avatar:
            "https://lh4.googleusercontent.com/-5_Q2XW37ylw/AAAAAAAAAAI/AAAAAAAAC1c/tFrvjFVXwyg/photo.jpg",
          id: "er3JJoRkKwVfmRepUYMr46367P24",
          name: "Paul Busmut",
          isSelected: false,
        },
        {
          avatar:
            "https://lh4.googleusercontent.com/-5_Q2XW37ylw/AAAAAAAAAAI/AAAAAAAAC1c/tFrvjFVXwyg/photo.jpg",
          id: "er3JJoRkKwVfmRepUYMr46367P25",
          name: "Ian Joubert",
          isSelected: false,
        },
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
      liveMessage: {},
      liveConnection: {},
      open: true,
    };
  }

  handleChange(user, e) {
    if (user) {
      user.isSelected = true;
      this.setState({
        selectedUser: user,
        selectedAvatar: user.avatar,
        selectedName: user.name,
        isSelected: true,
      });
      return user;
    }
  }

  handleCall(user, e) {
    if (user) {
      user.isSelected = true;
      this.setState({
        selectedUser: user,
        selectedAvatar: user.avatar,
        selectedName: user.name,
        isSelected: true,
        isCallInitiator: true,
        isCallOnGoing: true,
      });
    }
  }
  monitorIncomingCalls() {
    console.log("monitorIncomingCalls");
    serverConnection = new WebSocket(
      "wss://" + window.location.hostname + ":10443"
    );
    serverConnection.onmessage = (message) => {
      var signal = JSON.parse(message.data);
      console.log({ signal: signal });
      //Change state if incoming call for yourself
      if (signal.uuid === this.state.uuid) {
        console.log("It's for me");
        this.setState({
          isCallOnGoing: true,
          liveMessage: message,
          liveConnection: serverConnection,
        });
      } else {
        console.log("It's NOT for me");
        this.setState({
          isCallOnGoing: false,
        });
        console.log("MonitorIcommingCalls => No call for me");
        console.log({ isCallOnGoing: this.state.isCallOnGoing });
      }
    };
  }
  handleClose(e) {
    this.setState({
      isSelected: false,
      isCallInitiator: false,
      isCallOnGoing: false,
    });
  }
  handleStopVideo(e) {
    this.setState({
      isCallOnGoing: false,
      isSelected: false,
      scriptLoaded: true,
    });
  }

  handleOpen(e) {
    this.setState({
      open: false,
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  saveMessage(message) {
    //save messages into database related to the user sent to selected user
    //to call inside OnSend()
  }
  loadMessages() {
    //Load messages from database related to the user and selected user
  }

  renderUserChatBox() {
    return (
      <UserChatBox
        handleCall={this.handleCall}
        handleClose={this.handleClose}
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
        <ContactBox
          handleCall={this.handleCall}
          handleChange={this.handleChange}
          user={item}
          key={i}
        />
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
        onSend={(messages) => this.onSend(messages)}
      />
    );
  }

  renderVideoChatBox() {
    return (
      <VideoCallerChatBox
        isCaller={true}
        uuid={this.state.selectedUser.id}
        user={this.state.selectedUser}
        handleStopVideo={this.handleStopVideo}
      />
    );
  }

  renderVideoReceiverChatBox() {
    return (
      <VideoReceiverChatBox
        iscaller={false}
        uuid={this.state.uuid}
        liveMessage={this.state.liveMessage}
        liveConnection={this.state.liveConnection}
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
                  this.setState({ todos });*/

    //Init this.state.uuid with the connected user id

    //Monitor incoming calls for the connected user
    this.monitorIncomingCalls(this.state.uuid);
  }

  render() {
    return (
      <div>
        <Dialog fullScreen open={this.state.open} onClose={this.handleOpen}>
          <DialogContent>
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
                  <div style={styles.chat}>{this.renderUserChatBox()}</div>
                  <div style={styles.chat}>{this.renderVideoChatBox()}</div>
                </div>
              )}
              {!this.state.isSelected && this.state.isCallOnGoing && (
                <div style={styles.chat}>
                  <div style={styles.chat}>
                    {this.renderVideoReceiverChatBox()}
                  </div>
                </div>
              )}
              <div style={styles.settings}> </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleOpen} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "100vh",
  },
  contactList: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  chat: {
    display: "flex",
    flex: 2,
    flexDirection: "column",
    borderWidth: "0.5px",
    borderColor: "#ccc",
    borderRightStyle: "solid",
    borderLeftStyle: "solid",
  },
  settings: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
};

export default ChatBox;
