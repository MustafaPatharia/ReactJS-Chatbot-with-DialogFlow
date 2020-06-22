import React, { Component } from "react";
import axios from "axios/index";
import Messages from "./Messages";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import Cards from "./Cards";
import QuickRepliess from "./QuickReplies";
import {
	Row,
	TextInput,
	SendButton,
	TextComposer,
	ThemeProvider,
} from "@livechat/ui-kit";

const cookies = new Cookies();

class Chatbot extends Component {
	messagesEnd;
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
			allow: true,
		};

		if (cookies.get("userID") === undefined) {
			cookies.set("userID", uuid(), { path: "/" });
		}

		this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
		this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(
			this
		);
	}

	componentDidMount() {
		this.df_event_query("Welcome");
	}

	componentDidUpdate() {
		this.messagesEnd.scrollIntoView({ behaviour: "smooth" });
	}

	async df_text_query(text) {
		let says = {
			speaks: "You",
			msg: {
				text: {
					text: text,
				},
			},
		};
		this.setState({ messages: [...this.state.messages, says] });

		const res = await axios.post("/api/df_text_query", {
			text,
			userID: cookies.get("userID"),
		});

		if (res.data.fulfillmentMessages) {
			for (let msg of res.data.fulfillmentMessages) {
				says = {
					speaks: "Bot",
					msg: msg,
				};
				this.setState({ messages: [...this.state.messages, says] });
			}
		}
	}

	async df_event_query(event) {
		try {
			const res = await axios.post("/api/df_event_query", {
				event,
				userID: cookies.get("userID"),
			});
			let says;

			for (let msg of res.data.fulfillmentMessages) {
				says = {
					speaks: "Bot",
					msg: msg,
				};
				this.setState({ messages: [...this.state.messages, says] });
			}
		} catch (e) {
			let says = {
				speaks: "Bot",
				msg: {
					text: {
						text:
							"I'm having trouble contacting the server. Try again later...",
					},
				},
			};
			this.setState({ messages: [...this.state.messages, says] });
		}
	}

	//this is testing
	renderCards(cards) {
		return cards.map((card, i) => (
			<Cards key={i} payload={card.structValue} />
		));
	}

	renderOneMessaage(message, i) {
		if (message.msg && message.msg.text && message.msg.text.text) {
			return (
				<Messages
					key={i}
					speaks={message.speaks}
					text={message.msg.text.text}
				/>
			);
		} else if (
			message.msg &&
			message.msg.payload &&
			message.msg.payload.fields &&
			message.msg.payload.fields.cards
		) {
			return (
				<div key={i}>
					<div style={{ overflow: "auto", overflowY: "hdden" }}>
						<div
							style={{
								height: 300,
								width:
									message.msg.payload.fields.cards.listValue
										.values.length * 270,
							}}
						>
							{this.renderCards(
								message.msg.payload.fields.cards.listValue
									.values
							)}
						</div>
					</div>
				</div>
			);
		} else if (
			message.msg &&
			message.msg.payload &&
			message.msg.payload.fields &&
			message.msg.payload.fields.quick_replies
		) {
			return (
				<QuickRepliess
					text={
						message.msg.payload.fields.text
							? message.msg.payload.fields.text
							: null
					}
					key={i}
					replyClick={this._handleQuickReplyPayload}
					speaks={message.speaks}
					payload={
						message.msg.payload.fields.quick_replies.listValue
							.values
					}
				/>
			);
		}
	}

	renderMessages = (stateMessages) => {
		if (stateMessages) {
			return stateMessages.map((message, index) => {
				return this.renderOneMessaage(message, index);
			});
		} else {
			return null;
		}
	};

	_handleInputKeyPress = (e) => {
		if (e.key === "Enter") {
			this.df_text_query(e.target.value);
			e.target.value = "";
		}
	};

	_handleQuickReplyPayload(payload, text) {
		// event.preventDefault();
		// event.stopPropagation();

		switch (payload) {
			case "any_event":
				this.df_evet_query("event");
				break;
			default:
				this.df_text_query(text);
		}
	}

	render() {
		return (
			<ThemeProvider>
				<div
					style={{
						height: window.innerHeight - 130,
						width: 600,
						margin: "auto",
					}}
				>
					<h3
						style={{
							textAlign: "center",
							margin: 0,
							paddingTop: 12,
							marginBottom: 8,
							paddingBottom: 15,
							backgroundColor: "#427FE1",
							color: "white",
							fontSize: 35,
							fontWeight: "bold",
						}}
					>
						CoVID-19 F.A.Q Chatbot
					</h3>
					<div
						id="chatbot"
						style={{
							height: "100%",
							width: "100%",
							overflow: "auto",
						}}
					>
						{this.renderMessages(this.state.messages)}
						<div
							ref={(el) => {
								this.messagesEnd = el;
							}}
							style={{ float: "left", clear: "both" }}
						></div>
					</div>
					<TextComposer
						defaultValue=""
						onKeyDown={this._handleInputKeyPress}
						style={{
							borderWidth: 2,
							borderStyle: "solid",
							paddingLeft: 10,
							borderColor: "#427FE1",
							borderRadius: 10,
						}}
					>
						<Row align="center">
							<TextInput placeholder="Type here..." fill />
							<SendButton
								onClick={() => this._handleInputKeyPress}
								fit
							/>
						</Row>
					</TextComposer>
				</div>
			</ThemeProvider>
		);
	}
}

export default Chatbot;
