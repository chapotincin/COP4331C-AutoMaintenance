import { useState } from "react";

interface CarCompProps {
    carColor: string;
    carMake: string;
    carModel: string;
    carYear: number;
    carMileage: number;
    rateOfChange: number;
    enterCarID: string;
}

function CarComp({ carColor, carMake, carModel, carYear, carMileage, enterCarID, rateOfChange }: CarCompProps) {
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

    const carID = enterCarID;

    async function updateCar(e: any): Promise<void> {
        e.preventDefault();
        const { color, totalMileage, rateOfChange } = formData;
        try {
            const response = await fetch(`http://159.203.135.123:5000/api/cars/${carID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ color, totalMileage, rateOfChange }),
            });

            if (!response.ok) {
                setMessage('Server error. Please try again.');
                return;
            }

            const res = await response.json();
            setMessage(res.success ? 'Car Edited!' : 'Error Editing Car.');
            if (res.success) {
                setShowForm(false);
                window.location.reload();
            }
        } catch (error) {
            setMessage("Request Failed");
            console.error("Error:", error);
        }
    }

    async function deleteCar(e: any): Promise<void> {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this car?")) return;

        try {
            const response = await fetch(`http://159.203.135.123:5000/api/cars/${carID}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                setMessage('Server error. Please try again.');
                return;
            }

            const res = await response.json();
            setMessage(res.success ? 'Car Deleted!' : 'Error Deleting Car.');
            if (res.success) window.location.reload();
        } catch (error) {
            setMessage("Request Failed");
            console.error("Error:", error);
        }
    }

    // Use the updated color if entered, otherwise use the original carColor
    const displayedColor = formData.color || carColor;

    return (
        <div className="container">
            {message && <div className="alert alert-danger">{message}</div>}

            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <strong>Year:</strong> {carYear}
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <strong>Make:</strong> {carMake}
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <strong>Model:</strong> {carModel}
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <strong>Color:</strong> 
                    <span style={{ color: displayedColor, fontWeight: "bold" }}>
                        {displayedColor}
                    </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <strong>Mileage:</strong> {carMileage} miles
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <strong>Rate of Change:</strong> {rateOfChange} miles/week
                </li>
            </ul>

            <div className="mt-3">
                <button className="btn btn-primary me-2" onClick={() => setShowForm(true)}>Edit</button>
                <button className="btn btn-danger" onClick={deleteCar}>Delete</button>
            </div>

            {showForm && (
                <div className="card mt-3 p-3">
                    <form onSubmit={updateCar}>
                        <label className="form-label">Enter New Color</label>
                        <input 
                            type="text"
                            id="color"
                            className="form-control mb-2"
                            placeholder="New Color"
                            value={formData.color}
                            onChange={handleInputChange}
                        />

                        <label className="form-label">Enter New Mileage</label>
                        <input 
                            type="text"
                            id="totalMileage"
                            className="form-control mb-2"
                            placeholder="New Mileage"
                            value={formData.totalMileage}
                            onChange={handleInputChange}
                        />

                        <label className="form-label">Enter New Average Mileage</label>
                        <input 
                            type="text"
                            id="rateOfChange"
                            className="form-control mb-2"
                            placeholder="New Average Mileage"
                            value={formData.rateOfChange}
                            onChange={handleInputChange}
                        />

                        <div className="d-grid gap-2">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default CarComp;
