import React, { Component } from "react";
import { GiftedChat } from "react-web-gifted-chat";
import axios from "axios";
import UserChatBox from "./UserChatBox";
import ContactBox from "./ContactBox";
import HomeChatBox from "./HomeChatBox";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.state = {
      messages: [
        {
          id: "81d9eeaf-918e-4184-9d29-cb2b88ada876",
          text: "Hello Medium!",
          user: {
            avatar:
              "https://lh4.googleusercontent.com/-5_Q2XW37ylw/AAAAAAAAAAI/AAAAAAAAC1c/tFrvjFVXwyg/photo.jpg",
            id: "er3JJoRkKwVfmRepUYMr46367P22",
            name: "Jan Romaniak"
          }
        }
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
      selectedAvatar: "",
      selectedName: "",
      count: 0
    };
  }
  handleChange(user, e) {
    if (user) {
      user.isSelected = true;
      this.setState({
        selectedUser: user
      });
      this.setState({
        selectedAvatar: user.avatar
      });
      this.setState({
        selectedName: user.name
      });
      this.setState({
        isSelected: true
      });
      return user;
    }
  }

  handleCall(e) {
    /* this.setState({
                selectedUser: { user }
              }); */
    alert("Start video conference");
  }
  handleKey() {
    this.setState({
      count: this.count + 1
    });
    return this.state.count;
  }

  onSend(messages = []) {
    /*this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, messages)
            }));*/
    this.setState({
      isSelected: false,
      isAuthenticated: true,
      selectedUser: {},
      messages: [
        {
          id: "81d9eeaf-918e-4184-9d29-cb2b88ada876",
          text: "Hello Medium!",
          user: {
            avatar:
              "https://lh4.googleusercontent.com/-5_Q2XW37ylw/AAAAAAAAAAI/AAAAAAAAC1c/tFrvjFVXwyg/photo.jpg",
            id: "er3JJoRkKwVfmRepUYMr46367P22",
            name: "Jan Romaniak"
          }
        }
      ]
    });
  }

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
    return <HomeChatBox avatar={this.state.selectedAvatar}></HomeChatBox>;
  }

  renderGiftedChat() {
    //return <GiftedChat user={this.state.user} messages={this.state.messages} />;
    return (
      <GiftedChat
        user={this.state.messages[0].user.name}
        messages={this.state.messages.slice().reverse()}
        onSend={messages => this.onSend(messages)}
      />
    );
  }
  componentDidMount() {
    //Query the API to retrieve the list of contact
    /*axios.get("http://localhost:7878/api/todos").then(res => {
              const todos = res.data;
              this.setState({ todos });
            });*/
    /* this.setState({
              isAuthenticated: true,
              user: {},
              messages: [
                {
                  id: "81d9eeaf-918e-4184-9d29-cb2b88ada876",
                  text: "Hello Medium!",
                  user: {
                    avatar:
                      "https://lh4.googleusercontent.com/-5_Q2XW37ylw/AAAAAAAAAAI/AAAAAAAAC1c/tFrvjFVXwyg/photo.jpg",
                    id: "er3JJoRkKwVfmRepUYMr46367P22",
                    name: "Jan Romaniak"
                  }
                }
              ]
            }); */
  }

  render() {
    return (
      <div className="chat" style={styles.container}>
        <div style={styles.channelList}> {this.renderContacts()} </div>
        {!this.state.isSelected && (
          <div style={styles.chat}>
            <div style={styles.chat}> {this.renderHomeChatBox()} </div>
          </div>
        )}
        {this.state.isSelected && (
          <div style={styles.chat}>
            <div style={styles.chat}> {this.renderUserChatBox()} </div>
            <div style={styles.chat}> {this.renderGiftedChat()} </div>
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
  channelList: {
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
