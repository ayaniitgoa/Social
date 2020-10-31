import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Logout from '../../components/Auth/Logout/Logout';
import ProfilePicUpdate from '../../components/ProfilePicUpdate/ProfilePicUpdate';
import UpdateTag from '../../components/UpdateTag/UpdateTag';
import { getTags } from '../../reduxSetup/actions/tagsActions';

function Profile(props) {
  useEffect(() => {
    getTags();
    // eslint-disable-next-line
  }, []);

  const getTags = async () => {
    await props.getTags();
  };

  return (
    <div>
      {props.auth.isAuthenticated && (
        <div className=''>
          <img
            src={props.auth.user.profilePic}
            alt='profile'
            style={{ width: 300 }}
          />
          <ProfilePicUpdate />
          <p>{props.auth.user.name}</p>
          <p>{props.auth.user.email}</p>
          <UpdateTag />
          <Logout />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getTags })(Profile);
