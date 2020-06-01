'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import './search.less'
import  logo from './images/sf.png'

class Search extends React.Component {
  render() {
    return <div className ='red'> 
      Search Text writing ok are you ok
      <img src = {logo}/> 
    </div>
  }
}

ReactDOM.render(
  <Search/>,
  document.getElementById('root')
)