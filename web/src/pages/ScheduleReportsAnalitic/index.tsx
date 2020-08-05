/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { FiHexagon } from 'react-icons/fi';

import api from '../../services/api';

import {
  Container,
  Header,
  Main,
  List,
  ScrollbarView,
  Info,
  TextInput,
} from './styles';

import Dropzone from '../../components/Dropzone';
import PageLoading from '../../components/PageLoading';
import NoDataWarn from '../../components/NoDataWarn';

interface ScheduleProps {
  professionalName: string;
  attended: number;
  absences: number;
  categoryName: string;
  groupName: string;
}

interface CategoryProps {
  category: string;
  attended: number;
  absences: number;
}

interface GroupProps {
  group: string;
  attended: number;
  absences: number;
}

const ScheduleReportsAnalitic: React.FC = () => {
  const [scheduleCount, setScheduleCount] = useState<ScheduleProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [groups, setGroups] = useState<GroupProps[]>([]);

  const [scheduleBackup, setScheduleBackup] = useState<ScheduleProps[]>([]);
  const [categoriesBackup, setCategoriesBackup] = useState<CategoryProps[]>([]);
  const [groupsBackup, setGroupsBackup] = useState<GroupProps[]>([]);

  const [appIsLoading, setAppIsLoading] = useState(false);

  async function handleFileUploaded(file: File): Promise<void> {
    setAppIsLoading(true);

    const data = new FormData();

    data.append('file', file);

    const response = await api.post('schedule', data);

    const { schedule, categoriesCount, groupsCount } = response.data;

    setScheduleCount(schedule);
    setCategories(categoriesCount);
    setGroups(groupsCount);

    setScheduleBackup(schedule);
    setCategoriesBackup(categoriesCount);
    setGroupsBackup(groupsCount);

    setTimeout(() => {
      setAppIsLoading(false);
    }, 1000);
  }

  function handleSearchProfessional(name: string): void {
    if (name === '') {
      return;
    }

    const newArray = scheduleBackup.filter((professional) =>
      professional.professionalName.includes(name),
    );

    if (!newArray[0]) {
      setScheduleCount(scheduleBackup);

      return;
    }

    setScheduleCount(newArray);
  }

  function handleSearchCategory(name: string): void {
    if (name === '') {
      return;
    }

    const newArray = categoriesBackup.filter((professional) =>
      professional.category.includes(name),
    );

    if (!newArray[0]) {
      setCategories(categoriesBackup);

      return;
    }

    setCategories(newArray);
  }

  return (
    <Container>
      <Header>
        <h1>Relatório Analítico de Agendamentos</h1>
        <Dropzone
          onFileUploaded={(file) => {
            handleFileUploaded(file);
          }}
        />
      </Header>
      <Main>
        {appIsLoading ? (
          <PageLoading />
        ) : scheduleCount[0] ? (
          <>
            <div>
              <header>
                <h2>Profissionais</h2>
                <TextInput
                  placeholder="Pesquisar..."
                  type="text"
                  onChange={(e) => {
                    handleSearchProfessional(e.target.value.toUpperCase());
                  }}
                />
              </header>
              <ScrollbarView autoHide>
                <List>
                  {scheduleCount.map((item) => (
                    <li key={item.professionalName + item.absences}>
                      <FiHexagon size={16} />
                      <div>
                        <p>{item.professionalName}</p>
                        <span>Atendidos: {item.attended}</span>
                        <span>Faltas: {item.absences}</span>
                        <Info>
                          <span>Categoria: {item.categoryName}</span>
                          <span>Grupo: {item.groupName}</span>
                        </Info>
                      </div>
                    </li>
                  ))}
                </List>
              </ScrollbarView>
            </div>
            <div>
              <header>
                <h2>Categorias</h2>
                <TextInput
                  placeholder="Pesquisar..."
                  type="text"
                  onChange={(e) => {
                    handleSearchCategory(e.target.value.toUpperCase());
                  }}
                />
              </header>
              <ScrollbarView autoHide>
                <List>
                  {categories.map((item) => (
                    <li key={item.category + item.attended + item.absences}>
                      <FiHexagon size={16} />
                      <div>
                        <p>{item.category}</p>
                        <span>Atendidos: {item.attended}</span>
                        <span>Faltas: {item.absences}</span>
                      </div>
                    </li>
                  ))}
                </List>
              </ScrollbarView>
            </div>
            <div>
              <header>
                <h2>Grupos</h2>
                <TextInput placeholder="Pesquisar..." type="text" />
              </header>
              <ScrollbarView autoHide>
                <List>
                  {groups.map((item) => (
                    <li key={item.group + item.attended}>
                      <FiHexagon size={16} />
                      <div>
                        <p>{item.group}</p>
                        <span>Atendidos: {item.attended}</span>
                        <span>Faltas: {item.absences}</span>
                      </div>
                    </li>
                  ))}
                </List>
              </ScrollbarView>
            </div>
          </>
        ) : (
          <NoDataWarn emoji="👍">
            Faça o upload do arquivo e não esqueça de converter para xlsx!
          </NoDataWarn>
        )}
      </Main>
    </Container>
  );
};

export default ScheduleReportsAnalitic;
