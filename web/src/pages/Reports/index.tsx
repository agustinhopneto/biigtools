import React from 'react';
import { FiClipboard, FiBook } from 'react-icons/fi';

import { Container, Navigation, Section, Navigate } from './styles';

const Reports: React.FC = () => {
  return (
    <Container>
      <header>
        <FiClipboard color="#58595b" size={46} />
        <h1>Relatórios</h1>
      </header>

      <Section>
        <h2>Agenda</h2>
        <Navigation>
          <li>
            <Navigate to="/reports/schedule/analitic">
              <FiBook size={36} />
              <span>Relatório Analítico de Agendamentos</span>
            </Navigate>
          </li>
        </Navigation>
      </Section>
    </Container>
  );
};

export default Reports;
