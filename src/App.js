import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function initData() {
    const response = await api.get('/repositories');
    if (response.data) {
      setRepositories(response.data)
    }
  }

  useEffect(() => {
    initData()
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      "url": "https://github.com/kellvembarbosa/gostack-conceitos-reactjs",
      "title": "Kellvem Barbosa - " + new Date().getTime(),
      "techs": ["ReactJS", "Node", "Express", "TypeScript"]
    })
    if(response.status === 200) {
      setRepositories([...repositories, response.data])
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)

    if(response.status === 204) {
      const repositoryIndex = repositories.findIndex((repository) => repository.id === id)
      repositories.splice(repositoryIndex, 1)
      setRepositories([...repositories,])
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repo => (
          <li key={repo.id}>
            { repo.title }

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
