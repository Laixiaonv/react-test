import React, { Component } from 'react';
import './Home.scss';

class Home extends Component {
  render() {
    function throttle(fn) {
      let canRun = true;
      return function (){
        if (!canRun) return;
        setTimeout(() => {
          fn.apply(this, arguments);
          canRun = true
        }, 500)
      }
    }
    
    console.log(123)
    return (
      <div className='P_homeContainer'>
        <div className='wrap1'>
          <div className='left'>这里是左边</div>
          {/* <div className='right'>Page Home qq123Page Home qq123Page Home qq123Page Home qq123Page Home qq123</div> */}
        </div>
      </div>
    )
  }
}

export default Home;
