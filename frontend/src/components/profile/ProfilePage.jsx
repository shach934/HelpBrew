import React, { useState } from "react";
import Api from "../../api/Api";
import "../../css/Components/profilePage/profile.css";
import Auth from "../../services/Auth";
import ProfileImageUploader from "./ProfileImageUploader";

export default function ProfilePage({ user, setUser }) {


    const onLogout = () => Auth.logout();
    const [imgUrl, setImgUrl] = useState("");

    const updateUser = () => {
        const img = { ...user, imageUrl: imgUrl }
        Api.put("/user/me", img).then((res) => setUser(res.data));
    };

    {/* 
    const [user, setUser] = useState({});
    useEffect(() => {
        Api.get("/user/me").then((response) => {
             console.log(response.data);
            setUser(response.data);
         });
    }, []);
     console.log(user);
    */}

    const handleImageUpload = () => {

    }

    return (

        <div className="profilePage">

            <div className={"imgOuterContainer"}>
                <div className="img-container" onClick={handleImageUpload}  >
                    <img className="profileImg" src={user.imageUrl} />
                </div>
            </div>

            <div>
                <h1>{user.name}</h1>
                <h2>{user.email}</h2>
            </div>


            <div className="profileTools">
                <div><i class="fas fa-bell"></i></div>
                <div><i class="fas fa-inbox"></i></div>
                <div><i class="fas fa-calendar-alt"></i></div>
            </div>

            <div>
                <ProfileImageUploader setImgUrl={setImgUrl} />
                <button onClick={updateUser}>Share</button>
            </div>

            <button onClick={onLogout}>Logout</button>

        </div>
    )
}