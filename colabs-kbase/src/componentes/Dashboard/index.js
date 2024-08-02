import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import React from 'react';
import './Dashboard.css';
import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Dashboard = () => {
    const navigate = useNavigate();

  const [dependentes, setDependentes]=useState([      ])
  const [colaboradores, setColaboradores]=useState([        ])

  const quantidadeColaboradores = colaboradores?.colaboradores?.length;


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleVerColaboradores = () => {
    navigate('/colaboradores');
  };

  useEffect(() => {
    const fetchColaboradores = async () => {
        try {
            const response = await axios.get('http://localhost:8485/dependente');
          
            setDependentes(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erro ao carregar os dados');
            setLoading(false);
        }
    };

    fetchColaboradores();
}, []);
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

    const quantidadeDependentes = dependentes?.length

    const data = [
        { nome: 'Quantidade', colaboradores: quantidadeColaboradores, dependentes: quantidadeDependentes }
      ];
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-stats">
                <div className="stat-item">
                    <h2>Colaboradores</h2>
                    <p>{quantidadeColaboradores}</p>
                </div>
                <div className="stat-item">
                    <h2>Dependentes</h2>
                    <p>{quantidadeDependentes}</p>
                </div>
            </div>
            {/* Gráfico Opcional */}
            <div className="chart-container">
                <h2>Gráfico de Colaboradores e Dependentes</h2>
                <BarChart
                    width={600}
                    height={300}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nome" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="colaboradores" fill="#8884d8" />
                    <Bar dataKey="dependentes" fill="#82ca9d" />
                  </BarChart>
            </div>
            <button onClick={handleVerColaboradores}>Ver Colaboradores</button>
            </div>
    );
};

export default Dashboard;
