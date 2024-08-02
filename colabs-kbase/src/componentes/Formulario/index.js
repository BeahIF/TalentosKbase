import { useState } from 'react'
import Botao from '../Botao'
import CampoTexto from '../CampoTexto/CampoTexto'
import './Formulario.css'

const Formulario = (props) =>{
  const [nome, setNome]=useState('')
  const [email, setEmail]=useState('')
const [usuario, setUsuario]=useState('')
const [cpf, setCPF]=useState('')
const [data_nascimento, setNascimento]=useState('')
const [data_admissao, setAdmissao]=useState('')

    const aoSalvar = (evento) =>{
      evento.preventDefault()
      console.log('Form foi submetido', nome, email, usuario,cpf, data_nascimento,data_admissao)
      props.aoColaboradorCadastrado({
        nome,
        email,
        usuario,
        cpf,data_nascimento,data_admissao,
        
    })
    setNome('')
    setEmail('')
    setUsuario('')
    setCPF('')
    setNascimento('')
    setAdmissao('')

    }
    return (
        <section className='formulario'>
        <form onSubmit={aoSalvar}>
        <h2>Preencha os dados do novo colaborador     </h2>
      <CampoTexto obrigatorio={true} label="Nome" placeholder="Digite o nome" 
      valor={nome} aoAlterado={valor=>setNome(valor)}/>
      <CampoTexto obrigatorio={true} label="Email" placeholder="Digite o email"
      valor={email} aoAlterado={valor=>setEmail(valor)}/>
      <CampoTexto obrigatorio={true} label="Usuário" placeholder="Digite o nome de usuário"
      valor={usuario} aoAlterado={valor=>setUsuario(valor)}/>
      <CampoTexto obrigatorio={true} label="CPF" placeholder="Digite o cpf"
      valor={cpf} aoAlterado={valor=>setCPF(valor)}/>
      <CampoTexto obrigatorio={true} label="Data Nascimento" placeholder="Digite sua data de nascimento" tipo="date"
      valor={data_nascimento} aoAlterado={valor=>setNascimento(valor)}/>
      <CampoTexto obrigatorio={true} label="Data Admissão" placeholder="Digite a data de admissão" tipo="date"
      valor={data_admissao} aoAlterado={valor=>setAdmissao(valor)}/>
      
      <Botao texto="Criar colaborador!"/>
      </form></section>
    )
}
export default Formulario