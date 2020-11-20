// Komponent Głownego ekranu - Dashboard //
import React from 'react';
import './dashboard.css';
import { Title } from './title';
import { Subtitle } from './subtitle';
import shop from './images/money.svg';
import Comments from './comments';
import Charts from './charts';
import gsap from 'gsap';
import RateUs from './Rating/Rating'

class Dashboard extends React.Component{

    componentDidMount(){
        gsap.from(".shop_img",{opacity: 0, duration: 1 ,delay: .2});

        fetch('https://corona404-2499f.firebaseio.com/products.json')
            .then((res) => res.json())
            .then((data) => console.log(data))
    }

    render(){;
        return(
            <section className="main_container">
            <Title></Title>
            <img src={shop} className="shop_img" alt="shopping app"></img>
                <Charts></Charts>
                <Subtitle></Subtitle>
                <Comments></Comments>
                {/* <RateUs /> */}
            </section>
        )
    }
}

export default Dashboard;