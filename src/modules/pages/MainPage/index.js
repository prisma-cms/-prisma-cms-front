

import React, { Component } from 'react';
 

import Page from '../layout'; 
 
export default class MainPage extends Page{
 
 

  setPageMeta(meta = {}) {
 
		return super.setPageMeta({
			title: "MainPage",
		});

  }
	 
}

