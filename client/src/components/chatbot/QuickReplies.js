import React, { Component } from "react";
import { QuickReplies } from "@livechat/ui-kit";

class QuickRepliess extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clickReply: "",
		};
		this._handleClick = this._handleClick.bind(this);
	}

	_handleClick(payload, text) {
		this.props.replyClick(payload, text);
	}

	// renderQuickReply(reply, i) {
	// 	return <QuickReply key={i} click={this._handleClick} reply={reply} />;
	// }

	renderQuickReplies(payload) {
		if (payload) {
			var rep_lst = [];
			for (let str of payload) {
				rep_lst = rep_lst.concat(
					str.structValue.fields.text.stringValue
				);
			}
			return (
				<div style={{ maxWidth: 400 }}>
					<QuickReplies
						replies={rep_lst}
						onSelect={(t) => this._handleClick(t, t)}
					/>
				</div>
			);
			// quickReplies.map((reply, i) => {
			// 		return this.renderQuickReply(reply, i);
			// 	});
		} else {
			return null;
		}
	}

	render() {
		return (
			<div className="col s12 m8 offset-m2 l6 offset-13">
				<div id="quick-replies" className="col s10">
					{this.props.text && <p>{this.props.text.stringValue}</p>}
					{this.renderQuickReplies(this.props.payload)}
				</div>
			</div>
		);
	}
}

export default QuickRepliess;
