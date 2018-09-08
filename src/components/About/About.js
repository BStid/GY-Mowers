import React, {Component} from 'react'
import './About.css'

class About extends Component{

  render(){
    return(
      <div className='about_page'>
        <div className='header_container'>
          <img alt='about banner' className='banner_pic' src='http://newportavelandscaping.com/wp-content/uploads/2015/12/newport-ave-landscaping-about-us-1440x528.jpg'/>
          <h1 className='about_us'>About Us</h1>
        </div>
        <div className='left_about'>
          <h2>Why GY:</h2>
          <p className='about_text'>Starting as a small business in Fort Worth TX, we have big dreams. Our passion for residential and commercial lawn care, means that we provide our customers nothing but the highest quality equipment, that is guaranteed to meet their needs and keep both their own and their customers lawns beautiful!</p>
          <p className='about_text'>With a professional and motivated team, we strive to be the experts that bring a smile to your face. That’s why we’re always looking for ways to improve our service.</p>
          <h2 className='gy_diff'>The GY Difference</h2>
          <ul>
            <li>100% Transparency in both sales and service</li>
            <li>Free lifetime pickup and delivery on all machines</li>
            <li>6 Month and 1 Year Warranty and maintenance checkup</li>
            <li>Free set of blades with each mower purchased</li>
            <li>Owner Garrett Yaworski's cell number: 682-999-9999</li>
          </ul>
        </div>
        <div className='right_about'>
          <div className='contact_info'>
            <h3>Contact</h3>
            <p>GY Mowers</p>
            <p>636 Bent Oak Dr, Fort Worth, TX 76131</p>
            <p>Sales or Service:</p>
            <p>682-888-8888</p>
          </div>
          <div className='hours_container'>
            <div className='days'>
              <h3>Hours</h3>
              <p>Monday</p>
              <p>Tuesday</p>
              <p>Wednesday</p>
              <p>Thursday</p>
              <p>Friday</p>
              <p>Saturday</p>
              <p>Sunday</p>
            </div>
            <div className='times'>
              <h3 className='filler'> Some txt</h3>
              <p>9:00AM - 8:00PM</p>
              <p>9:00AM - 8:00PM</p>
              <p>9:00AM - 8:00PM</p>
              <p>9:00AM - 8:00PM</p>
              <p>9:00AM - 8:00PM</p>
              <p>10:00AM - 9:00PM</p>
              <p>Closed</p>
            </div>
          </div>         
        </div>
        <iframe className='about_map' title ='map' src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJBxjFLd7eTYYRxlCnKYHm_xc&key=AIzaSyC_swPRTg8ml90Dbg2Lww89KGsNPQfKUVc"></iframe>
      </div>
    )
  }
}

export default About;