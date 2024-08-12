import "/src/styles/profilePicture.css"

function ProfilePicture({image}) {
    if (image) {
        return <img className="profilePicture" src={image}></img>
    }
    else {
        return <img className="profilePicture" src={null}></img>
    }
}

export default ProfilePicture