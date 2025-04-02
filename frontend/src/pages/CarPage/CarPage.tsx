import GarageHeader from '../../components/GarageHeader/GarageHeader.tsx';
import LoggedInName from '../../components/LoggedInName/LoggedInName.tsx';
import CarForm from '../../components/CarForm/CarForm.tsx';
import CarComp from '../../components/CarComp/CarComp.tsx';
import { useState, useEffect } from 'react';

const CarPage = () =>
{
    const [message, setMessage] = useState('');
    const [carList, setCarList] = useState<any[]>([]);
    var _userData = localStorage.getItem('user_data');
    var userData;
    if(_userData)
    {
        userData = JSON.parse(_userData);
    }
    else
    {
        console.log("Missing user data!");
        //FOR TESTING ONLY BELOW VVVVVVVVVVVVV
        //userData = { success: true, userId: "1234", firstName: "Rick", lastName: "L"};
    }
    var userId = userData.userId;
    async function getCars() : Promise<void>
    {
        try
        {
            const response = await fetch(`http://159.203.135.123:5000/api/cars/${userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                setMessage('Server error. Please try again.');
            }

            const res = await response.json();

            if (res.success) {
                //setMessage('Cars fetched');
                setCarList(res.cars);
                localStorage.setItem('car_list', JSON.stringify(res.cars));
            } else {
                setMessage("Error fetching cars");
            }
        }
        catch (error)
        {
            setMessage("Request Failed");
            console.error("Error:", error);
        }
    }

    //Use this to test without API
    /* 
    function loadTestCars() {
        //setMessage('Test cars loaded');
        const testCars = [
            { _id: "1", color: "Red", make: "Toyota", model: "Camry", year: "2022", startingMileage: "5000", rateOfChange: "20" },
            { _id: "2", color: "Blue", make: "Honda", model: "Civic", year: "2021", startingMileage: "10000", rateOfChange: "50" },
            { _id: "3", color: "Black", make: "Ford", model: "Mustang", year: "2020", startingMileage: "15000", rateOfChange: "60" }
        ];
        setCarList(testCars);
    }
    */

    useEffect(() =>{
        //CHANGE TO USE ACTUAL API VVVVVVV
        getCars();
        //TESTING VVVVVVVVVVVVVVV
        //loadTestCars();   
    }, []);

    return(
        <div>
            <GarageHeader />
            {message && <div className="alert alert-danger">{message}</div>}
            <LoggedInName />
            <CarForm />
            <div className="container mt-3">
                <h3>Your Cars</h3>
                {carList.length === 0 ? (
                    <p>No cars found.</p>
                ) : (
                    <div className="row">
                        {carList.map((car, index) => (
                            <CarComp
                                enterCarID={car._id}
                                key={index}
                                carColor={car.color}
                                carMake={car.make}
                                carModel={car.model}
                                carYear={car.year}
                                carMileage={car.totalMileage}
                                rateOfChange={car.rateOfChange}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarPage;