import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css'
import { NavLink } from 'react-router-dom';
import { TeamOutlined } from '@ant-design/icons'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import { MdOutlineBorderColor, MdOutlineMenuBook, MdOutlineTableBar } from 'react-icons/md';

ChartJS.register(
    ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale,
    PointElement, LineElement, RadialLinearScale
);

function Home() {
    const [mesas, setMesas] = useState(0);
    const [avaliacoes, setAvaliacoes] = useState(0);
    const [pedidosDoDia, setPedidosDoDia] = useState(0);
    const [itemsCardapio, setItemsCardapio] = useState(0);
    const [users, setUsers] = useState(0);

    useEffect(() => {
        const fetchMesas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getAllMesas');
                const data = response.data;
                setMesas(data.length);
            } catch (error) {
                console.error('Erro ao buscar as mesas:', error);
            }
        };
        
        const fetchAvaliacoes = async () => {
            try {
                const avaliacoes = await axios.get('http://localhost:3000/getAvaliacoes');
                const dataAvaliacoes = avaliacoes.data;
                setAvaliacoes(dataAvaliacoes.length);
            } catch (error) {
                console.error('Erro ao buscar as avaliações:', error);
            }
        };

        const fetchPedidosDoDia = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getAllPedidoLocal');
                const pedidos = response.data;

                const hoje = new Date();
                const dataAtual = hoje.toISOString().split('T')[0];

                const pedidosFiltrados = pedidos.filter(pedido =>
                    pedido.created_at.split('T')[0] === dataAtual
                );

                setPedidosDoDia(pedidosFiltrados.length);
            } catch (error) {
                console.error('Erro ao buscar os pedidos do dia:', error);
            }
        };

        const fetchItemsCardapio = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getItemsCardapio');
                const items = response.data;
                setItemsCardapio(items.length);
            } catch (error) {
                console.error('Erro ao buscar os itens do cardápio:', error);
            }
        };

        const fetchAllUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getAllUsers');
                const users = response.data;
                setUsers(users.length);
            } catch (error) {
                console.error('Erro ao buscar os utilizadores:', error);
            }
        };

        fetchMesas();
        fetchAvaliacoes();
        fetchPedidosDoDia();
        fetchItemsCardapio();
        fetchAllUsers();
    }, []);

    const pieData = {
        labels: ['Mesas', 'Pedidos do Dia', 'Items Cardápio', 'Utilizadores', 'Avaliações'],
        datasets: [
            {
                data: [mesas, pedidosDoDia, itemsCardapio, users, avaliacoes],
                backgroundColor: ['#cefbcc', '#CCDEFB', '#fbe7cc', '#fbf8cc', '#fbccf5'],
                borderColor: ['#388e3c', '#1976d2', '#d84315', '#ffa000', '#e770e1'],
                borderWidth: 1,
            },
        ],
    };

    const barData = {
        labels: ['Mesas', 'Pedidos do Dia', 'Items Cardápio', 'Utilizadores', 'Avaliações'],
        datasets: [
            {
                data: [mesas, pedidosDoDia, itemsCardapio, users, avaliacoes],
                backgroundColor: ['#cefbcc', '#CCDEFB', '#fbe7cc', '#fbf8cc', '#fbccf5'],
                borderColor: ['#388e3c', '#1976d2', '#d84315', '#ffa000', '#e770e1'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='back-office-main'>
            <div className='cards-back-office'>

                <NavLink to="/Back-office/pages/mesa" className="nav-card">
                    <div className='cards-pequeno-1'>
                        <MdOutlineTableBar className='icones-cards' />
                        <div className="alinhar-direita">
                            <span>Mesas</span>
                            <h2>{mesas}</h2>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/Back-office/pages/Pedido" className="nav-card">
                    <div className='cards-pequeno-2'>
                        <MdOutlineBorderColor className='icones-cards' />
                        <div className="alinhar-direita">
                            <span>Pedidos do dia</span>
                            <h2>{pedidosDoDia}</h2>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/Back-office/pages/item" className="nav-card">
                    <div className='cards-pequeno-3'>
                        <MdOutlineMenuBook className='icones-cards' />
                        <div className="alinhar-direita">
                            <span>Items cardápio</span>
                            <h2>{itemsCardapio}</h2>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/Back-office/pages/acesso" className="nav-card">
                    <div className='cards-pequeno-4'>
                        <TeamOutlined className='icones-cards' />
                        <div className="alinhar-direita">
                            <span>Utilizadores</span>
                            <h2>{users}</h2>
                        </div>
                    </div>
                </NavLink>

            </div>

            <div className='div-main-graficos'>

                <div className='grafico-barra-main'>
                    <div className='grafico-barra'>
                        <h3 className='text-center'>Gráfico de Barras</h3>
                        <Bar data={barData} />
                    </div>
                </div>

                <div className='grafico-pizza-main'>
                    <div className='grafico-pizza'>
                        <h3 className='text-center'>Gráfico de Pizza</h3>
                        <Pie data={pieData} />
                    </div>
                </div>

            </div>
        </div>

    );
}

export default Home;
