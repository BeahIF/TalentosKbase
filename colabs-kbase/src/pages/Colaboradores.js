import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from '../componentes/Formulario';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ColaboradoresPage = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDependentesModal, setShowDependentesModal] = useState(false);
  const [dependentesDoColaborador, setDependentesDoColaborador] = useState(null);
  const [editingColaborador, setEditingColaborador] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [dependenteColaboradorId, setDependenteColaboradorId] = useState(null); // Estado para armazenar o ID do colaborador para dependentes

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const response = await axios.get('http://localhost:8485/colaborador');
        setColaboradores(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Erro ao carregar os dados');
        setLoading(false);
      }
    };

    fetchColaboradores();
  }, []);
  useEffect(() => {
    console.log("indo pegar os dependentes")
    const fetchDependentes = async () => {
        console.log(dependenteColaboradorId)
      if (dependenteColaboradorId) {
        try {
          const response = await axios.get(`http://localhost:8485/colaborador/${dependenteColaboradorId}/dependentes`);
            console.log(response)
          setDependentesDoColaborador(response.data);
        } catch (err) {
          console.error('Erro ao carregar dependentes:', err);
        }
      }
    };

    fetchDependentes();
  }, [dependenteColaboradorId]); // Dependente do ID do colaborador

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleDeleteColaborador = async (id) => {
    try {
      await axios.delete(`http://localhost:8485/colaborador/${id}`);
      setColaboradores(colaboradores.filter(colaborador => colaborador.id !== id));
    } catch (err) {
      console.error('Erro ao deletar colaborador:', err);
    }
  };

  const handleEditColaborador = (colaborador) => {
    setEditingColaborador(colaborador);
    setShowEditModal(true);
  };

  const handleViewDependentes = (colaboradorId) => {
    console.log("handleViewDependentes")
    console.log(colaboradorId)
    setDependenteColaboradorId(colaboradorId);
    setShowDependentesModal(true);
  };

  const handleSaveEdit = async (updatedColaborador) => {
    try {
      const colaboradorOriginal = colaboradores.find(colab => colab.id === updatedColaborador.id);
      const camposModificados = {};

      for (const key in updatedColaborador) {
        if (updatedColaborador[key] !== colaboradorOriginal[key]) {
          camposModificados[key] = updatedColaborador[key];
        }
      }

      if (Object.keys(camposModificados).length === 0) {
        console.log("Nenhum campo foi alterado.");
        return;
      }

      const response = await axios.put(`http://localhost:8485/colaborador/${updatedColaborador.id}`, camposModificados);
      setColaboradores(colaboradores.map(colab =>
        colab.id === updatedColaborador.id ? { ...colab, ...response.data.colaborador } : colab
      ));
      setShowEditModal(false);
    } catch (error) {
      console.error("Erro ao salvar colaborador editado:", error);
    }
  };

  const handleCloseModal = () => {
    setShowDependentesModal(false);
  };

  const aoNovoColaboradorAdicionado = async (colaborador) => {
    try {
      const response = await axios.post('http://localhost:8485/colaborador', colaborador);
      setColaboradores([...colaboradores, response.data.colaborador]);
    } catch (error) {
      console.error('Erro ao adicionar colaborador:', error);
    }
  };

  return (
    <div className="ColaboradoresPage">
      <Formulario aoColaboradorCadastrado={aoNovoColaboradorAdicionado} />
      <div className='colaboradores'>
        {colaboradores.map(colaborador => (
          <div key={colaborador.id} className="card">
            <h3>{colaborador.nome}</h3>
            <p>Email: {colaborador.email}</p>
            <p>Usuário: {colaborador.usuario}</p>
            <p>CPF: {colaborador.cpf}</p>
            <p>Data de Nascimento: {formatDate(colaborador.data_nascimento)}</p>
            <p>Data de Admissão: {formatDate(colaborador.data_admissao)}</p>
            {colaborador.data_demissao && (
              <>
                <p>Data de Demissão: {formatDate(colaborador.data_demissao)}</p>
                <p>Motivo de Demissão: {colaborador.motivo_demissao}</p>
              </>
            )}
            <p>Time: {colaborador.time}</p>
            <button onClick={() => handleEditColaborador(colaborador)}>Editar</button>
            <button onClick={() => handleDeleteColaborador(colaborador.id)}>Deletar</button>
            <button onClick={() => handleViewDependentes(colaborador.id)}>Ver Dependentes</button>
          </div>
        ))}
      </div>

      {showEditModal && (
        <EditModal
          colaborador={editingColaborador}
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDependentesModal && (
        <DependentesModal
          dependentes={dependentesDoColaborador}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

const EditModal = ({ colaborador, onSave, onClose , times}) => {
    const [nome, setNome] = useState(colaborador.nome);
    const [email, setEmail] = useState(colaborador.email);
    const [usuario, setUsuario] = useState(colaborador.usuario);
    const [cpf, setCpf] = useState(colaborador.cpf || '');
    const [dataNascimento, setDataNascimento] = useState(colaborador.data_nascimento || '');
    const [dataAdmissao, setDataAdmissao] = useState(colaborador.data_admissao || '');
    const [dataDemissao, setDataDemissao] = useState(colaborador.data_demissao || '');
    const [motivoDemissao, setMotivoDemissao] = useState(colaborador.motivo_demissao || '');
    const handleSave = () => {
        onSave({ ...colaborador, nome, email, usuario , cpf,
          data_nascimento: dataNascimento,
          data_admissao: dataAdmissao,
          data_demissao: dataDemissao,
          motivo_demissao: motivoDemissao,
          });
    };
  
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Editar Colaborador</h2>
                <label>
                    Nome:
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Usuário:
                    <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </label>
                <label>
                CPF:
                <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
              </label>
              <label>
                Data de Nascimento:
                <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
              </label>
              <label>
                Data de Admissão:
                <input type="date" value={dataAdmissao} onChange={(e) => setDataAdmissao(e.target.value)} />
              </label>
              <label>
                Data de Demissão:
                <input type="date" value={dataDemissao} onChange={(e) => setDataDemissao(e.target.value)} />
              </label>
              <label>
                Motivo de Demissão:
                <input type="text" value={motivoDemissao} onChange={(e) => setMotivoDemissao(e.target.value)} />
              </label>
             
                <button onClick={handleSave}>Salvar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
  };
  
  const DependentesModal = ({ dependentes, onClose }) => {
    console.log("Dependentes modal")
    console.log(dependentes)
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Dependentes</h2>
                {dependentes && dependentes.length > 0 ? (
                    <ul>
                        {dependentes.map((dependente, index) => (
                            <li key={index}>
                                {dependente.nome} - {dependente.parentesco}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum dependente encontrado.</p>
                )}
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
  };
  
  export default ColaboradoresPage;
  