import './HomePage.css'; // Ensure CSS file is linked
import HomeHeader from '../../components/HomeHeader/HomeHeader.tsx';
import HomeOffer from '../../components/HomeOffer/HomeOffer.tsx';
import OfferImage1 from '../../components/Images/OfferVin.png';
import Search from '../../components/Images/Search.png';
import Odometer from '../../components/Images/Odometer.png';
import CarIcon from '../../components/Images/CarIcon.png';
import MaintainPic from '../../components/Images/Maintenance.png';
import MaintainIcon from '../../components/Images/MaintainIcon.png';
import ReminderPic from '../../components/Images/Reminder.png';
import Calender from '../../components/Images/Calender.png';
import Toyota from '../../components/Images/Toyota.png';

const HomePage = () => {
    return (
        <div id="page">
            <HomeHeader />
            <div id="top-half">
                <img src={Toyota} alt="Toyota car" className="toyota-image" />
                <div className="text-content">
                    <h2>Your Car's Health Simplified</h2>
                    <p id="company-description">
                        CarLogix takes the guesswork out of car maintenance. Simply enter your VIN and mileage,
                        and we'll track your vehicle's needs, sending timely reminders so you know your car’s needs.
                    </p>
                    <a href="/register" className="register-link">Get Started for Free</a>
                </div>
            </div>
            <div id="middle-block">
                <p id="middle-text">Manage Your Vehicle's Maintenance in a Single System</p>
                <p id="middle-smaller">What does CarLogix offer?</p>
            </div>
            <div id="offers">
                <HomeOffer 
                    imageSrc={OfferImage1} text="VIN Lookup" iconSrc={Search} 
                />
                <HomeOffer 
                    imageSrc={Odometer} text="Mileage Tracking" iconSrc={CarIcon} 
                />
                <HomeOffer 
                    imageSrc={MaintainPic} text="Maintenance Schedules" iconSrc={MaintainIcon} 
                />
                <HomeOffer 
                    imageSrc={ReminderPic} text="Personalized Reminders" iconSrc={Calender} 
                />
            </div>
        </div>
    );
};

export default HomePage;
