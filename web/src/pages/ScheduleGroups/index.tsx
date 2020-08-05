/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  FiHexagon,
  FiChevronRight,
  FiBookmark,
  FiPlus,
  FiRefreshCw,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { Container, List, Form, ScrollbarView, Header } from './styles';

import Input from '../../components/Input';
import CircleButton from '../../components/CircleButton';
import Button from '../../components/Button';
import PageLoading from '../../components/PageLoading';
import NoDataWarn from '../../components/NoDataWarn';

import api from '../../services/api';

interface GroupProps {
  id: number;
  name: string;
}

const ScheduleGroups: React.FC = () => {
  const [groups, setGroups] = useState<GroupProps[]>([]);
  const [group, setGroup] = useState<GroupProps>({} as GroupProps);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [appIsLoading, setAppIsLoading] = useState(false);
  const [Add, setAdd] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [Update, setUpdate] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    setAppIsLoading(true);

    api.get('schedule/groups').then(({ data }) => {
      setGroups(data);
    });

    setTimeout(() => {
      setAppIsLoading(false);
    }, 1000);
  }, []);

  function handleRegister(): void {
    if (!isAdding) {
      setName('');
      setAdd(true);
      setUpdate(false);
      setIsWriting(true);
    }
  }

  function handleSubmitRegister(): void {
    setIsAdding(true);
    setIsWriting(false);
    setTimeout(() => {
      if (!isAdding) {
        const newGroup = {
          name,
        };

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        schema
          .validate(newGroup, {
            abortEarly: false,
          })
          .then(() => {
            api
              .post('schedule/groups', { name })
              .then(({ data }) => {
                toast('Grupo cadastrado com sucesso!', {
                  type: 'success',
                  autoClose: 2000,
                });
                setGroups([...groups, data]);

                setAdd(false);
                setIsAdding(false);

                setNameError('');
              })
              .catch(() => {
                toast('O grupo já existe!', {
                  type: 'error',
                  autoClose: 2000,
                });
                setIsWriting(true);
                setIsAdding(false);
                setNameError('');
              });
          })
          .catch((err) => {
            toast('Ops... Algo não está certo', {
              type: 'error',
              autoClose: 2000,
            });

            setNameError(err.errors[0]);

            setIsWriting(true);
            setIsAdding(false);
          });
      }
    }, 1000);
  }

  function handleUpdate(id: number): void {
    if (!isUpdating) {
      setIsWriting(true);
      setAdd(false);
      setUpdate(true);

      const selectedGroup = groups.find((item) => item.id === id);

      if (selectedGroup) {
        setName(selectedGroup.name);
        setGroup(selectedGroup);
      }
    }
  }

  function handleSubmitUpdate(id: number): void {
    setIsUpdating(true);
    setIsWriting(false);

    if (!isUpdating) {
      setTimeout(() => {
        const newGroup = {
          name,
        };

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        schema
          .validate(newGroup, {
            abortEarly: false,
          })
          .then(() => {
            api
              .put(`schedule/groups/${id}`, newGroup)
              .then(() => {
                toast('Grupo alterado com sucesso!', {
                  type: 'success',
                  autoClose: 2000,
                });

                const groupIndex = groups.findIndex((item) => item.id === id);

                const updatedGroup = {
                  id,
                  name,
                };

                groups.splice(groupIndex, 1, updatedGroup);

                setGroups([...groups]);

                setUpdate(false);
                setIsUpdating(false);

                setNameError('');
              })
              .catch(() => {
                toast('O grupo já existe!', {
                  type: 'error',
                  autoClose: 2000,
                });

                setNameError('');

                setIsWriting(true);
                setIsUpdating(false);
              });
          })
          .catch((err) => {
            toast('Ops... Algo não está certo', {
              type: 'error',
              autoClose: 2000,
            });

            setNameError(err.errors[0]);

            setIsWriting(true);
            setIsUpdating(false);
          });
      }, 1000);
    }
  }

  function handleRefresh(): void {
    setAppIsLoading(true);

    api.get('schedule/groups').then(({ data }) => {
      setGroups(data);
    });

    setTimeout(() => {
      setAppIsLoading(false);
    }, 1000);
  }
  return (
    <>
      <Container>
        <Header>
          <h1>Agenda: Grupos</h1>
          <CircleButton
            onClick={handleRefresh}
            backgroundColor="#00addc"
            color="#fff"
            icon={FiRefreshCw}
          />
        </Header>
        {appIsLoading ? (
          <PageLoading />
        ) : groups[0] ? (
          <ScrollbarView autoHide>
            <List>
              {groups.map((item) => (
                <li
                  onClick={() => {
                    handleUpdate(item.id);
                  }}
                  key={item.id}
                >
                  <FiHexagon size={16} />
                  <p>{item.name}</p>
                  <FiChevronRight size={16} />
                </li>
              ))}
            </List>
          </ScrollbarView>
        ) : (
          <NoDataWarn emoji="😴">Nenhum grupo foi cadastrado ainda</NoDataWarn>
        )}
      </Container>

      <Form>
        <header>
          <h1>Grupo</h1>
          <CircleButton
            onClick={handleRegister}
            backgroundColor="#fff"
            color="#00addc"
            icon={FiPlus}
          />
        </header>
        <Input
          disabled={!isWriting}
          maxLength={30}
          hasError={!!nameError}
          error={nameError}
          idTooltip="name"
          label="Nome"
          value={name}
          onChange={(e) => {
            setName(e.target.value.toUpperCase());
          }}
          backgroundColor="#00addc"
          color="#fff"
          icon={FiBookmark}
        />
        <footer>
          <Button
            isLoading={isAdding}
            isDisabled={!Add}
            onClick={handleSubmitRegister}
            type="button"
            backgroundColor="#fff"
            color="#00addc"
          >
            Cadastrar
          </Button>

          <Button
            onClick={() => {
              handleSubmitUpdate(group.id);
            }}
            isLoading={isUpdating}
            isDisabled={!Update}
            type="button"
            backgroundColor="#fff"
            color="#00addc"
          >
            Alterar
          </Button>
        </footer>
      </Form>
    </>
  );
};

export default ScheduleGroups;
