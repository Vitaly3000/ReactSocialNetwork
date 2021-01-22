import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  maxLengthCreator,
  required,
} from '../../../utils/validators/validators';
import { Input, Textarea } from '../../common/FormsControls/FormsControls';
const maxLength = maxLengthCreator(40);
const ProfileDataEdit = (props) => {
  console.log('ProfileDataForm');
  return <ProfileDataFormReduxForm {...props} />;
};
const ProfileDataForm = ({ profile, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <button>Save</button>
      <div>
        fullName:
        <div>
          <Field
            placeholder="fullName"
            name="fullName"
            component={Input}
            validate={[required]}
          />
        </div>
      </div>
      <div>
        aboutMe:
        <div>
          <Field
            name="aboutMe"
            component={Textarea}
            placeholder="Введите текст"
            validate={[required, maxLength]}
          />
        </div>
      </div>
      <div>
        lookingForAJob:
        <div>
          <Field name="lookingForAJob" component={Input} type="checkbox" />
        </div>
      </div>
      <div>
        lookingForAJobDescription:
        <div>
          <Field
            name="lookingForAJobDescription"
            component={Textarea}
            placeholder="Введите текст"
            validate={[required, maxLength]}
          />
        </div>
      </div>
      <div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key}>
              {key}:
              <div>
                <Field
                  name={'contacts.' + key}
                  component={Input}
                  placeholder={key}
                  validate={[]}
                />
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
};
const ProfileDataFormReduxForm = reduxForm({ form: 'editProfile' })(
  ProfileDataForm,
);
export default ProfileDataEdit;
