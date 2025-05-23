import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Principal() {
    const [usuario, setUsuario] = useState({});
    const navigate = useNavigate(); // Correção aqui

    useEffect(() => {
        const buscarUsuarioLogado = async () => {
            const usuarioLogado = await localStorage.getItem('usuarioLogado');
            if (usuarioLogado) {
                setUsuario(JSON.parse(usuarioLogado));
            } else {
                navigate('/'); // Correção aqui
            }
        };
        buscarUsuarioLogado();
    }, [navigate]);

    const botaoLogout = async () => {
        try {
            await localStorage.removeItem('usuarioLogado');
            navigate('/'); // Correção aqui
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <p>Usuário: {usuario?.nome || 'Desconhecido'}</p>
                <button onClick={botaoLogout}>Sair</button>
            </div>
            <div>
                <h1>Tela Principal</h1>
            </div>
        </div>
    );
}
