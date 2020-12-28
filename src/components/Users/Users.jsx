import React from 'react';
import s from './Users.module.css';
const Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers([
      {
        name: 'Vitaly',
        id: 1,
        lastname: 'Smith',
        photo:
          'https://c.files.bbci.co.uk/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg',
        nameCity: 'Tula',
        country: 'Russia',
        followed: false,
      },
      {
        name: 'Yarik',
        id: 2,
        lastname: 'Bochek',
        photo:
          'https://c.files.bbci.co.uk/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg',
        nameCity: 'Kiev',
        country: 'Ukraine',
        followed: true,
      },
      {
        name: 'Sergey',
        id: 3,
        lastname: 'Sviridov',
        photo:
          'https://c.files.bbci.co.uk/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg',
        nameCity: 'Moscow',
        country: 'Russia',
        followed: false,
      },
    ]);
  }

  return (
    <div className={s.users}>
      {props.users.map((u) => {
        return (
          <div className={s.user}>
            <img className={s.photo} src={u.photo} alt="a sad frog" />
            <div className={s.name}>
              {u.name} {u.lastname}
            </div>
            <div>
              {u.nameCity} {u.country}
            </div>
            <button
              onClick={() => {
                props.toggleFollow(u.id);
              }}>
              {u.followed ? 'Отписаться' : 'Подписаться'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
