/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  FiHexagon,
  FiChevronRight,
  FiBookmark,
  FiPlus,
  FiRefreshCw,
  FiDatabase,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { Container, List, Form, ScrollbarView, Header } from './styles';

import getValidationErrors, { Errors } from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Select from '../../components/Select';
import CircleButton from '../../components/CircleButton';
import Button from '../../components/Button';
import PageLoading from '../../components/PageLoading';
import NoDataWarn from '../../components/NoDataWarn';

import api from '../../services/api';

interface CategoryProps {
  id: number;
  name: string;
  group_id: number;
  group_name?: string;
}

interface GroupProps {
  id: number;
  name: string;
}

interface CategoryDataProps {
  name: string;
  groupId: number;
  groupName?: string;
}

const ScheduleCategories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [category, setCategory] = useState<CategoryProps>({} as CategoryProps);
  const [groups, setGroups] = useState<GroupProps[]>([]);

  const [formData, setFormData] = useState<CategoryDataProps>(
    {} as CategoryDataProps,
  );
  const [errors, setErrors] = useState<Errors>({} as Errors);

  const [appIsLoading, setAppIsLoading] = useState(false);
  const [Add, setAdd] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [Update, setUpdate] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    setAppIsLoading(true);

    api.get('schedule/categories').then(({ data }) => {
      setCategories(data);
    });

    api.get('schedule/groups').then(({ data }) => {
      setGroups(data);
    });

    setTimeout(() => {
      setAppIsLoading(false);
    }, 1000);
  }, []);

  function handleRegister(): void {
    if (!isAdding) {
      setFormData({ ...formData, name: '', groupId: 0 });
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
        if (formData.groupId === 0) {
          setFormData({ ...formData, groupId: Number(undefined) });
        }

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          groupId: Yup.number()
            .required('Grupo obrigatório')
            .notOneOf([0], 'Grupo obrigatório'),
        });

        schema
          .validate(formData, {
            abortEarly: false,
          })
          .then(() => {
            api
              .post('schedule/categories', formData)
              .then(({ data }) => {
                toast('Categoria cadastrada com sucesso!', {
                  type: 'success',
                  autoClose: 2000,
                });

                const groupCategoryCreated = groups.find(
                  (item) => item.id === formData.groupId,
                );

                const categoryCreated = {
                  ...data,
                  group_name: groupCategoryCreated?.name,
                };

                setCategories([...categories, categoryCreated]);

                setAdd(false);
                setIsAdding(false);

                setErrors({} as Errors);
              })
              .catch(() => {
                toast('A categoria já existe!', {
                  type: 'error',
                  autoClose: 2000,
                });

                setIsWriting(true);
                setIsAdding(false);

                setErrors({} as Errors);
              });
          })
          .catch((err) => {
            toast('Ops... Algo não está certo', {
              type: 'error',
              autoClose: 2000,
            });

            const errorsData = getValidationErrors(err);

            setErrors(errorsData);

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
      const selectedCategory = categories.find((item) => item.id === id);
      if (selectedCategory) {
        const { name, group_id, group_name } = selectedCategory;
        setFormData({ name, groupId: group_id, groupName: group_name });
        setCategory(selectedCategory);
      }
    }
  }

  function handleSubmitUpdate(id: number): void {
    setIsUpdating(true);
    setIsWriting(false);
    if (!isUpdating) {
      setTimeout(() => {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          groupId: Yup.number().required('Grupo obrigatório'),
        });
        schema
          .validate(formData, {
            abortEarly: false,
          })
          .then(() => {
            const { name, groupId } = formData;

            api
              .put(`schedule/categories/${id}`, { name, groupId })
              .then(() => {
                toast('Categoria alterada com sucesso!', {
                  type: 'success',
                  autoClose: 2000,
                });

                const categorieIndex = categories.findIndex(
                  (item) => item.id === id,
                );

                const updatedGroupName = groups.find(
                  (item) => item.id === formData.groupId,
                );

                const updatedCategory = {
                  id,
                  name: formData.name,
                  group_id: formData.groupId,
                  group_name: updatedGroupName?.name,
                };

                categories.splice(categorieIndex, 1, updatedCategory);

                setCategories([...categories]);

                setUpdate(false);
                setIsUpdating(false);

                setErrors({} as Errors);
              })
              .catch(() => {
                toast('O grupo já existe!', {
                  type: 'error',
                  autoClose: 2000,
                });

                setIsWriting(true);
                setIsUpdating(false);

                setErrors({} as Errors);
              });
          })
          .catch((err) => {
            toast('Ops... Algo não está certo', {
              type: 'error',
              autoClose: 2000,
            });

            const errorsData = getValidationErrors(err);

            setErrors(errorsData);

            setIsWriting(true);
            setIsUpdating(false);
          });
      }, 1000);
    }
  }

  function handleRefresh(): void {
    setAppIsLoading(true);

    api.get('schedule/categories').then(({ data }) => {
      setCategories(data);
    });

    setTimeout(() => {
      setAppIsLoading(false);
    }, 1000);
  }

  return (
    <>
      <Container>
        <Header>
          <h1>Agenda: Categorias</h1>
          <CircleButton
            onClick={handleRefresh}
            backgroundColor="#00addc"
            color="#fff"
            icon={FiRefreshCw}
          />
        </Header>
        {appIsLoading ? (
          <PageLoading />
        ) : categories[0] ? (
          <ScrollbarView autoHide>
            <List>
              {categories.map((item) => (
                <li
                  onClick={() => {
                    handleUpdate(item.id);
                  }}
                  key={item.id}
                >
                  <FiHexagon size={16} />
                  <div>
                    <p>{item.name}</p>
                    <span>Grupo: {item.group_name}</span>
                  </div>
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
          <h1>Categoria</h1>
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
          hasError={!!errors.name}
          error={errors.name}
          idTooltip="name"
          label="Nome"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value.toUpperCase() });
          }}
          backgroundColor="#00addc"
          color="#fff"
          icon={FiBookmark}
        />

        <Select
          disabled={!isWriting}
          hasError={!!errors.groupId}
          error={errors.groupId}
          idTooltip="group"
          onChange={(e) => {
            setFormData({ ...formData, groupId: Number(e.target.value) });
          }}
          label="Grupo"
          backgroundColor="#00addc"
          color="#fff"
          icon={FiDatabase}
          value={formData.groupId}
        >
          <option value="0">Selecione o grupo</option>
          {groups.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>

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
              handleSubmitUpdate(category.id);
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

export default ScheduleCategories;
