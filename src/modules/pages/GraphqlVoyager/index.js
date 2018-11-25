import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';


class GraphqlVoyagerPage extends Component {

  static propTypes = {

  };

  introspectionProvider(query) {
    return fetch(window.location.origin + '/api/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query }),
    }).then(response => response.json());
  }

  render() {

    if(typeof window === "undefined"){
      return null;
    }

    const Voyager = require('@prisma-cms/graphql-voyager').Voyager;

    return (
      <Fragment>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/graphql-voyager/dist/voyager.css"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              #root{
                height: 100vh;
                display: flex;
                flex-direction: column;
              }

              #Renderer--body {
                overflow: hidden;
                flex: 1 0;
              }
            `,
          }}
        />

        <Voyager introspection={this.introspectionProvider} />
      </Fragment>
    );
  }
}


export default GraphqlVoyagerPage;