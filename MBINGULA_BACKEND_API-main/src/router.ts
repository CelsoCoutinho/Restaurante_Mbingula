import { Router } from "express";
import { getAllAccessess, getAccessById, createAccess } from "./controller/AccessController";
import { createUser, deleteManyUser, deleteUser, getAllUser, getUser, getUserByName, getUserIsLogged, updateUser, updateUserAccess, updateUserIsLogged } from "./controller/UserController";
import { signIn } from "./controller/SessionController";
import { authMiddleware } from "./middleware/AuthMiddleware";
import { createSector, deleteSector, getAllSectores, getSector, updateSector } from "./controller/SectorController";
import { createFuncionario, deleteFuncionario, deleteManyFuncionario, getAllFuncionarios, getFuncionario, getFuncionarioByName, getFuncionarioByPhone, getFuncionarioByBI, updateFuncionario } from "./controller/FuncionarioController";
import { createItemCardapio, deleteItemCardapio, getItemByAvailable, getItemByCategoria, getItemById, getItemCardapio, getItemCardapioByPriceInterval, updateItemCardapio } from "./controller/ItemCardapioController";
import { createAvaliacao, deleteAllAvaliacao, deleteAvaliacao, getAllAvaliacao, updateAvaliacao } from "./controller/AvaliacaoController";
import { createServico, deleteAllServico, deleteServico, getAllServico, getServicoById, updateServico } from "./controller/ServicoRestauranteController";
import { createFornecedor, deleteFornecedor, getAllFornecedor, getFornecedor, getFornecedorByName, getFornecedorByTelefone, updateFornecedor } from "./controller/FornecedorController";
import { createProduto, deleteProduto, getAllProdutos, getProduto, getProdutoByName, updateProduto } from "./controller/ProdutoController";
import { createEstoque, deleteEstoque, getAllEstoques, getEstoque, getEstoqueByProdutoName, updateEstoque } from "./controller/EstoqueController";
import { createMesa, deleteMesa, getAllMesas, getMesaById, getMesaByLugares, getMesaByNumero, updateMesa } from "./controller/MesaController";
import { createAtividadeCasa, deleteAtividadeCasa, getAllAtividadesCasa, updateAtividadeCasa, getAtividadeCasa } from "./controller/AtividadecasaController";
import { createReservaMesa, getAllMesasDisponiveis, getAllMesasJaReservadas, makeMesaAvailable } from "./controller/ReservaMesaController";

import uploadConfigs from './config/multer'
import multer from "multer";
import { createPedidoLocal, deletePedidoLocal, getAllPedidoLocal, getPedidoLocalByUserName, getPedidoLocalById, getPedidoLocalByUserPhone, updatePedidoLocal, updateStatusPedidoLocal, deleteAllPedidosByStatus } from "./controller/PedidoLocal";
const upload = multer(uploadConfigs);

export const router = Router();

//Utilizador
router.post("/user", createUser);
router.delete("/delete-users", deleteManyUser);
router.delete("/delete-user/:id", deleteUser);
router.get("/getAllUsers", getAllUser);
router.get("/getLoginUser", authMiddleware(["adm", "normal"]), getUserIsLogged);
router.get("/get-user/:id", getUser);
router.get("/getUserByName/:name", getUserByName);
router.put("/update-user/:id", updateUser);
router.put("/update-userAccess/:id", updateUserAccess);
router.put("/update-user", authMiddleware(["adm", "normal"]), updateUserIsLogged);

//Acesso - roles
router.get("/accessess", getAllAccessess);
router.get("/accessById/:id", getAccessById);
router.post("/createAccess", createAccess);


//Login
router.post("/sign-in", signIn);

//Sector
router.post("/create-sector", createSector);
router.get("/sectores", getAllSectores);
router.get("/sectorById/:id", getSector);
router.delete("/delete-sector/:id", deleteSector);
router.put("/update-sector/:id", updateSector);

//Funcionario
router.post("/create-funcionario", createFuncionario);
router.delete("/delete-funcionario/:id", deleteFuncionario);
router.delete("/delete-funcionarios", deleteManyFuncionario);
router.get("/getAllFuncionarios", getAllFuncionarios);
router.get("/get-funcionario/:id", getFuncionario);
router.get("/getFuncionarioByName/:name", getFuncionarioByName);
router.get("/getFuncionarioByPhone/:telefone", getFuncionarioByPhone);
router.get("/getFuncionarioByBI/:bilheteidentidade", getFuncionarioByBI);
router.put("/update-funcionario/:id", updateFuncionario);

//Item Cardapio
router.post("/create-ItemCardapio", upload.array("Image"), createItemCardapio);
router.get("/getItemsCardapio", getItemCardapio);
router.get("/getItemByAvailable/:disponivel", getItemByAvailable);
router.get("/getItemById/:id", getItemById);
router.get("/getItemByCategoria/:categoria", getItemByCategoria);
router.get("/getItemsCardapioByInterval/:price_min/:price_max", getItemCardapioByPriceInterval);
router.delete("/delete-itemCardapio/:id", deleteItemCardapio);
router.put("/update-itemCardapio/:id", updateItemCardapio);

//Avaliacao
router.post("/create-avaliacao", createAvaliacao);
router.get("/getAvaliacoes", getAllAvaliacao);
router.delete("/delete-avaliacao/:id", deleteAvaliacao);
router.delete("/deleteAllAvaliacao", deleteAllAvaliacao);
router.put("/update-avaliacao/:id", updateAvaliacao);

//servico restaurante
router.post("/create-servico", createServico);
router.get("/getServico", getAllServico);
router.get("/getServicoById/:id", getServicoById);
router.delete("/delete-servico/:id", deleteServico);
router.delete("/deleteAllservico", deleteAllServico);
router.put("/update-servico/:id", updateServico);

//fornecedor
router.post("/create-fornecedor", createFornecedor);
router.get("/getFornecedor/:id", getFornecedor);
router.get("/getAllFornecedor", getAllFornecedor);
router.get("/getFornecedorByName/:nome", getFornecedorByName);
router.get("/getFornecedorByPhone/:telefone", getFornecedorByTelefone);
router.delete("/delete-fornecedor/:id", deleteFornecedor);
router.put("/update-fornecedor/:id", updateFornecedor);

//Produto
router.post("/create-produto", createProduto);
router.get("/getProduto/:id", getProduto);
router.get("/getAllProduto", getAllProdutos);
router.get("/getProdutoByName/:nome", getProdutoByName);
router.delete("/delete-produto/:id", deleteProduto);
router.put("/update-produto/:id", updateProduto);

//Estoque
router.post("/create-estoque", createEstoque);
router.get("/getAllEstoques", getAllEstoques);
router.get("/getEstoque/:id", getEstoque);
router.get("/getEstoqueByProdutoName/:nome", getEstoqueByProdutoName);
router.delete("/delete-estoque/:id", deleteEstoque);
router.put("/update-estoque/:id", updateEstoque);

//Mesa
router.post("/create-mesa", createMesa);
router.get("/getAllMesas", getAllMesas);
router.get("/getMesaByNumero/:numero", getMesaByNumero);
router.get("/getMesaByLugares/:lugares", getMesaByLugares);
router.get("/getMesaById/:id", getMesaById);
router.delete("/delete-mesa/:id", deleteMesa);
router.put("/update-mesa/:id", updateMesa);

//Atividades de casa
router.post("/create-atividade", createAtividadeCasa);
router.get("/getAllAtividades", getAllAtividadesCasa);
router.get("/getAtividadeById/:id", getAtividadeCasa);
router.delete("/delete-atividade/:id", deleteAtividadeCasa);
router.put("/update-atividade/:id", updateAtividadeCasa);

//Reservar Mesa
router.patch("/create-reserva/:numero", createReservaMesa);
router.get("/getAllAvailableTable", getAllMesasDisponiveis);
router.get("/getAllNotAvailableTable", getAllMesasJaReservadas);
router.patch("/makeMesaAvailable-mesa/:id", makeMesaAvailable);

//Pedido Local
router.post("/create-pedidoLocal", createPedidoLocal);
router.get("/getAllPedidoLocal", getAllPedidoLocal);
router.get("/getPedidoLocalByUserName/:nome", getPedidoLocalByUserName);
router.get("/getPedidoLocalByUserPhone/:telefone", getPedidoLocalByUserPhone);
router.get("/getPedidoLocalById/:id", getPedidoLocalById);
router.put("/updatePedidoLocal/:id", updatePedidoLocal);
router.patch("/updateStatusPedidoLocal/:id", updateStatusPedidoLocal);
router.delete("/deletePedidoLocal/:id", deletePedidoLocal);
router.delete("/deleteAllPedidosByStatus/:status", deleteAllPedidosByStatus);