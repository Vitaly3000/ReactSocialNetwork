import React from 'react';
import style from './Users.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/img/user.jpg';

class Users extends React.Component {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page${this.props.currentPage}&count=${this.props.pageSize}`,
      )
      .then((responce) => {
        this.props.setUsers(responce.data.items);
        if (responce.data.totalCount > 500) {
          this.props.setTotalUsersCount(200);
        }
      });
  }
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,
      )
      .then((responce) => {
        this.props.setUsers(responce.data.items);
      });
  };
  render() {
    let pagesCount = Math.ceil(
      this.props.totalUsersCount / this.props.pageSize,
    );
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return (
      <div className={style.users}>
        <div className={style.paginator}>
          {pages.map((p) => {
            return (
              <button
                onClick={() => this.onPageChanged(p)}
                className={this.props.currentPage === p && style.currentPage}>
                {p}
              </button>
            );
          })}
        </div>
        {this.props.users.map((u) => {
          return (
            <div className={style.user}>
              <img
                className={style.photo}
                src={u.photo ? u.small : userPhoto}
                alt="a sad frog"
              />
              <div>Name:</div>
              <div className={style.name}>{u.name}</div>

              <button
                onClick={() => {
                  this.props.toggleFollow(u.id);
                }}>
                {u.followed ? 'Отписаться' : 'Подписаться'}
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Users;
