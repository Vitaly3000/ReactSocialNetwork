import React from 'react';
import Contacts from './Contacts';

const ProfileData = ({ profile, goToEditMode, isOwner }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>EditMode</button>
        </div>
      )}
      <div>fullName: {profile.fullName}</div>
      <div>userId: {profile.userId} </div>
      <div>aboutMe:{profile.aboutMe || 'Нечего не написано'}</div>
      <div>lookingForAJob: {profile.lookingForAJob ? 'Да' : 'Не ищет'}</div>
      <div>
        lookingForAJobDescription:{' '}
        {profile.lookingForAJobDescription || 'Навыки не указаны'}
      </div>
      <div>
        <div>Contacts:</div>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contacts
              key={key}
              contactKey={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfileData;
