// src/Dashboard.js
import React from 'react';
import './Dashboard.css';
import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Dashboard = () => {
    const navigate = useNavigate();

  const [dependentes, setDependentes]=useState([      ])
  const [colaboradores, setColaboradores]=useState([        ])

  console.log("dashboard",colaboradores)
  const quantidadeColaboradores = colaboradores?.length;
  console.log("dependentes", dependentes)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleVerColaboradores = () => {
    navigate('/colaboradores');
  };

  useEffect(() => {
    const fetchColaboradores = async () => {
        try {
            const response = await axios.get('http://localhost:8485/dependente');
            console.log("response")
console.log(response)
console.log(response.data)
            setDependentes(response.data);
            setLoading(false);
        } catch (err) {
          console.log(err)
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
                {/* Placeholder para gráfico */}
                <div className="chart-placeholder">
                    {/* Aqui você pode integrar um gráfico como Chart.js, Recharts, ou outro */}
                    <p>Gráfico aqui</p>
                </div>
            </div>
            <button onClick={handleVerColaboradores}>Ver Colaboradores</button>
            </div>
    );
};

export default Dashboard;
