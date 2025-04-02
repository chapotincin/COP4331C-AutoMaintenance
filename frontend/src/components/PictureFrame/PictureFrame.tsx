import 'bootstrap/dist/css/bootstrap.min.css';

interface PictureFrameProps
{
    imageSrc: string
    text: string
}

function PictureFrame({ imageSrc, text }: PictureFrameProps) {
    return (
        <div className="d-flex flex-column align-items-center">
            <img src={imageSrc} alt="Profile" className="rounded-circle img-fluid" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            <p className="mt-2 text-center">{text}</p>
        </div>
    );
}

export default PictureFrame;
