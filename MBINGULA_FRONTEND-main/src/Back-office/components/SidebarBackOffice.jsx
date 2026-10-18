import './sidebarBackOffice.css'
import { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom';
import {
    MdOutlineBorderColor,
    MdOutlineFeedback,
    MdOutlineLocalActivity,
    MdOutlineMenuBook,
    MdOutlineTableBar
} from "react-icons/md";
import {
    AppstoreAddOutlined,
    HomeOutlined,
    BarsOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    TeamOutlined,
    LogoutOutlined,
    KeyOutlined,
    LockOutlined,
    UserAddOutlined,
    TruckOutlined,
    UsergroupAddOutlined,
    ProductOutlined,
    InboxOutlined
} from '@ant-design/icons'
import { Button, Layout, theme } from 'antd'

const { Header, Sider } = Layout

const SidebarBackOffice = () => {
    const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
    const { token: { colorBgContainer } } = theme.useToken();
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setCollapsed(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        {
            key: "/Back-office/App_BackOffice",
            icon: <HomeOutlined />,
            label: <NavLink to="/Back-office/App_BackOffice">Dashboard</NavLink>
        },
        {
            key: "Subtasks-1",
            icon: <TeamOutlined />,
            label: "Funcionários",
            children: [
                {
                    key: "/Back-office/pages/funcionario",
                    icon: <UserAddOutlined />,
                    label: <NavLink to="/Back-office/pages/funcionario">Cadastrar Funcionários</NavLink>
                },
                {
                    key: "/Back-office/pages/acesso",
                    icon: <LockOutlined />,
                    label: <NavLink to="/Back-office/pages/acesso">Privilégios de acesso</NavLink>
                },
                {
                    key: "/Back-office/pages/utilizador",
                    icon: <KeyOutlined />,
                    label: <NavLink to="/Back-office/pages/utilizador">Alterar acesso para utilizador</NavLink>
                }
            ]
        },
        {
            key: "Subtasks-2",
            icon: <TruckOutlined />,
            label: "Fornecedores",
            children: [
                {
                    key: "/Back-office/pages/fornecedor",
                    icon: <UsergroupAddOutlined />,
                    label: <NavLink to="/Back-office/pages/fornecedor">Cadastrar Fornecedores</NavLink>
                },
                {
                    key: "/Back-office/pages/produto",
                    icon: <ProductOutlined />,
                    label: <NavLink to="/Back-office/pages/produto">Produto e fornecedor</NavLink>
                },
                {
                    key: "/Back-office/pages/estoque",
                    icon: <InboxOutlined />,
                    label: <NavLink to="/Back-office/pages/estoque">Estoque</NavLink>
                }
            ]
        },
        {
            key: "Subtasks-3",
            icon: <BarsOutlined />,
            label: "Serviços",
            children: [
                {
                    key: "/Back-office/pages/servico",
                    icon: <AppstoreAddOutlined />,
                    label: <NavLink to="/Back-office/pages/servico">Serviços prestados</NavLink>
                },
                {
                    key: "/Back-office/pages/atividade",
                    icon: <MdOutlineLocalActivity />,
                    label: <NavLink to="/Back-office/pages/atividade">Atividades da casa</NavLink>
                },     
                {
                    key: "/Back-office/pages/mesa",
                    icon: <MdOutlineTableBar />,
                    label: <NavLink to="/Back-office/pages/mesa">Mesas</NavLink>
                },
                {
                    key: "/Back-office/pages/sector",
                    icon: <AppstoreAddOutlined />,
                    label: <NavLink to="/Back-office/pages/sector">Setor</NavLink>
                }
            ]
        },
        {
            key: "/Back-office/pages/Pedido",
            icon: <MdOutlineBorderColor />,
            label: <NavLink to="/Back-office/pages/Pedido">Pedidos</NavLink>
        },
        {
            key: "/Back-office/pages/item",
            icon: <MdOutlineMenuBook />,
            label: <NavLink to="/Back-office/pages/item">Itens do cardápio</NavLink>
        },
        {
            key: "/Back-office/pages/avaliacao",
            icon: <MdOutlineFeedback />,
            label: <NavLink to="/Back-office/pages/avaliacao">Avaliações</NavLink>
        },
        {
            key: "/",
            icon: <LogoutOutlined style={{ color: 'red' }} />,
            label: <NavLink to="/" style={{ color: 'red' }}>Sair</NavLink>
        }
    ];

    return (
        <Layout>
            {!collapsed && <div className="overlay active" onClick={() => setCollapsed(true)}></div>}

            <Sider
                className={`sidebar ${collapsed ? 'ocultar-sidebar' : ''}`}
                collapsed={collapsed}
                collapsible
                trigger={null}
            >
                <div className='logo'>
                    <div className="logo-icon">
                        <h1>M</h1>
                    </div>
                </div>

                <Menu
                    theme='dark'
                    mode='inline'
                    className='menu-bar'
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                />
            </Sider>

            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type='text'
                        className='toggle'
                        onClick={() => setCollapsed(!collapsed)}
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    />
                </Header>
            </Layout>
        </Layout>
    )
}

export default SidebarBackOffice;
