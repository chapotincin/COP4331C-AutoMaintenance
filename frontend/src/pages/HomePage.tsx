import HomeHeader from '../components/HomeHeader.tsx';
import HomeFooter from '../components/HomeFooter.tsx';

const HomePage = () =>
{
    return(
        <div>
            <HomeHeader />

            <h2>Your Car's Health Simplified</h2>
            <p id="companyDescription">CarLogix takes the guesswork out of car maintenance. Simply enter your VIN and mileage, 
                and we'll track your vehicle's needs, sending timely reminders so you know your car’s needs.</p>
            <a href="/register">Get Started for Free</a>

            <h2>Manage Your Vehicles Maintenance in a Single System</h2>
            <p>What does CarLogix offer?</p>
            <p>THIS IS A TEST!!!!!</p>
            <div id="offers">VIN Lookup  Mileage Tracking  Maintenance Schedules  Personalized Reminders</div>

            <HomeFooter />
        </div>
    );
};

export default HomePage;