import React from 'react';
import style from './ProfileInfo.module.css';
import userPhoto from '../../../assets/img/user.jpg';
import ProfileStatus from './ProfileStatus';
const ProfileInfo = (props) => {
  return (
    <div>
      {props.profile && (
        <div>
          <img
            className={style.profileImg}
            src={props.profile.photos.large || userPhoto}
            alt=""
          />
          <div>
            <span>{props.status || 'Статуса нету'}</span>
          </div>
        </div>
      )}
      <hr />
      {props.isAuth && (
        <ProfileStatus
          updateStatus={props.updateStatus}
          status={props.status}
        />
      )}
    </div>
  );
};
export default ProfileInfo;
