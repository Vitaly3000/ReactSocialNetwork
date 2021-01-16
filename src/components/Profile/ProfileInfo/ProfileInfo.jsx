import React from 'react';
import style from './ProfileInfo.module.css';
import userPhoto from '../../../assets/img/user.jpg';
import ProfileStatus from './ProfileStatus';
const ProfileInfo = (props) => {
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  return (
    <div>
      {props.profile && (
        <div>
          <img
            className={style.profileImg}
            src={props.profile.photos.large || userPhoto}
            alt=""
          />
          {props.isOwner && (
            <input type="file" onChange={onMainPhotoSelected} />
          )}
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
