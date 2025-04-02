import 'bootstrap/dist/css/bootstrap.min.css';
import HomeHeader from '../components/HomeHeader/HomeHeader.tsx';
import PictureFrame from '../components/PictureFrame/PictureFrame.tsx';
import fabian from '../components/Images/fabian.jpg';
import james from '../components/Images/james.png';
import shaun from '../components/Images/shaun.jpg';
import diego from '../components/Images/diego.jpg';
import jayden from '../components/Images/jayden.png';
import freddy from '../components/Images/freddy.jpg';

const TeamPage = () => {
    return (
        <div>
        <HomeHeader/>
            <div className="container">
                            <div className="row justify-content-center mt-4">
                    <div className="col-md-4 col-sm-6 d-flex justify-content-center mb-4">
                        <PictureFrame imageSrc={diego} text="Diego: API" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex justify-content-center mb-4">
                        <PictureFrame imageSrc={fabian} text="Fabian: Frontend" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex justify-content-center mb-4">
                        <PictureFrame imageSrc={freddy} text="Freddy: Frontend" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex justify-content-center mb-4">
                        <PictureFrame imageSrc={james} text="James: Project Manager" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex justify-content-center mb-4">
                        <PictureFrame imageSrc={shaun} text="Shaun: Database" />
                    </div>
                    <div className="col-md-4 col-sm-6 d-flex justify-content-center mb-4">
                        <PictureFrame imageSrc={jayden} text="Jayden: Frontend" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
