import React from "react";

const Cards = (props) => {
	return (
		<div style={{ width: 270, paddingRight: 30, float: "left" }}>
			<div className="card">
				<div className="card-image" style={{ width: 240 }}>
					<img
						alt={props.payload.fields.header.stringValue}
						src={props.payload.fields.image.stringValue}
						style={{ height: 160 }}
					/>
				</div>
				<div className="card-content" style={{ height: 235 }}>
					<h4
						className="card-title"
						style={{
							fontSize: 18,
							color: "black",
							margin: 0,
							marginBottom: 20,
							fontWeight: "bold",
						}}
					>
						{props.payload.fields.header.stringValue}
					</h4>
					<p>{props.payload.fields.description.stringValue}</p>
					<p>
						<a href="\">{props.payload.fields.price.stringValue}</a>
					</p>
				</div>
				<div className="card-action">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href={props.payload.fields.link.stringValue}
					>
						Goto Website
					</a>
				</div>
			</div>
		</div>
	);
};

export default Cards;
