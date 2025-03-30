import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";

function CarForm()
{
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        vin: '',
        color: '',
        startingMileage: '',
        rateOfChange: ''
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    async function addCar(e: any):Promise<void>
    {
        e.preventDefault();
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
        formData.userId = userData.userId;
        const {userId, vin, color, startingMileage, rateOfChange} = formData;
        try
        {
            const response = await fetch('http://159.203.135.123:5000/api/decode-vin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    vin,
                    color,
                    startingMileage,
                    rateOfChange
                }),
            });
            if (!response.ok) {
                setMessage('Server error. Please try again.');
            }

            const res = await response.json();

            if (res.success) {
                setMessage('Car Added!');
                setShowForm(false);
            } else {
                //Use to test values set correctly VVVV
                //setMessage(JSON.stringify(formData));
                setMessage("Error Adding Car.");
            }
        }
        catch (error)
        {
            setMessage("Request Failed");
            console.error("Error:", error);
        }
    }

    const closeForm = () =>
    {
        setShowForm(false);
        setMessage('');
    }

    return(
        <div className="text-center mt-3">
            {message && <div className="alert alert-danger">{message}</div>}
            {!showForm && (
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    Add Car
                </button>
            )}

            {showForm && (
                <div className="container mt-3 p-4 border rounded shadow">
                    <form onSubmit={addCar}>
                        <div className="mb-2">
                            <label className="form-label">VIN</label>
                            <input 
                                type="text" 
                                id="vin"
                                className="form-control" 
                                placeholder="VIN#"
                                value={formData.vin}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Color</label>
                            <input 
                                type="text" 
                                id="color"
                                className="form-control"
                                placeholder="Color"
                                value={formData.color}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Mileage</label>
                            <input 
                                type="text" 
                                id="startingMileage"
                                className="form-control"
                                placeholder="Mileage"
                                value={formData.startingMileage}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Avg Mileage Per Week</label>
                            <input 
                                type="text" 
                                id="rateOfChange"
                                className="form-control"
                                placeholder="Mileage Per Week" 
                                value={formData.rateOfChange}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-success">
                                Submit
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={closeForm}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
    </div>
    );
}

export default CarForm;