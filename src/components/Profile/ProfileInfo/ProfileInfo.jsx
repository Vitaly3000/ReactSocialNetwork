import React, { useState } from 'react';
import style from './ProfileInfo.module.css';
import userPhoto from '../../../assets/img/user.jpg';
import ProfileStatus from './ProfileStatus';
import ProfileDataEdit from './ProfileDataForm';
import ProfileData from './ProfileData';
const ProfileInfo = (props) => {
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  const [editMode, setEditMode] = useState(false);
  const onSubmit = (formData) => {
    props.saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };
  console.log('PROFILEINFO');
  return (
    <div>
      {props.profile && (
        <div>
          <div>
            <img
              className={style.profileImg}
              src={props.profile.photos.large || userPhoto}
              alt=""
            />
            <div>
              {props.isOwner && (
                <input type="file" onChange={onMainPhotoSelected} />
              )}
            </div>
          </div>
          {editMode ? (
            <ProfileDataEdit initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
          ) : (
            <ProfileData
              profile={props.profile}
              isOwner={props.isOwner}
              goToEditMode={() => {
                setEditMode(true);
              }}
            />
          )}
          <div>
            {!props.isOwner && (
              <div>
                <span>{props.status || 'Статуса нету'}</span>
              </div>
            )}
          </div>
        </div>
      )}
      <hr />
      {props.isAuth && props.isOwner && (
        <ProfileStatus
          updateStatus={props.updateStatus}
          status={props.status}
        />
      )}
    </div>
  );
};

export default ProfileInfo;
