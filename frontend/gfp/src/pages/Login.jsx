import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enderecoServidor } from "../utils";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  const [lembrar, setLembrar] = useState(false);

  async function botaoEntrar(e) {
    e.preventDefault();
    try {
      if (!email || !senha) {
        setMensagem("⚠️ Preencha todos os campos.");
        return;
      }

      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email, senha: senha }),
      });

      const dados = await resposta.json();
      if (resposta.ok) {
        localStorage.setItem(
          "UsuarioLogado",
          JSON.stringify({...dados, lembrar})
        );
        navigate("Principal");
      } else {
        setMensagem("❌ Email ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMensagem("❌ Erro de conexão. Tente novamente.");
    }
  }

  function botaoLimpar() {
    setEmail("");
    setSenha("");
    setMensagem("");
  }
  useEffect(() => {
    const buscarUsuarioLogado = async () => {
      const usuarioLogado = localStorage.getItem("usuarioLogado");
      if (usuarioLogado) {
        const usuario = JSON.parse(usuarioLogado);
        if (usuario.lenbrar == true) {
          navigate("MenuDrawer");
        }
      }
    };

    buscarUsuarioLogado();
  }, []);

  return (
    <div className="login-background">
      <div className="login-card">
        <div className="login-header">
          <h1>Gestor Financeiro</h1>
          <p>Acesse sua conta para continuar</p>
        </div>

        <form className="login-form" onSubmit={botaoEntrar}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {mensagem && <p className="mensagem">{mensagem}</p>}

          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
              />
              <label>Lembrar de mim</label>

              <a href="/recuperar-senha" className="esqueci-senha">
                Esqueci minha senha
              </a>
            </div>
          </div>

          <button type="submit" onClick={botaoEntrar} className="btn-primary">
            Entrar
          </button>
          <button type="button" onClick={botaoLimpar} className="btn-secondary">
            Limpar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
