import React from "react";
import {
	ThemeProvider,
	Message,
	MessageGroup,
	MessageText,
	Row,
	Avatar,
} from "@livechat/ui-kit";

const Messages = (props) => {
	return (
		<div className="col s12 m8 offset-m2 offset-l3">
			<ThemeProvider>
				<MessageGroup>
					{props.speaks === "Bot" && (
						<Row>
							<Avatar imgUrl="https://img.icons8.com/plasticine/2x/bot.png" />
							<Message>
								<MessageText
									style={{
										background: "#EFEFEF",
										color: "black",
										borderTopRightRadius: 10,
										borderBottomLeftRadius: 10,
										borderBottomRightRadius: 10,
									}}
								>
									{props.text}
								</MessageText>
							</Message>
						</Row>
					)}
					{props.speaks === "You" && (
						<Row reverse>
							<Avatar imgUrl="https://icon2.cleanpng.com/20180430/rcq/kisspng-surgical-mask-respirator-medicine-influenza-surger-cartoon-mascara-5ae698a74b9be3.5138973115250617993097.jpg" />
							<Message isOwn>
								<MessageText
									style={{
										background: "#427FE1",
										color: "white",
										borderTopLeftRadius: 10,
										borderBottomLeftRadius: 10,
										borderBottomRightRadius: 10,
									}}
								>
									{props.text}
								</MessageText>
							</Message>
						</Row>
					)}
				</MessageGroup>
			</ThemeProvider>
		</div>
	);
};

export default Messages;
