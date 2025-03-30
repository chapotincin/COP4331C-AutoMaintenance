import { useState } from "react"

interface CarCompProps
{
    carColor: string
    carMake: string
    carModel: string
    carYear: number
    carMileage: number
    enterCarID: string
}

function CarComp({carColor, carMake, carModel, carYear, carMileage , enterCarID}:CarCompProps)
{
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        color: '',
        totalMileage: '',
        rateOfChange: ''
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    var carID = enterCarID;

    async function updateCar(e:any):Promise<void>
    {
        e.preventDefault();
        const {color, totalMileage, rateOfChange} = formData;
        try
        {
            const response = await fetch(`http://159.203.135.123:5000/api/cars/${carID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    color,
                    totalMileage,
                    rateOfChange
                }),
            });
            if (!response.ok) {
                setMessage('Server error. Please try again.');
            }

            const res = await response.json();

            if (res.success) {
                setMessage('Car Edited!');
                setShowForm(false);
            } else {
                setMessage("Error Editing Car.");
            }
        }
        catch (error)
        {
            setMessage("Request Failed");
            console.error("Error:", error);
        }
    }

    async function deleteCar(e:any):Promise<void>
    {
        e.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete this car?");
        if (!confirmDelete) 
        {
            return;
        }
        
        try
        {
            const response = await fetch(`http://159.203.135.123:5000/api/cars/${carID}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'}
            });
            if (!response.ok) {
                setMessage('Server error. Please try again.');
            }

            const res = await response.json();

            if (res.success) {
                setMessage('Car Deleted!');
                setShowForm(false);
            } else {
                setMessage("Error Deleting Car.");
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
        <div className='container'>
            {message && <div className="alert alert-danger">{message}</div>}
            <ul className='list-group list-group-horizontal'>
                <li className="list-group-item">{carYear}</li>
                <li className="list-group-item">{carMake}</li>
                <li className="list-group-item">{carModel}</li>
                <li className="list-group-item">{carColor}</li>
                <li className="list-group-item">{carMileage}</li>
                <button onClick={() => setShowForm(true)}>Edit</button>
                {showForm && (
                    <div>
                        <form onSubmit={updateCar}>
                            <label className="form-label">Enter New Color</label>
                            <div className="mb-2">
                                <input 
                                    type="text"
                                    id="color"
                                    className="form-control"
                                    placeholder="New Color"
                                    value={formData.color}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <label className="form-label">Enter New Mileage</label>
                            <div className="mb-2">
                                <input 
                                    type="text"
                                    id="totalMileage"
                                    className="form-control"
                                    placeholder="New Mileage"
                                    value={formData.totalMileage}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <label className="form-label">Enter New Average Mileage</label>
                            <div className="mb-2">
                                <input 
                                    id="rateOfChange"
                                    type="text"
                                    className="form-control"
                                    placeholder="New Average Mileage"
                                    value={formData.rateOfChange}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                        <div className="d-grid gap-2">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={closeForm}
                            >Cancel</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={deleteCar}
                            >Delete</button>
                            <button
                                type="submit"
                                className="btn-success"
                            >Submit</button>
                        </div>
                    </div>
                )}
            </ul>
        </div>
    );
}

export default CarComp;