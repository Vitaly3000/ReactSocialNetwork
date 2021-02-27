import React, { ChangeEvent, useState } from 'react';
import style from './ProfileInfo.module.css';
import userPhoto from '../../../assets/img/user.jpg';
import ProfileStatus from './ProfileStatus';
import ProfileDataEdit from './ProfileDataForm';
import ProfileData from './ProfileData';
import { ProfileType } from '../../../types/types';

type PropsType = {
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
  profile: ProfileType | null;
  isOwner: boolean;
  status: string;
  updateStatus: (status: string) => void;
  isAuth: boolean;
};

const ProfileInfo: React.FC<PropsType> = ({
  savePhoto,
  saveProfile,
  profile,
  isOwner,
  status,
  updateStatus,
  isAuth,
}) => {
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };
  const [editMode, setEditMode] = useState(false);
  const onSubmit = (formData: ProfileType) => {
    // TODO: Remove Then
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      {profile && (
        <div>
          <div>
            <img
              className={style.profileImg}
              src={profile.photos.large || userPhoto}
              alt=""
            />
            <div>
              {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
            </div>
          </div>
          {editMode ? (
            <ProfileDataEdit
              initialValues={profile}
              profile={profile}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData
              profile={profile}
              isOwner={isOwner}
              goToEditMode={() => {
                setEditMode(true);
              }}
            />
          )}
          <div>
            {!isOwner && (
              <div>
                <span>{status || 'Статуса нету'}</span>
              </div>
            )}
          </div>
        </div>
      )}
      <hr />
      {isAuth && isOwner && (
        <ProfileStatus updateStatus={updateStatus} status={status} />
      )}
    </div>
  );
};

export default ProfileInfo;
