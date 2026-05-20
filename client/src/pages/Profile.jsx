import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {

  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const { currentUser, loading } = useSelector((state) => state.user);

  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();

  console.log(formData);
  // console.log(userListings);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);

    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const { fetchJson } = await import("../utils/fetchJson.js");
      const data = await fetchJson(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const { fetchJson } = await import("../utils/fetchJson.js");
      const data = await fetchJson(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const { fetchJson } = await import("../utils/fetchJson.js");
      const data = await fetchJson(`/api/auth/signout`, {
        method: "GET",
        credentials: "include",
      });
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const { fetchJson } = await import("../utils/fetchJson.js");
      const data = await fetchJson(`/api/user/listings/${currentUser._id}`, {
        credentials: "include",
      });

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const { fetchJson } = await import("../utils/fetchJson.js");
      const data = await fetchJson(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      if (data && data.success === false) {
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="p-3 max-w-2xl mx-auto">
      <div>
        <h1 className="my-7 text-3xl md:text-4xl font-bold text-slate-800 mb-6 text-center">
          Profile Settings
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-36 w-36 object-cover cursor-pointer self-center mt-2"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700 text-center">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700 text-center">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700 text-center">Image successfully uploaded!</span>
            ) : (
              ""
            )}
          </p>

          <input
            type="text"
            placeholder="username"
            id="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="password"
            onChange={handleChange}
            id="password"
            className="border p-3 rounded-lg"
          />

          <button
            disabled={loading}
            className="bg-blue-400 text-slate-800 p-3 rounded-lg uppercase text-center hover:opacity-95"
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <Link
            className="bg-orange-400 text-slate-800 p-3 rounded-lg uppercase text-center hover:opacity-95"
            to={"/create-listing"}
          >
            Create Listing
          </Link>
        </form>

        {false && <p className="text-red-700 mt-5 text-center"></p>}
        <p className="text-green-700 mt-5 text-center">
          {updateSuccess ? "Profile updated successfully!" : ""}
        </p>

        <h1 className="my-7 text-3xl md:text-4xl font-bold text-slate-800 mb-6 text-center mt-20">
          Account Settings
        </h1>
        <div className="flex gap-2 mt-5 h-10">
          <button
            onClick={handleDeleteUser}
            className="text-white text-center bg-red-500 rounded cursor-pointer w-full"
          >
            Delete account
          </button>
          <button
            onClick={handleSignOut}
            className="text-white text-center bg-blue-500 rounded cursor-pointer w-full"
          >
            Sign out
          </button>
        </div>

        

        <button onClick={handleShowListings} className="mt-10 text-green-700 w-full text-center">
          <h1 className="text-2xl md:text-3xl bg-green-600 border-2 rounded-lg text-white mb-4 text-center mt-10 h-auto p-2">
            Show My Listings
          </h1>
        </button>
        <p className="text-red-700 text-center">
          {showListingsError ? "Error showing listings" : "You do not have any listings yet !"}
        </p>

        {userListings && userListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 text-center">
              Your Listings
            </h1>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-3 flex justify-between items-center gap-4"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-36 w-36 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 uppercase font-semibold hover:underline truncate flex-1"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className="flex flex-col item-center">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 font-bold uppercase"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-700 font-bold uppercase">Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        )}
      </div>
    </main>
  );
};

export default Profile;

