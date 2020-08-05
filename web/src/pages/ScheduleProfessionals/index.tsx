/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  FiHexagon,
  FiChevronRight,
  FiBookmark,
  FiPlus,
  FiRefreshCw,
  FiLayers,
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

interface ProfessionalProps {
  id: number;
  name: string;
  group_id: number;
  group_name?: string;
  category_id: number;
  category_name?: string;
}

interface CategoryProps {
  id: number;
  name: string;
  group_id: number;
  group_name?: string;
}

interface ProfessionalsDataProps {
  name: string;
  groupId: number;
  groupName?: string;
  categoryId: number;
  categoryName?: string;
}

const ScheduleProfessionals: React.FC = () => {
  const [professional, setProfessional] = useState<ProfessionalProps>(
    {} as ProfessionalProps,
  );
  const [professionals, setProfessionals] = useState<ProfessionalProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const [formData, setFormData] = useState<ProfessionalsDataProps>(
    {} as ProfessionalsDataProps,
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
    api.get('schedule/professionals').then(({ data }) => {
      setProfessionals(data);
    });
    api.get('schedule/categories').then(({ data }) => {
      setCategories(data);
    });
    setTimeout(() => {
      setAppIsLoading(false);
    }, 1000);
  }, []);

  function handleRegister(): void {
    if (!isAdding) {
      setFormData({ ...formData, name: '', categoryId: 0 });
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
        if (formData.categoryId === 0) {
          setFormData({ ...formData, categoryId: Number(undefined) });
        }
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          categoryId: Yup.number()
            .required('Categoria obrigatória')
            .notOneOf([0], 'Categoria obrigatória'),
        });
        schema
          .validate(formData, {
            abortEarly: false,
          })
          .then(() => {
            api
              .post('schedule/professionals', formData)
              .then(({ data }) => {
                toast('Profissional cadastrado(a) com sucesso!', {
                  type: 'success',
                  autoClose: 2000,
                });

                const categoryProfessionalCreated = categories.find(
                  (item) => item.id === formData.categoryId,
                );

                const professionalCreated = {
                  ...data,
                  category_name: categoryProfessionalCreated?.name,
                  group_name: categoryProfessionalCreated?.group_name,
                };

                setProfessionals([...professionals, professionalCreated]);
                setAdd(false);
                setIsAdding(false);
                setErrors({} as Errors);
              })
              .catch(() => {
                toast('Profissional já existe!', {
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

      const selectedProfessional = professionals.find((item) => item.id === id);

      if (selectedProfessional) {
        const {
          name,
          category_name,
          category_id,
          group_id,
          group_name,
        } = selectedProfessional;
        setFormData({
          name,
          categoryId: category_id,
          categoryName: category_name,
          groupId: group_id,
          groupName: group_name,
        });
        setProfessional(selectedProfessional);
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
          categoryId: Yup.number().required('Categoria obrigatório'),
        });

        schema
          .validate(formData, {
            abortEarly: false,
          })
          .then(() => {
            const { name, categoryId } = formData;
            api
              .put(`schedule/professionals/${id}`, { name, categoryId })
              .then(() => {
                toast('Profissional alterado(a) com sucesso!', {
                  type: 'success',
                  autoClose: 2000,
                });

                const professionalIndex = professionals.findIndex(
                  (item) => item.id === id,
                );

                const updatedCategoryData = categories.find(
                  (item) => item.id === formData.categoryId,
                );

                const updatedProfessional = {
                  id,
                  name: formData.name,
                  group_id: formData.groupId,
                  group_name: updatedCategoryData?.name,
                  category_id: formData.categoryId,
                  category_name: updatedCategoryData?.name,
                };

                professionals.splice(professionalIndex, 1, updatedProfessional);

                setProfessionals([...professionals]);
                setUpdate(false);
                setIsUpdating(false);
                setErrors({} as Errors);
              })
              .catch(() => {
                toast('Profissional já existe!', {
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
    api.get('schedule/professionals').then(({ data }) => {
      setProfessionals(data);
    });
    setTimeout(() => {
      setAppIsLoading(false);
    }, 1000);
  }

  return (
    <>
      <Container>
        <Header>
          <h1>Agenda: Profissionais</h1>
          <CircleButton
            onClick={handleRefresh}
            backgroundColor="#00addc"
            color="#fff"
            icon={FiRefreshCw}
          />
        </Header>
        {appIsLoading ? (
          <PageLoading />
        ) : professionals[0] ? (
          <ScrollbarView autoHide>
            <List>
              {professionals.map((item) => (
                <li
                  onClick={() => {
                    handleUpdate(item.id);
                  }}
                  key={item.id}
                >
                  <FiHexagon size={16} />
                  <div>
                    <p>{item.name}</p>
                    <span>Categoria: {item.category_name}</span>
                    <span>Grupo: {item.group_name}</span>
                  </div>
                  <FiChevronRight size={16} />
                </li>
              ))}
            </List>
          </ScrollbarView>
        ) : (
          <NoDataWarn emoji="😴">
            Nenhum profissional foi cadastrado ainda
          </NoDataWarn>
        )}
      </Container>

      <Form>
        <header>
          <h1>Profissional</h1>
          <CircleButton
            onClick={handleRegister}
            backgroundColor="#fff"
            color="#00addc"
            icon={FiPlus}
          />
        </header>
        <Input
          disabled={!isWriting}
          maxLength={70}
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
          hasError={!!errors.categoryId}
          error={errors.categoryId}
          idTooltip="category"
          onChange={(e) => {
            setFormData({ ...formData, categoryId: Number(e.target.value) });
          }}
          label="Categoria"
          backgroundColor="#00addc"
          color="#fff"
          icon={FiLayers}
          value={formData.categoryId}
        >
          <option value="0">Selecione a categoria</option>
          {categories.map((item) => (
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
              handleSubmitUpdate(professional.id);
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

export default ScheduleProfessionals;
