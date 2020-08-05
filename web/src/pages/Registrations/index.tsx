import React from 'react';
import { FiEdit3, FiDatabase, FiLayers, FiUsers } from 'react-icons/fi';

import { Container, Navigation, Section, Navigate } from './styles';

const Registrations: React.FC = () => {
  return (
    <Container>
      <header>
        <FiEdit3 color="#58595b" size={46} />
        <h1>Cadastros</h1>
      </header>

      <Section>
        <h2>Agenda</h2>
        <Navigation>
          <li>
            <Navigate to="/schedule/groups">
              <FiDatabase size={36} />
              <span>Grupos</span>
            </Navigate>
          </li>

          <li>
            <Navigate to="/schedule/categories">
              <FiLayers size={36} />
              <span>Categorias</span>
            </Navigate>
          </li>

          <li>
            <Navigate to="/schedule/professionals">
              <FiUsers size={36} />
              <span>Profissionais</span>
            </Navigate>
          </li>
        </Navigation>
      </Section>
    </Container>
  );
};

export default Registrations;
