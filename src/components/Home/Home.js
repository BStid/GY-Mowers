import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
import Carousel from '@brainhubeu/react-carousel';
import {connect} from 'react-redux'
import '@brainhubeu/react-carousel/lib/style.css';
import Footer from '../Footer/Footer'

class Home extends Component{

  render(){
    console.log(this.props)
    let redirect = ''
    if(this.props.user && this.props.user.authid){
      redirect = `${process.env.REACT_APP_PATH}/#/service`
    }else{
      redirect = `${process.env.REACT_APP_LOGIN_PATH}`
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
         <Link to='/filteredmowers/Spartan'>  <img alt='banner2' className='slide' src='https://cdnmedia.endeavorsuite.com/images/organizations/a343237e-4586-481a-ab16-012fb60b8271/offers/spartan_mowers%20offer%20banner.jpg?v=1519091287758' /></Link>
         <Link to='/filteredmowers/BigDog'> <img alt='banner3' className='slide' src='https://www.ewipower.com/sites/all/themes/theme321/images/BigDog_0717.jpg' /></Link>
        </Carousel>
        </div>
        <iframe className='map' title ='map' src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJBxjFLd7eTYYRxlCnKYHm_xc&key=AIzaSyC_swPRTg8ml90Dbg2Lww89KGsNPQfKUVc"></iframe>
        <Footer user={this.props.user}/>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Home);