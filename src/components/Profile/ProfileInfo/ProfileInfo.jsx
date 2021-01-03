import React from 'react';

import userPhoto from '../../../assets/img/user.jpg';
import ProfileStatus from './ProfileStatus';
const ProfileInfo = (props) => {
  return (
    <div>
      <div>
        <img src="https://kittentoob.com/wp-content/uploads/2014/10/orange-cat.jpg" />
      </div>
      {props.profile ? (
        <div>
          <img
            src={
              props.profile.photos.large
                ? props.profile.photos.large
                : userPhoto
            }
            alt=""
          />
        </div>
      ) : (
        <ProfileStatus status={'testStatus'} />
      )}
    </div>
  );
};
export default ProfileInfo;
