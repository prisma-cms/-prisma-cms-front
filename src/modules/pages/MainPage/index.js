

import React, { Component } from 'react';


import Page from '../layout';


export class MainPage extends Page {

	setPageMeta(meta = {}) {

		return super.setPageMeta({
			title: "MainPage",
		});

	}

}

export default MainPage;
