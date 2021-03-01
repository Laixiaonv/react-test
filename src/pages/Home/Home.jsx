import React, { Component } from 'react';
import PromiseFunc from '../../common/func/PromiseFunc'
import './Home.scss';

class Home extends Component {
  render() {
    // function throttle(fn) {
    //   let canRun = true;
    //   return function (){
    //     if (!canRun) return;
    //     setTimeout(() => {
    //       fn.apply(this, arguments);
    //       canRun = true
    //     }, 500)
    //   }
    // }


    let p = new PromiseFunc((resolve, reject) => {
      console.log('执行了');
      setTimeout(() => {
        resolve('resolve')
      }, 100);
    });

    // p.then(res => {
    //   console.log('执行了第二次', res)
    //   return 'resolve123'
    // })

    p.then(res => {
      console.log('执行了第二次', res)
      return 'resolve123'
    }).then(res => {
      console.log('执行了第三次', res)
      return 'resolve12345'
    }).finally((res) => {
      console.log('finally', res)
    })


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
