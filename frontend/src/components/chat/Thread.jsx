import React from 'react';
import { Link } from 'react-router-dom';
import DropDownMenu from '../profile/DropDownMenu';

function Thread({ thread, setMessageBox }) {
  const senderMail = window.sessionStorage.getItem('userEmail');
  const receiverEmail = senderMail === thread.p1Email ? thread.p2Email : thread.p1Email;
  const receiverMessage = thread.receiverMessage;

  const clickHandler = () => {
    setMessageBox({ threadId: thread.id, thread: thread });
  };
  const lastMessage = thread.thread.slice(-1)[0];
  const lastDate = lastMessage === undefined ? null : lastMessage.date;


  return (
    <div className="chat_people">
      <div className="chat_img">
        {' '}
        <img src="/images/sender.jpeg" alt="name" />{' '}
      </div>
      <div >
        <h5>
          <Link to="/chat" onClick={clickHandler}>
            {receiverEmail}
          </Link>
          <span >{lastDate}</span>
        </h5>
        <p>{receiverMessage}</p>
      </div>
      
    </div>
  );
}

export default Thread;
