import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FilterType } from '../../redux/users-reducer';

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type FormType = {
  term: string;
  friend: 'true' | 'false' | 'null';
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
  filter: FilterType;
};

export const UsersSearchForm: React.FC<PropsType> = React.memo(
  ({ filter, onFilterChanged }) => {
    const submit = (
      values: FormType,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    ) => {
      const filter: FilterType = {
        term: values.term,
        friend:
          values.friend === 'null'
            ? null
            : values.friend === 'true'
            ? true
            : false,
      };

      onFilterChanged(filter);
      setSubmitting(false);
    };

    return (
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            term: filter.term,
            friend: String(filter.friend) as 'true' | 'false' | 'null',
          }}
          validate={usersSearchFormValidate}
          onSubmit={submit}>
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="term" />

              <Field name="friend" as="select">
                <option value="null">All</option>
                <option value="true">Only followed</option>
                <option value="false">Only unfollowed</option>
              </Field>
              <button type="submit" disabled={isSubmitting}>
                Find
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  },
);
