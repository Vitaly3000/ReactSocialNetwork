import React from 'react';

import userPhoto from '../../../assets/img/user.jpg';
const ProfileInfo = (props) => {
  return (
    <div>
      <div>
        <img src="https://kittentoob.com/wp-content/uploads/2014/10/orange-cat.jpg" />
      </div>
      <div>ava+desk</div>
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
        <div>мой профиль</div>
      )}
    </div>
  );
};
export default ProfileInfo;
