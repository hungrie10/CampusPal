import React from 'react'
import { Link } from 'react-router-dom'
import { faHomeUser, faNoteSticky, faWalkieTalkie, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {
  return (
     <footer>
                  <nav>
                      <ul>
                          <li><Link to="/dashboard">
                              <FontAwesomeIcon icon={faHomeUser} />
                              <span>Dashboard</span>   
                          </Link></li>
                          <li><Link to="/quiz_me">
                                <FontAwesomeIcon icon={faNoteSticky} />
                              <span>Quiz Me</span>   
                          </Link></li>
                          <li><Link to="/note-a-voice">
                                <FontAwesomeIcon icon={faWalkieTalkie} />
                                <span>Note A Voice</span>
                          </Link></li>
                      </ul>
                  </nav>
              </footer>
  )
}

export default Footer
