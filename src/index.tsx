import React from "react";
import ReactDom from "react-dom";
import App from "./App"
import "./index.css";
import 'antd/dist/antd.css';
import './index.css';

function renderLoading() {
	const loadingDom = document.querySelector("#clock");
	if (loadingDom)
	loadingDom.classList.add("clockFadeOut");
	setTimeout(() => {
	loadingDom?.remove();
	}, 500);
}


ReactDom.render(
	<App></App>,
	document.querySelector("#root"),
	renderLoading
);
