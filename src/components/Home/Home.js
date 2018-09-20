import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import Carousel from '@brainhubeu/react-carousel';
import {connect} from 'react-redux'
import '@brainhubeu/react-carousel/lib/style.css';

class Home extends Component{

  render(){
    let redirect = ''
    if(this.props.user && this.props.user.authid){
      redirect = 'http://localhost:3000/#/service'
    }else{
      redirect = 'http://localhost:3001/login'
    }
    return(
      <div className='home_page'>
        <Link to='/blades'><button className='blades_box'>Mower Blades</button></Link>
        <Link to='/mowers'><button className='mowers_box'>Zero Turn Mowers</button></Link>
        <a href={redirect} ><button className='service_box'>Schedule Service</button></a>
        <div className='carousel'>
        <Carousel
          animationSpeed={2000}
          autoPlay={5000}
          stopAutoPlayOnHover
          centered
          infinite>
         <Link to='/filteredmowers/Hustler'> <img alt='banner1' className='slide' src='https://media.50below.com/corporate/webdesign/merchslides/Hustler/8b257fb5-52db-4b1b-ac19-312b4ad49642.jpg' /></Link>
         <Link to='/filteredmowers/Spartan'>  <img alt='banner2' className='slide' src='https://static.visionamp.org/rubix/20161019/orig_4e906dc57f3965bd31e57df93b5b81002b8d6c93.jpg' /></Link>
         <Link to='/filteredmowers/BigDog'> <img alt='banner3' className='slide' src='https://www.ewipower.com/sites/all/themes/theme321/images/BigDog_0717.jpg' /></Link>
        </Carousel>
        </div>
        <iframe className='map' title ='map' src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJBxjFLd7eTYYRxlCnKYHm_xc&key=AIzaSyC_swPRTg8ml90Dbg2Lww89KGsNPQfKUVc"></iframe>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Home);