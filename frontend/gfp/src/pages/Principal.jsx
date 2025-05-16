import Login from "./Login";
import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
export default function Principal() {
    const [usuario, setUsuario] = useState({});

    useEffect (() => {
        const buscarUsuarioLogado = async () => {
            const usuarioLogado = await localStorage.getItem('usuarioLogado');
            if (usuarioLogado) {
                setUsuario(JSON.parse(usuarioLogado));
            } else {
                navigation.navigate('/');
            }
            
        }
        buscarUsuarioLogado();
    }, []);
        const  botaoLogout = async () => {
            try {
                await localStorage.removeItem('usuarioLogado');
            navigate('/');
            } catch (error) {
                console.error('Erro ao fazer logout:', error);
            }
            
        }


    return (
        <div>
            <h1>Tela Principal</h1>
        </div>
    );
}