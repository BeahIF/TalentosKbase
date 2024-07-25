// src/Dashboard.js
import React from 'react';
import './Dashboard.css';

const Dashboard = ({ colaboradores }) => {
    const quantidadeColaboradores = colaboradores.length;
    const quantidadeDependentes = colaboradores.reduce((total, colaborador) => total + colaborador.dependentes.length, 0);

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
        </div>
    );
};

export default Dashboard;
