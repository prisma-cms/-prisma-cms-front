

import React, { PureComponent } from 'react';


import Page from '../layout';


export class MainPage extends Page {

	setPageMeta(meta) {

		return super.setPageMeta(meta || {
			title: "Main page",
		});

	}

}

export default MainPage;
