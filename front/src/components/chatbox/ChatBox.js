import React, { Component, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import userAPI from "../services/userAPI";
import messageAPI from "../services/messageAPI";
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
import { InputAdornment } from "@material-ui/core";

var serverConnection;

class ChatBox extends Component {
  //static context = AuthContext;
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.monitorIncomingCalls = this.monitorIncomingCalls.bind(this);
    this.handleStopVideo = this.handleStopVideo.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);

    this.state = {
      //uuid: "er3JJoRkKwVfmRepUYMr46367P24",
      //uuid: currentUser.id,
      messages: [],
      contacts: [],
      /*       contacts: [
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
      ], */
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
      receiverID: null,
      isChatOngoing: false,
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
        isChatOngoing: true,
        isCallOnGoing: false,
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
        isChatOngoing: false,
      });
    }
  }
  monitorIncomingCalls() {
    console.log("monitorIncomingCalls");
    serverConnection = new WebSocket(process.env.REACT_APP_WEB_RTC_SERVER);
    serverConnection.onmessage = (message) => {
      var signal = JSON.parse(message.data);
      console.log({ signal: signal });
      //Change state if incoming call for yourself
      if (signal.uuid === this.state.uuid) {
        this.setState({
          isCallOnGoing: true,
          liveMessage: message,
          liveConnection: serverConnection,
        });
      } else {
        this.setState({
          isCallOnGoing: false,
        });
      }
      if (signal.chat) {
        if (signal.receiver === this.state.uuid) {
          this.state.messages.push(signal.chat);
          this.setState({
            receiverID: signal.sender,
            isChatOngoing: true,
            selectedName: signal.chat.user.name,
            selectedAvatar: signal.chat.user.avatar,
          });
        }
      }
    };
  }
  handleClose(e) {
    this.setState({
      isSelected: false,
      isCallInitiator: false,
      isCallOnGoing: false,
      isChatOngoing: false,
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
    console.log({ MESSAGES: messages });
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    //this.saveMessage(messages);
    this.sendMessage(messages);
  }

  async saveMessage(messages) {
    const message = {
      senderID: this.state.uuid,
      receiverID: this.state.isSelected
        ? this.state.selectedUser.id
        : this.state.receiverID,
      content: messages[0].text,
      status: "SEND",
    };
    await messageAPI.addMessage(message);
  }

  sendMessage(messages) {
    if (this.state.isSelected && this.state.isChatOngoing) {
      serverConnection.send(
        JSON.stringify({
          chat: messages[0],
          sender: this.state.uuid,
          receiver: this.state.selectedUser.id,
        })
      );
    } else if (!this.state.isSelected && this.state.isChatOngoing) {
      serverConnection.send(
        JSON.stringify({
          chat: messages[0],
          sender: this.state.uuid,
          receiver: this.state.receiverID,
        })
      );
    }
  }

  renderUserChatBox() {
    return (
      <UserChatBox
        handleCall={this.handleCall}
        handleClose={this.handleClose}
        name={this.state.selectedName}
        avatar={this.state.selectedAvatar}
      ></UserChatBox>
    );
  }

  renderContacts() {
    const contacts = [];
    const entries = this.state.contacts.entries();
    for (const [i, item] of entries) {
      const contact = {
        id: item.id,
        text: item.content,
        name: item.firstName + " " + item.lastName,
        isSelected: false,
      };
      contacts.push(
        <ContactBox
          handleCall={this.handleCall}
          handleChange={this.handleChange}
          user={contact}
          key={i}
        />
      );
    }
    return contacts;
  }

  /*renderContacts() {
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
  } */

  renderHomeChatBox() {
    return <HomeChatBox />;
  }

  renderGiftedChat() {
    /*const messages = [];
    const entries = this.state.messages.entries();
    for (const [i, item] of entries) {
      if (
        item.status == "SEND" &&
        item.senderID == this.state.selectedUser.id
      ) {
        const message = {
          id: item.id,
          text: item.content,
          user: {},
        };
        //Update messages array
        messages.push(message);
        //Update message status in database
        const params = {
          id: item.id,
          status: "RECEIVED",
        };
        //messageAPI.updateMessageStatus(params);
      }
    }*/
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

  async componentDidMount() {
    // Connect ot the current context
    const customContext = this.context;

    let data = await userAPI.getUser();
    const currentUser = data.user;
    let msgData = {
      receiverID: currentUser.id,
    };

    this.setState({
      //Query the API to retrieve the list of contact
      contacts: await userAPI.getUsers(),
      //Init UUID
      uuid: currentUser.id,
      //Init IsAuthenticated
      isAuthenticated: customContext.isAuthenticated,
      //Init Message related to the current user
      //messages: await messageAPI.getMessages(msgData),
    });
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
              {!this.state.isSelected &&
                !this.state.isCallOnGoing &&
                !this.state.isChatOngoing && (
                  <div style={styles.chat}>
                    <div style={styles.chat}>{this.renderHomeChatBox()}</div>
                  </div>
                )}
              {!this.state.isSelected && this.state.isChatOngoing && (
                <div style={styles.chat}>
                  <div style={styles.chat}>{this.renderUserChatBox()}</div>
                  <div style={styles.chat}>{this.renderGiftedChat()}</div>
                </div>
              )}
              {this.state.isSelected &&
                this.state.isChatOngoing &&
                !this.state.isCallOngoing && (
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
        }
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "auto",
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
