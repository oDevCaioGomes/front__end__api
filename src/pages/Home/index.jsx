import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../../assets/trash.png";
import api from "../../services/api";

// Componente Home responsável por exibir e gerenciar usuários
function Home() {
  // Estado para armazenar a lista de usuários
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  // Função assíncrona para buscar os usuários na API
  async function getUsers() {
    // Fazendo a requisição GET para buscar os usuários da API
    const usersFromApi = await api.get("/usuarios");

    // Aqui há um erro, pois estamos tentando modificar diretamente o estado `users`, que deve ser feito através de `setUsers`
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post("https://api-cadastro-usuario-74h8.onrender.com/usuarios", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });
    getUsers();
  }

  async function deletetUsers(id) {
    await api.delete(`https://api-cadastro-usuario-74h8.onrender.com/usuarios/${id}`);
    getUsers();
  }

  // Hook useEffect para carregar os usuários quando o componente for montado
  useEffect(() => {
    getUsers(); // Chama a função para pegar os usuários
  }, []);

  return (
    <div className="container">
      {/* Formulário de cadastro de usuário */}
      <form>
        <h1>User Registration</h1>
        <input placeholder="Name" name="name" type="text" ref={inputName} />
        <input placeholder="Age" name="age" type="number" ref={inputAge} />
        <input
          placeholder="E-mail"
          name="email"
          type="email"
          ref={inputEmail}
        />
        <button type="button" onClick={createUsers}>
          Register
        </button>
      </form>

      {/* Mapeando a lista de usuários e renderizando um card para cada um */}
      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Name: <span>{user.name}</span>
            </p>
            <p>
              Age: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          {/* Botão para excluir o usuário (a funcionalidade de exclusão não foi implementada) */}
          <button onClick={() => deletetUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
