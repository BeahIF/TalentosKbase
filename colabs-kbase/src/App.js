import { useState,useEffect  } from 'react';
import './App.css';
import Banner from './componentes/Banner/Banner';
import Formulario from './componentes/Formulario';
import Time from './componentes/Time';
import Dashboard from './componentes/Dashboard';
import axios from 'axios';


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

  const [colaboradores, setColaboradores]=useState([        { time:"DevOps",nome: 'João', email: 'joao@example.com', usuario: 'joaouser', dependentes: [{ nome: 'Maria', parentesco: 'filha' }] },
  ])
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

  const handleSaveEdit = (updatedColaborador) => {
      // Atualizar a lista de colaboradores com as informações editadas
      console.log("teste")
      console.log(updatedColaborador)
      console.log(colaboradores.filter(colab=>console.log(colab)))
      console.log("acaba")
      setColaboradores(colaboradores.map(colab =>
          colab.id === updatedColaborador.id ? updatedColaborador : colab
      ));
      console.log(colaboradores)
      setShowEditModal(false); // Fechar o modal após salvar
  };

  const handleCloseModal = () => {
    setShowDependentesModal(false);
};
  const aoNovoColaboradorAdicionado =(colaborador)=>{
    setColaboradores([...colaboradores, colaborador])

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
}

const EditModal = ({ colaborador, onSave, onClose }) => {
  const [nome, setNome] = useState(colaborador.nome);
  const [email, setEmail] = useState(colaborador.email);
  const [usuario, setUsuario] = useState(colaborador.usuario);

  const handleSave = () => {
      onSave({ ...colaborador, nome, email, usuario });
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
