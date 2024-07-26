import Colaborador from '../Colaborador'
import './Time.css'
const Time = (props) =>{
    const css={backgroundColor:props.corSecundaria}

    const handleViewDependentes = (colaborador) => {
        if (props.onViewDependentes) {
            props.onViewDependentes(colaborador);
        }
    };
    return (
        (props.colaboradores.length > 0)?       
          <section className='time' style={css}>
            <h3 style={{ borderColor: props.corPrimaria }}>{props.nome}</h3>
            <div className='colaboradores'>
            {props.colaboradores.map(colaborador =>
                <div key={colaborador.nome} className='colaborador-container'>
                
                <Colaborador corDeFundo={props.corPrimaria} key={colaborador.nome}
                 nome={colaborador.nome} email={colaborador.email}
                usuario={colaborador.usuario}                               dependentes={colaborador.dependentes}
                onEdit={() => props.onEdit(colaborador)} 
                onViewDependentes={() => handleViewDependentes(colaborador)}
                onDelete={() => props.onDelete(colaborador.id)}

                />
             </div> )}
                </div>
            </section>:""
    )
}
export default Time