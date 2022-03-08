import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { BordaCampo, Container, ModelLogin } from "./styles";

export const Login = () => {
    const auth = useContext(AuthContext);
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () =>{
        if(cpf && password){
            const isLogged = await auth.signin(cpf, password);
            console.log(isLogged);
            if(isLogged){
                return <Link to="/"></Link>;
            } else{
                alert('Senha ou E-mail errado!!!');
            }
        }
    }

    return(
        <Container>
        <div className="layout-main-container">
            <div className="layout-main">
                <div className="col-12 md:col-6">
                    <ModelLogin>
                        <div className="card p-fluid">
                            <div className="field grid">
                                <label htmlFor="cpf-cnpj" className="col-12 mb-2 md:col-2 md:mb-0">CPF/CNPJ</label>
                                <div className="col-12 md:col-10">
                                    <BordaCampo />
                                    <InputText
                                        id="cpf-cnpj"
                                        type="text"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)} />
                                </div>
                            </div>
                            <div className="field grid">
                                <BordaCampo />
                                <label htmlFor="pass" className="col-12 mb-2 md:col-2 md:mb-0">Senha</label>
                                <div className="col-12 md:col-10">
                                    <BordaCampo />
                                    <InputText
                                        id="pass"
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        
                                    />
                                </div>
                            </div>
                                <BordaCampo />
                                <Button
                                    label="Logar"
                                    className="mr-2 mb-2"
                                    onClick={handleLogin}>
                                </Button>
                        </div>
                    </ModelLogin>
                </div>
            </div>
        </div>
        </Container>

        // <Container>
        // <div className="grid">
        //     <h2>Realizar Login</h2>

        //     <div className="mb-3">
        //         <InputText
        //             className="form-control"
        //             type="text"
        //             value={cpf}
        //             onChange={e => setCpf(e.target.value)}
        //             placeholder=" Digite seu Acesso !!!"
        //         />
        //     </div>
        //     <div className="mb-3">
        //         <InputText
        //             className="form-control"
        //             type="password"
        //             value={password}
        //             onChange={e => setPassword(e.target.value)}
        //             placeholder="Digite sua Senha"
        //         />
        //     </div>
        //     <div className="field col">
        //         <InputText
        //         className="form-check-input"
        //         type="checkbox"
        //         id="exampleCheck1"
        //         />
        //         <label className="form-check-label" >Aceita termos de Utilização</label>
        //     </div>
        //     <button className="btn btn-primary" onClick={handleLogin}>Logar</button>
        //     </div>
        // </Container>
    );
}