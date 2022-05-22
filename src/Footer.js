import React from 'react';
import { Button } from 'react-bootstrap';
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab , faGithub, faInstagram, faLinkedin, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons'

function Footer(){
    return(
        <footer className='text-center'>
            <div className='container pt-4'>
                <a  href='https://github.com/LucaPotenza'><FontAwesomeIcon icon={faGithub} size='2xl' className='icon'/></a>
                <a href='https://www.linkedin.com/in/luca-potenza-039166232/'><FontAwesomeIcon icon={faLinkedin} size='2xl' className='icon' /></a>
                <a href='https://www.instagram.com/lucap00/'><FontAwesomeIcon icon={faInstagram} size='2xl' className='icon' /></a>
                <a href='https://twitter.com/LucaPotenza7'><FontAwesomeIcon icon={faTwitter} size='2xl' className='icon' /></a>
                <a href='https://t.me/LucaPotenza'><FontAwesomeIcon icon={faTelegram} size='2xl' className='icon' /></a>
            </div>
            <div className='left'>
                © 2022 Copyright: Luca Potenza
            </div>
        </footer>
    )
}

export default Footer;