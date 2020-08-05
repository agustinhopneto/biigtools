/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable global-require */
import React, { useState } from 'react';
import { FiMenu, FiEdit3, FiClipboard } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

import CircleButton from '../CircleButton';

import { Container, Navigation, Wrapper } from './styles';

import logoCebrom from '../../assets/images/logoCebrom.png';
import logo from '../../assets/images/logo.svg';

const Menu: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(true);

  const containerAnimation = useSpring({
    from: {
      minWidth: isMinimized ? '300px' : '96px',
      width: isMinimized ? '300px' : '96px',
    },
    to: {
      minWidth: isMinimized ? '96px' : '300px',
      width: isMinimized ? '96px' : '300px',
    },
    config: { duration: 200 },
  });

  const itemAnimation = useSpring({
    from: { opacity: isMinimized ? 1 : 0 },
    to: { opacity: isMinimized ? 0 : 1 },
    delay: isMinimized ? 0 : 200,
    config: { duration: isMinimized ? 100 : 150 },
  });

  const textAnimation = useSpring({
    from: { display: isMinimized ? 'block' : 'none' },
    to: { display: isMinimized ? 'none' : 'block' },
    delay: isMinimized ? 0 : 200,
    config: { duration: isMinimized ? 100 : 150 },
  });

  return (
    <Container style={containerAnimation}>
      <header>
        <CircleButton
          color="#60c3ad"
          backgroundColor="#fff"
          icon={FiMenu}
          type="button"
          onClick={() => {
            setIsMinimized(!isMinimized);
          }}
        />

        <animated.img style={itemAnimation} src={logo} alt="CEBROM" />
      </header>
      <Navigation>
        <Link to="/">
          <FiClipboard size={36} color="#fff" />
          <animated.span style={textAnimation}>Relatórios</animated.span>
        </Link>
        <Link to="/registrations">
          <FiEdit3 size={36} color="#fff" />
          <animated.span style={textAnimation}>Cadastros</animated.span>
        </Link>
        <Wrapper />
      </Navigation>
      <footer>
        <animated.img style={itemAnimation} src={logoCebrom} alt="CEBROM" />
      </footer>
    </Container>
  );
};

export default Menu;
