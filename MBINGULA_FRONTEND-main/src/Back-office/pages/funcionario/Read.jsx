import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Read.css';

function Read() {
    const [data, setData] = useState({});
    const [sector, setSector] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/get-funcionario/${id}`)
            .then(res => {
                setData(res.data);
                if (res.data.Sector && res.data.Sector.name) {
                    axios.get(`http://localhost:3000/sectores`)
                        .then(sectorRes => {
                            const sectorData = sectorRes.data.find(sector => sector.name === res.data.Sector.name);
                            setSector(sectorData);
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className='read-container'>
            <div className="read-content">
                <h3 className="read-title">Dados do funcionário</h3>
                <div className="read-field">
                    <strong className="orange-text">ID: </strong> {data.id}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Nome: </strong> {data.name}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Morada: </strong> {data.morada}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Bilhete Identidade: </strong> {data.bilheteidentidade}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Telefone: </strong> {data.telefone}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Cargo: </strong> {data.cargo}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Salário: </strong> {data.salario}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Sector: </strong> {sector ? sector.name : 'Loading...'}
                </div>
                <div className="read-button-container">
                    <Link to="/Back-office/pages/funcionario" className='read-button'>Voltar</Link>
                </div>
            </div>
        </div>
    );
}

export default Read;
