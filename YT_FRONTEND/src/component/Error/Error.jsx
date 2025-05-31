import { Link } from "react-router-dom";
import "./error.css";
import ProfileHeader from "../../pages/Profile/ProfileHeader";

function ErrorPage(props) {
    return (
        <>
            {props.isTrue === true ? <p></p>: <ProfileHeader />}

            <div className="error-page">
                <div className="error-page-container">
                    <img
                        className="error-image"
                        src={props.image || "/src/assets/warning.png"}
                        alt="Error"
                    />
                    <h3 className="error-title">{props.title || "Something went wrong"}</h3>
                    <p className="error-message">{props.message || "Please try again later."}</p>
                    <Link to={`/`}>
                        <button className="custom-link-button">
                            Home
                        </button>
                    </Link>
                </div>
            </div>
        </>

    );
    
}

export default ErrorPage;
