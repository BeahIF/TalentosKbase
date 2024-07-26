import { useState,useEffect  } from 'react';
import './App.css';
import Banner from './componentes/Banner/Banner';
import Formulario from './componentes/Formulario';
import Time from './componentes/Time';
import Dashboard from './componentes/Dashboard';
import axios from 'axios';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function App() {
  const times = [{
    nome:'Programação',
    corPrimaria:'#57C278',
    corSecundaria:'#D9F7E9'
  },{
    nome:'DevOps',
    corPrimaria:'#82CFFA',
    corSecundaria:'#E8F8FF'
  },{
    nome:'Data Science',
    corPrimaria:'#A6D157',
    corSecundaria:'#F0F8E2'
  },{
    nome:'Front-end',
    corPrimaria:'#DB6EBF',
    corSecundaria:'#FAE9F5'
  },{
    nome:'UX',
    corPrimaria:'#FFBA05',
    corSecundaria:'#FFF509'
  },{
    nome: 'Mobile',
    corPrimaria:'#FF88A29',
    corSecundaria:'#FFEEDF'
  },{
    nome:'Inovação e Gestão',
    corPrimaria:'#E06B69',
    corSecundaria:'#FDE7E8'
  },]

  const [colaboradores, setColaboradores]=useState([        ])
  console.log("colaboradores", colaboradores)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDependentesModal, setShowDependentesModal] = useState(false);
  const [dependentesDoColaborador, setDependentesDoColaborador] = useState(null);
  
  // Estado para controlar o modal de edição
  const [editingColaborador, setEditingColaborador] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    const fetchColaboradores = async () => {
        try {
            const response = await axios.get('http://localhost:8485/colaborador');
           
            setColaboradores(response.data);
            setLoading(false);
        } catch (err) {
          console.log(err)
            setError('Erro ao carregar os dados');
            setLoading(false);
        }
    };

    fetchColaboradores();
}, []);

if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;


  const handleEditColaborador = (colaborador) => {
      // Lógica para editar o colaborador
      // Aqui você pode abrir um modal ou redirecionar para uma página de edição
      console.log('Editando colaborador:', colaborador);
      // Exemplo: Abrir um modal com informações do colaborador
      setEditingColaborador(colaborador);
      setShowEditModal(true);
  };

  const handleViewDependentes = (colaborador) => {
    setDependentesDoColaborador(colaborador.dependentes);
    setShowDependentesModal(true);
};
const handleSaveEdit = async (updatedColaborador) => {
  console.log("teste")
  console.log(updatedColaborador)
  try {
    // Obter o colaborador original
    const colaboradorOriginal = colaboradores.find(colab => colab.id === updatedColaborador.id);
    
    // Construir um objeto com apenas os campos modificados
    const camposModificados = {};
    
    // Comparar os valores originais com os novos valores
    for (const key in updatedColaborador) {
      if (updatedColaborador[key] !== colaboradorOriginal[key]) {
        camposModificados[key] = updatedColaborador[key];
      }
    }
    // Se não houver campos modificados, não enviar a requisição
    if (Object.keys(camposModificados).length === 0) {
      console.log("Nenhum campo foi alterado.");
      return;
    }
    console.log("CAmpos modificados", camposModificados)
    // Enviar apenas os campos modificados para o backend
    const response = await axios.put(`http://localhost:8485/colaborador/${updatedColaborador.id}`, camposModificados);
    console.log("response editar", response.data)
    // Atualizar a lista de colaboradores com as informações editadas
    setColaboradores(colaboradores.map(colab =>
      colab.id === updatedColaborador.id ? { ...colab, ...response.data.colaborador } : colab
    ));
    setShowEditModal(false); // Fechar o modal após salvar
  } catch (error) {
    console.error("Erro ao salvar colaborador editado:", error);
  }
};

  const handleCloseModal = () => {
    setShowDependentesModal(false);
};
  const aoNovoColaboradorAdicionado =async (colaborador)=>{
    console.log("no novo colaborador adicionado")
    console.log(colaborador)
    try {
      const response = await axios.post('http://localhost:8485/colaborador', colaborador);
      console.log("response do criado", response)
      setColaboradores([...colaboradores, response.data.colaborador]);
    } catch (error) {
      console.error('Erro ao adicionar colaborador:', error);
    }
  }
  return (
    <div className="App">
      <Banner />
      <Dashboard colaboradores={colaboradores} />

      <Formulario times={times.map(time => time.nome)} aoColaboradorCadastrado={colaborador => 
        aoNovoColaboradorAdicionado(colaborador)}/>

      {times.map(time=><Time key={time.nome} nome={time.nome} 
        corPrimaria={time.corPrimaria} 
        corSecundaria={time.corSecundaria}
        colaboradores={colaboradores.filter(
          colaborador=>colaborador.time=== time.nome)} 
           onEdit={handleEditColaborador}
           onViewDependentes={handleViewDependentes} 
           />
        
      )}
      {showEditModal && (
        <EditModal 
            colaborador={editingColaborador} 
            onSave={handleSaveEdit} 
            onClose={() => setShowEditModal(false)} times={times} 
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
}

const EditModal = ({ colaborador, onSave, onClose , times}) => {
  const [nome, setNome] = useState(colaborador.nome);
  const [email, setEmail] = useState(colaborador.email);
  const [usuario, setUsuario] = useState(colaborador.usuario);
  const [cpf, setCpf] = useState(colaborador.cpf || '');
  const [dataNascimento, setDataNascimento] = useState(colaborador.data_nascimento || '');
  const [dataAdmissao, setDataAdmissao] = useState(colaborador.data_admissao || '');
  const [dataDemissao, setDataDemissao] = useState(colaborador.data_demissao || '');
  const [motivoDemissao, setMotivoDemissao] = useState(colaborador.motivo_demissao || '');
  const [time, setTime] = useState(colaborador.time || '');
  const handleSave = () => {
      onSave({ ...colaborador, nome, email, usuario , cpf,
        data_nascimento: dataNascimento,
        data_admissao: dataAdmissao,
        data_demissao: dataDemissao,
        motivo_demissao: motivoDemissao,
        time});
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
            <label>
              Time:
              <select value={time} onChange={(e) => setTime(e.target.value)}>
                {times.map((t) => (
                  <option key={t.nome} value={t.nome}>{t.nome}</option>
                ))}
              </select>
            </label>
              <button onClick={handleSave}>Salvar</button>
              <button onClick={onClose}>Cancelar</button>
          </div>
      </div>
  );
};

const DependentesModal = ({ dependentes, onClose }) => {
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

export default App;
