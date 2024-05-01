import React from 'react'
import img from '../../../../assets/images/avatar.png'

export default function Navbar({ loginDate }) {
  // console.log(loginDate);
  return (
    <>
  <div className='container ms-5 mt-3 mb-3 background p-2 '> 
    <div className="row">
    <div className="col-md-8">
    <div className="search">
      <input type="text" placeholder='Search' className='form-control ms-4'/>
    </div>
    </div>
    <div className="col-md-3">
      <div className="username ms-5 ps-5">
        <img src={img} alt=""  className='me-2'/>
        {loginDate?.userName} 
        <span className='ms-4'><i className="fa-solid fa-angle-down"></i></span>
        <span className='ms-4'><i className="fa-solid fa-bell"></i></span>
      </div>
    </div>
    </div>
  </div>

    </>
  )
}
