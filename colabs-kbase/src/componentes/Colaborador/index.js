import './Colaborador.css'

const Colaborador = ({nome, email, usuario,dependentes, onEdit,onViewDependentes }) =>{
    return (<div className='colaborador'>
    <div className='cabecalho'>
   </div>
    <div className='rodape'><h4>{nome}</h4><h5>{email}</h5>
    <button 
    className='edit-button' 
    onClick={onEdit}>
    Editar
</button>
<button className='view-dependentes-button' onClick={onViewDependentes}>Ver Dependentes</button>
</div></div>
)}

export default Colaborador