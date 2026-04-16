import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faGlassWater, faGroupArrowsRotate, faHome, faMehRollingEyes, faNoteSticky, faRobot, faUserFriends, faVolume,faMessage } from '@fortawesome/free-solid-svg-icons'

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
        {/* <header></header> */}
        <div>
          <img src={"https://i.pinimg.com/736x/88/9b/ff/889bfffc6af09bd6730405cf7b9c547e.jpg"} alt="" />
          <h1>Hello! Welcome to Chatter</h1>
          <h2>Let's be Friends!</h2>
            </div>

        <div>
          <input type="text" />
          <span>
            <button><FontAwesomeIcon icon={faMessage} /></button>
          </span>
        </div>
      </section>
    </main>
  )
}

export default ChatBot