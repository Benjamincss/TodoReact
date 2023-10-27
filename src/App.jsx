import React, { useState } from 'react';

function App() {
    const [Email, SetEmail] = useState('');
    const [Name, SetName] = useState('');
    const [ListClients, SetListClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

    const ajouterClient = () => {
        if (!isValidName(Name) || !Email) {
            alert("Le nom et l'email doivent être saisis correctement");
            return;
        }

        if (selectedClient) {

            SetListClients((prevClients) => {
                const updatedClients = prevClients.map((client) =>
                    client.id === selectedClient.id ? { ...client, Name: Name, Email: Email } : client
                );
                return updatedClients;
            });
            setSelectedClient(null);
        } else {

            SetListClients([...ListClients, { id: Date.now(), Name: Name, Email: Email }]);
        }

        SetName('');
        SetEmail('');
    };

    const supprimerClient = (id) => {
        SetListClients(ListClients.filter((client) => client.id !== id));
    };

    const modifierClient = (client) => {
        SetName(client.Name);
        SetEmail(client.Email);
        setSelectedClient(client);
    };

    return (
        <div className="App">
            <h1>   Clients Pricing </h1>
            <div>
                <input
                    type="text"
                    placeholder="Nom"
                    value={Name}
                    onChange={(e) => SetName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Pricing"
                    value={Email}
                    onChange={(e) => SetEmail(e.target.value)}
                />
                <button onClick={ajouterClient}>{selectedClient ? 'Mettre à jour' : 'Ajouter Client'}</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Pricing</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {ListClients.map((client) => (
                    <tr key={client.id}>
                        <td>{client.Name}</td>
                        <td>{client.Email}</td>
                        <td>
                            <button onClick={() => modifierClient(client)}>Modifier</button>
                            <button onClick={() => supprimerClient(client.id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;

function isValidName(name) {
    const nameRegex = /^[A-Z][a-z]+$/;
    return nameRegex.test(name);
}


