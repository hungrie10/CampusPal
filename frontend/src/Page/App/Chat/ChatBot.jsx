import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faRobot, faUserFriends, faPlaneCircleCheck, faGroupArrowsRotate } from '@fortawesome/free-solid-svg-icons'

function ChatBot() {
  return (
      <main id="chat_bot">
      <aside id="side_bar">

        <div>
        <img src={"https://i.pinimg.com/1200x/31/4b/96/314b960aa8fee08076b6f2db5e80ca4c.jpg"} width={90} alt="" />
        <p>Chatterer</p>
        </div>

        <nav>
          <ul>
            <li>
              <FontAwesomeIcon icon={faRobot} />
              <span>AI Chatter</span>
              </li>
            <li>
              <FontAwesomeIcon icon={faUserFriends} />
              <span>StudyBuddies</span>
              </li>
            <li>
              <FontAwesomeIcon icon={faGroupArrowsRotate} />
              <span>Groups</span>
              </li>
            <li>
              <FontAwesomeIcon icon={faAddressBook} />
              <span>Find Friends</span>
              </li>
          </ul>
        </nav>

        <div id='chat_profile'>
          <img src={"https://i.pinimg.com/736x/d7/1d/6e/d71d6e882e9d45d0eda79e256735f3d8.jpg"} width={50} alt="" />
          <span>
            <h2>Username</h2>
            <small>Online</small>
          </span>
        </div>
      </aside>
      <section id="main_chat">
        <div>
          <img src={"https://i.pinimg.com/736x/88/9b/ff/889bfffc6af09bd6730405cf7b9c547e.jpg"} alt="" />
          <h1>Hello! Welcome to Chatter 👋</h1>
          <h2>Let's be Friends!</h2>

          <div id='message_box'>
            <div className='message_bubble'>
            <small>Bayne</small>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium veniam doloremque tempore quidem odit autem cupiditate earum magnam eius laudantium?</p>
              </div>
            
          </div>
            </div>

        <div id='chat_panel'>
          <input type="text" placeholder='What do you want to talk about ?' />
          <span>
            <button><FontAwesomeIcon icon={faPlaneCircleCheck} /></button>
          </span>
        </div>
      </section>
    </main>
  )
}

export default ChatBot