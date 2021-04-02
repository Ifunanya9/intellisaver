import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
  const { notifications } = props;
  console.log(notifications);

  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="online-users">
            { notifications && notifications.map(item =>{
              const {time} = item
              return <li key={item.id}>
                <span className="pink-text">{item.user} </span>
                <span>{item.content}</span>
            <span> called {item.mealName}</span>
                {/* <div className="note-date grey-text">{moment(time.toDate()).fromNow()}</div> */}
              </li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notifications;