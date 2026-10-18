import './App.css'
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import Home from './Front-office/pages/Home/Home.jsx';
import AtividadeHome from './Front-office/pages/MostrarAtividadeHome/AtividadeHome.jsx';
import LoginRegisterForm from './Front-office/components/LoginRegisterForm.jsx';
import App_BackOffice from './Back-office/App_BackOffice.jsx';
{/* Back-office - Funcionario*/}
import HomeFuncionario from './Back-office/pages/funcionario/Home.jsx'
import CreateFuncionario from './Back-office/pages/funcionario/Create.jsx'
import ReadFuncionario from './Back-office/pages/funcionario/Read.jsx'
import UpdateFuncionario from './Back-office/pages/funcionario/Update.jsx'
import ReadFuncionarioByFilter from './Back-office/pages/funcionario/ReadByFilter.jsx'
{/* Back-office - Fornecedores*/}
import HomeFornecedor from './Back-office/pages/fornecedor/Home.jsx';
import CreateFornecedor from './Back-office/pages/fornecedor/Create.jsx'
import ReadFornecedor from './Back-office/pages/fornecedor/Read.jsx'
import UpdateFornecedor from './Back-office/pages/fornecedor/Update.jsx'
import ReadFornecedorByFilter from './Back-office/pages/fornecedor/ReadByFilter.jsx'
{/* Back-office - Produto*/}
import HomeProduto from './Back-office/pages/produto/Home.jsx';
import CreateProduto from './Back-office/pages/produto/Create.jsx'
import ReadProduto from './Back-office/pages/produto/Read.jsx'
import UpdateProduto from './Back-office/pages/produto/Update.jsx'
import ReadProdutoByFilter from './Back-office/pages/produto/ReadByFilter.jsx'
{/* Back-office - Estoque*/}
import HomeEstoque from './Back-office/pages/estoque/Home.jsx';
import CreateEstoque from './Back-office/pages/estoque/Create.jsx'
import ReadEstoque from './Back-office/pages/estoque/Read.jsx'
import UpdateEstoque from './Back-office/pages/estoque/Update.jsx'
import ReadEstoqueByFilter from './Back-office/pages/estoque/ReadByFilter.jsx'
import UpdateQtdEstoque from './Back-office/pages/estoque/UpdateQtdEstoque.jsx'
{/* Back-office - Atividade*/}
import HomeAtividadeCasa from './Back-office/pages/atividadeCasa/Home.jsx';
import CreateAtividadeCasa from './Back-office/pages/atividadeCasa/Create.jsx'
import ReadAtividadeCasa from './Back-office/pages/atividadeCasa/Read.jsx'
import UpdateAtividadeCasa from './Back-office/pages/atividadeCasa/Update.jsx'
{/* Back-office - Sector*/}
import HomeSector from './Back-office/pages/sector/Home.jsx';
import CreateSector from './Back-office/pages/sector/Create.jsx'
import ReadSector from './Back-office/pages/sector/Read.jsx'
import UpdateSector from './Back-office/pages/sector/Update.jsx'
{/* Back-office - Mesa*/}
import HomeMesa from './Back-office/pages/mesa/Home.jsx'
import CreateMesa from './Back-office/pages/mesa/Create.jsx'
import ReadMesa from './Back-office/pages/mesa/Read.jsx'
import UpdateMesa from './Back-office/pages/mesa/Update.jsx'
import ReadMesaByFilter from './Back-office/pages/mesa/ReadByFilter.jsx'
{/* Back-office - Acesso*/}
import HomeAcesso from './Back-office/pages/acesso/Home.jsx'
import ReadAcesso from './Back-office/pages/acesso/Read.jsx'
{/* Back-office - Servico*/}
import HomeServico from './Back-office/pages/servico/Home.jsx'
import CreateServico from './Back-office/pages/servico/Create.jsx'
import ReadServico from './Back-office/pages/servico/Read.jsx'
import UpdateServico from './Back-office/pages/servico/Update.jsx'
{/* Back-office - Item*/}
import HomeItem from './Back-office/pages/item/Home.jsx'
import CreateItem from './Back-office/pages/item/Create.jsx'
import UpdateItem from './Back-office/pages/item/Update.jsx'
import ReadItemByFilter from './Back-office/pages/item/ReadByFilter.jsx'
{/* Back-office - Atualizar Acesso Utilizador*/}
import HomeUtilizador from './Back-office/pages/utilizador/Home.jsx'
import UpdateUtilizador from './Back-office/pages/utilizador/Update.jsx'
{/* Back-office - Avaliacao*/}
import HomeAvaliacao from './Back-office/pages/avaliacao/Home.jsx'
{/* Front-office - Reserva de Mesa*/}
import ReadNotAvailableTable from './Front-office/pages/ReservaMesa/ReadNotAvailableTable.jsx'
import ReadAvailableTable from './Front-office/pages/ReservaMesa/ReadAvailableTable.jsx'
import CreateReservaMesa from './Front-office/pages/ReservaMesa/CreateReservaMesa.jsx'
{/* Front-office - Atividade casa*/}
import ReadAtividades from './Front-office/pages/AtividadeCasa/ReadAtividades.jsx'
{/* Front-office - Servicos*/}
import ReadServicos from './Front-office/pages/Servicos/ReadServicos.jsx'
{/* Front-office - Avaliacao*/}
import CreateAvaliacao from './Front-office/pages/avaliacao/CreateAvaliacao.jsx'
import ReadAvaliacao from './Front-office/pages/avaliacao/ReadAvaliacao.jsx'
{/* Front-office - Cardápio*/}
import ReadAllCardapio from './Front-office/pages/Cardapio/ReadAllCardapio.jsx'
import FilterAllCardapio from './Front-office/pages/Cardapio/FiltroAllCardapio.jsx'
{/* Front-office - Sobre*/}
import Sobre from './Front-office/pages/Sobre/Sobre.jsx'
{/* Front-office - Pedido local*/}
import HomePedido from './Front-office/pages/Pedido/Home.jsx'
import CreatePedido from './Front-office/pages/Pedido/Create.jsx'
import UpdatePedido from './Front-office/pages/Pedido/Update.jsx'
import ReadPedidoFilter from './Front-office/pages/Pedido/ReadFilter.jsx'
{/* Front-office - Carrinho*/}
import Carrinho from './Front-office/components/Cart.jsx'
{/* Back-office - change status pedido*/}
import HomePedidoBack from './Back-office/pages/pedido/Home.jsx'

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Front-office/pages/MostrarAtividadeHome" element={<AtividadeHome />}></Route>
            <Route path="/Front-office/components/LoginRegisterForm" element={<LoginRegisterForm />}></Route>
            <Route path="/Back-office/App_BackOffice" element={<App_BackOffice />}></Route>
            {/* Back-office - Funcionario*/}
            <Route path="/Back-office/pages/funcionario" element={<HomeFuncionario />}></Route>
            <Route path="/Back-office/pages/funcionario/create" element={<CreateFuncionario />}></Route>
            <Route path="/Back-office/pages/funcionario/read/:id" element={<ReadFuncionario />}></Route>
            <Route path="/Back-office/pages/funcionario/update/:id" element={<UpdateFuncionario />}></Route>
            <Route path="/Back-office/pages/funcionarioFilter" element={<ReadFuncionarioByFilter />}></Route>
            {/* Back-office - Fornecedores*/}
            <Route path="/Back-office/pages/fornecedor" element={<HomeFornecedor />}></Route>
            <Route path="/Back-office/pages/fornecedor/create" element={<CreateFornecedor />}></Route>
            <Route path="/Back-office/pages/fornecedor/read/:id" element={<ReadFornecedor />}></Route>
            <Route path="/Back-office/pages/fornecedor/update/:id" element={<UpdateFornecedor />}></Route>
            <Route path="/Back-office/pages/fornecedorFilter" element={<ReadFornecedorByFilter />}></Route>
            {/* Back-office - Produto*/}
            <Route path="/Back-office/pages/produto" element={<HomeProduto />}></Route>
            <Route path="/Back-office/pages/produto/create" element={<CreateProduto />}></Route>
            <Route path="/Back-office/pages/produto/read/:id" element={<ReadProduto />}></Route>
            <Route path="/Back-office/pages/produto/update/:id" element={<UpdateProduto />}></Route>
            <Route path="/Back-office/pages/produtoFilter" element={<ReadProdutoByFilter />}></Route>
            {/* Back-office - Estoque*/}
            <Route path="/Back-office/pages/estoque" element={<HomeEstoque />}></Route>
            <Route path="/Back-office/pages/estoque/create" element={<CreateEstoque />}></Route>
            <Route path="/Back-office/pages/estoque/read/:id" element={<ReadEstoque />}></Route>
            <Route path="/Back-office/pages/estoque/update/:id" element={<UpdateEstoque />}></Route>
            <Route path="/Back-office/pages/estoqueFilter" element={<ReadEstoqueByFilter />}></Route>
            <Route path="/Back-office/pages/updateQtdEstoque/:id" element={<UpdateQtdEstoque />}></Route>
            {/* Back-office - Atividade*/}
            <Route path="/Back-office/pages/atividade" element={<HomeAtividadeCasa />}></Route>
            <Route path="/Back-office/pages/atividade/create" element={<CreateAtividadeCasa />}></Route>
            <Route path="/Back-office/pages/atividade/read/:id" element={<ReadAtividadeCasa />}></Route>
            <Route path="/Back-office/pages/atividade/update/:id" element={<UpdateAtividadeCasa />}></Route>
            {/* Back-office - Sector*/}
            <Route path="/Back-office/pages/sector" element={<HomeSector />}></Route>
            <Route path="/Back-office/pages/sector/create" element={<CreateSector />}></Route>
            <Route path="/Back-office/pages/sector/read/:id" element={<ReadSector />}></Route>
            <Route path="/Back-office/pages/sector/update/:id" element={<UpdateSector />}></Route>
            {/* Back-office - Mesa*/}
            <Route path="/Back-office/pages/mesa" element={<HomeMesa />}></Route>
            <Route path="/Back-office/pages/mesa/create" element={<CreateMesa />}></Route>
            <Route path="/Back-office/pages/mesa/read/:id" element={<ReadMesa />}></Route>
            <Route path="/Back-office/pages/mesa/update/:id" element={<UpdateMesa />}></Route>
            <Route path="/Back-office/pages/mesaFilter" element={<ReadMesaByFilter />}></Route>
            
            {/* Back-office - Acesso*/}
            <Route path="/Back-office/pages/acesso" element={<HomeAcesso />}></Route>
            <Route path="/Back-office/pages/acesso/read/:id" element={<ReadAcesso />}></Route>
            {/* Back-office - Servico*/}
            <Route path="/Back-office/pages/servico" element={<HomeServico />}></Route>
            <Route path="/Back-office/pages/servico/create" element={<CreateServico />}></Route>
            <Route path="/Back-office/pages/servico/read/:id" element={<ReadServico />}></Route>
            <Route path="/Back-office/pages/servico/update/:id" element={<UpdateServico />}></Route>
            {/* Back-office - Item*/}
            <Route path="/Back-office/pages/item" element={<HomeItem />}></Route>
            <Route path="/Back-office/pages/item/create" element={<CreateItem />}></Route>
            <Route path="/Back-office/pages/item/update/:id" element={<UpdateItem />}></Route>
            <Route path="/Back-office/pages/item/itemFilter" element={<ReadItemByFilter />}></Route>
            {/* Back-office - Atualizar Acesso Utilizador*/}
            <Route path="/Back-office/pages/utilizador" element={<HomeUtilizador />}></Route>
            <Route path="/Back-office/pages/utilizador/update/:id" element={<UpdateUtilizador />}></Route>
            {/* Back-office - Avaliacao*/}
            <Route path="/Back-office/pages/avaliacao" element={<HomeAvaliacao />}></Route>
            {/* Front-office - Reserva de Mesa*/}
            <Route path="/Front-office/pages/mesaReservada" element={<ReadNotAvailableTable />}></Route>
            <Route path="/Front-office/pages/mesaDisponivel" element={<ReadAvailableTable />}></Route>
            <Route path="/Front-office/pages/reservaMesa" element={<CreateReservaMesa />}></Route>
            {/* Front-office - Atividade casa*/}
            <Route path="/Front-office/pages/AtividadeCasa" element={<ReadAtividades />}></Route>
            {/* Front-office - Servicos*/}
            <Route path="/Front-office/pages/Servicos" element={<ReadServicos />}></Route>
            {/* Front-office - Avaliacao*/}
            <Route path="/Front-office/pages/pages/avaliacao/create" element={<CreateAvaliacao />}></Route>
            <Route path="/Front-office/pages/pages/avaliacao/read" element={<ReadAvaliacao />}></Route>
            {/* Front-office - Cardápio*/}
            <Route path="/Front-office/pages/CardapioItems" element={<ReadAllCardapio />}></Route>
            <Route path="/Front-office/pages/FilterCardapioItems" element={<FilterAllCardapio />}></Route>
            {/* Front-office - Sobre*/}
            <Route path="/Front-office/pages/Sobre" element={<Sobre />}></Route>
            {/* Front-office - Pedido*/}
            <Route path="/Front-office/pages/Pedido" element={<HomePedido />}></Route>
            <Route path="/Front-office/pages/Pedido/Create" element={<CreatePedido />}></Route>
            <Route path="/Front-office/pages/Pedido/Update/:id" element={<UpdatePedido />}></Route>
            <Route path="/Front-office/pages/PedidoFilter" element={<ReadPedidoFilter />}></Route>
            {/* Front-office - Carrinho*/}
            <Route path="/Front-office/carrinho" element={<Carrinho />}></Route>
            {/* Back-office - change status pedido local*/}
            <Route path="/Back-office/pages/Pedido" element={<HomePedidoBack />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App;