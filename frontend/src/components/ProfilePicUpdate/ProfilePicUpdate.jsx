import React, { useState } from 'react';
import './ProfilePicUpdate.css';
import axios from 'axios';
import { connect } from 'react-redux';

function ProfilePicUpdate(props) {
  const [previewSrc, setPreviewSrc] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
  };

  const profilePicSubmit = (e) => {
    e.preventDefault();

    if (!previewSrc) return;
    uploadImage(previewSrc);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const token = props.auth.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (token) {
        config.headers['x-auth-token'] = token;
      }

      const data = {
        img: base64EncodedImage,
      };

      axios
        .post(
          `/api/user/update/profilePic/${props.auth.user._id}`,
          data,
          config
        )
        .then((res) => {
          window.location.reload(false);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={profilePicSubmit}>
        <label htmlFor='profilePic'>Upload Image</label>
        <input
          type='file'
          name='profilePic'
          accept='image/*'
          id=''
          onChange={(e) => {
            const profilePic = e.target.files[0];

            if (e.target.files[0].size) {
              previewFile(profilePic);
              setErrorMsg();
            } else {
              setErrorMsg('Invalid file!');
            }
          }}
        />
        <br />
        {errorMsg && errorMsg}
        <button type='submit'>Submit Profile Pic</button>
      </form>
      {previewSrc && (
        <img src={previewSrc} alt='chosen' style={{ height: '100px' }} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProfilePicUpdate);
