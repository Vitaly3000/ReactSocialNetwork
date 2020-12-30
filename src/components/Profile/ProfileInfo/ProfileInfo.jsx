import React from 'react';
import Preloader from '../../common/preloader/preloader';
import s from './ProfileInfo.module.css';
const ProfileInfo = (props) => {
 
  if (!props.profile) {
    return <Preloader />;
  }
  
  return (
    <div>
      <div>
        <img src="https://kittentoob.com/wp-content/uploads/2014/10/orange-cat.jpg" />
      </div>
      <div>ava+desk</div>
      <div>
        <img src={props.profile.photos.large} alt="" />
      </div>
    </div>
  );
};
export default ProfileInfo;
