import app from '../server';
import request from 'supertest';


describe("Backend Mbingula - Testes Unitarios e de Integração", () => {

    async function clearUserDataTest(id: String){
        const response = await request(app).delete(`/delete-user/${id}`);
    }

    async function clearAccessDataTest(id: String){
        const response = await request(app).delete(`/delete-access/${id}`);
    }

    async function clearSectorDataTest(id: String){
        const response = await request(app).delete(`/delete-sector/${id}`);
    }

    async function clearItemCardapioDataTest(id: String){
        const response = await request(app).delete(`/delete-itemCardapio/${id}`);
    }

    async function clearFornecedorDataTest(id: String){
        const response = await request(app).delete(`/delete-fornecedor/${id}`);
    }

    async function clearAvaliacaoDataTest(id: String){
        const response = await request(app).delete(`/delete-avaliacao/${id}`);
    }

    async function clearFuncionarioDataTest(id: String){
        const response = await request(app).delete(`/delete-funcionario/${id}`);
    }

    async function clearProdutoDataTest(id: String){
        const response = await request(app).delete(`/delete-produto/${id}`);
    }

    async function clearEstoqueDataTest(id: String){
        const response = await request(app).delete(`/delete-estoque/${id}`);
    }

    async function clearMesaDataTest(id: String){
        const response = await request(app).delete(`/delete-mesa/${id}`);
    }

    async function clearAtividadeCasaDataTest(id: String){
        const response = await request(app).delete(`/delete-atividade/${id}`);
    }

    describe("Teste de integração - de login", () => {
        test("Login com usuário e senha corretos - com sucesso", async () => {
            const response = await request(app).post("/sign-in").send({
                phone: "942583628",
                password: "00012345"
            });
            expect(response.statusCode).toBe(200);
        });
    
        test("Login com usuário senha incorreta - sem sucesso", async () => {
            const response = await request(app).post("/sign-in").send({
                phone: "942583628",
                password: "000123"
            });
            expect(response.statusCode).toBe(400);
            expect(await response.body.message).toBe("Senha incorreta")
        });
    
        test("Login com usuário incorretos - sem sucesso", async () => {
            const response = await request(app).post("/sign-in").send({
                phone: "90000",
                password: "00012345"
            });
            expect(response.statusCode).toBe(400);
            expect(await response.body.message).toBe("Este usuário não existe, verifique se o número de telefone está correcto!")
        });
    });

    describe("Teste de integração e End-to-End -  de um usuário", () => {
        test("Criar um usuário - com sucesso", async () => {
            const response = await request(app).post("/user").send({
                name: "Teste aplicação",
                email: "teste@gmail.com",
                phone: "900000000",
                password: "1234",
                accessName: "normal",
            });
            expect(response.statusCode).toBe(200);
            await clearUserDataTest(await response.body.id);
        });

        test("Deletar um usuário - com sucesso", async () => {
            const responseCreate = await request(app).post("/user").send({
                name: "Teste aplicação",
                email: "teste@gmail.com",
                phone: "900000000",
                password: "1234",
                accessName: "normal",
            });
            const saveId = await responseCreate.body.id;

            const response = await request(app).delete(`/delete-user/${saveId}`);
            expect(response.statusCode).toBe(200);
            expect(await response.body.message).toBe("Usuário deletado");
        });

        test("Listar um usuário pelo id - com sucesso", async () => {
            const responseCreate = await request(app).post("/user").send({
                name: "Teste aplicação",
                email: "teste@gmail.com",
                phone: "900000000",
                password: "1234",
                accessName: "normal",
            });
            const saveId = await responseCreate.body.id;

            const response = await request(app).get(`/get-user/${saveId}`);
            expect(response.statusCode).toBe(200);
            await clearUserDataTest(saveId);
        });

        test("Atualizar um usuário - com sucesso", async () => {
            const responseCreate = await request(app).post("/user").send({
                name: "Teste aplicação",
                email: "teste@gmail.com",
                phone: "900000000",
                password: "1234",
                accessName: "normal",
            });
            const saveId = await responseCreate.body.id;

            const response = await request(app).put(`/update-user/${saveId}`).send({
                name: "CLAV",
                email: "bingula@gmail.com",
                phone: "900000000",
                password: "1234",
                accessName: "normal",
            });
            expect(response.statusCode).toBe(200);
            expect(await response.body.message).toBe("Usuário Atualizado")
            await clearUserDataTest(saveId);
        });
    });

    describe("Teste de integração e End-to-End - sector", () => {
        test("Criar um sector - com sucesso", async () => {
            const response = await request(app).post("/create-sector").send({
                name: "Teste aplicação",
                descricao: "teste@gmail.com"
            });
            expect(response.statusCode).toBe(200);
            await clearSectorDataTest(await response.body.id);
        });

        test("Deletar um sector - com sucesso", async () => {
            const responseCreate = await request(app).post("/create-sector").send({
                name: "Teste aplicação",
                descricao: "teste@gmail.com"
            });
            const saveId = await responseCreate.body.id;

            const response = await request(app).delete(`/delete-sector/${saveId}`);
            expect(response.statusCode).toBe(200);
            expect(await response.body.message).toBe("Sector deletado!")
        });

        test("Listar todos os sectores - com sucesso", async () => {
            const response = await request(app).get(`/sectores`);
            expect(response.statusCode).toBe(200);
        });

        test("Atualizar um sector - com sucesso", async () => {
            const responseCreate = await request(app).post("/create-sector").send({
                name: "Teste aplicação",
                descricao: "teste@gmail.com"
            });
            const saveId = await responseCreate.body.id;

            const response = await request(app).put(`/update-sector/${saveId}`).send({
                name: "New Teste aplicação",
                descricao: "Newteste@gmail.com"
            });
            expect(response.statusCode).toBe(200);
            expect(await response.body.message).toBe("Sector Atualizado")
            await clearSectorDataTest(saveId);
        });
    });

    describe("Teste de integração e End-to-End - de um fornecedor", () => {
        test("Criar um fornecedor - com sucesso", async () => {
            const response = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            expect(response.statusCode).toBe(200);
            await clearFornecedorDataTest(await response.body.id);
        });

        test("Criar um fornecedor com número de telefone já existente - sem sucesso", async () => {
            const responseFirst = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            expect(responseFirst.statusCode).toBe(200);
            const saveFirstId = await responseFirst.body.id;

            const response = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "uiiueuhdnjded@gmail.com",
                descricao: "1234"
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Este número de telefone já existe e pertence a outro fornecedor.");
            await clearFornecedorDataTest(saveFirstId);
        });

        test("Criar um fornecedor com email já existente - sem sucesso", async () => {
            const responseFirst = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            expect(responseFirst.statusCode).toBe(200);
            const saveFirstId = await responseFirst.body.id;
            
            const response = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "914445556",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Este email já existe e pertence a outro fornecedor.");
            await clearFornecedorDataTest(saveFirstId);
        });

        test("Deletar um fornecedor - com sucesso", async () => {
            const responseCreate = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            const saveId = await responseCreate.body.id;

            const response = await request(app).delete(`/delete-fornecedor/${saveId}`);
            expect(response.statusCode).toBe(200);
            expect(await response.body.message).toBe("Fornecedor deletado!");
        });

        test("Listar um fornecedor pelo id - com sucesso", async () => {
            const responseCreate = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            const saveId = await responseCreate.body.id;

            const response = await request(app).get(`/getFornecedor/${saveId}`);
            expect(response.statusCode).toBe(200);
            await clearFornecedorDataTest(saveId);
        });

        test("Listar um fornecedor pelo numero de telefone - com sucesso", async () => {
            const responseCreate = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            const saveId = await responseCreate.body.id;

            const response = await request(app).get(`/getFornecedorByPhone/${923232323}`);
            expect(response.statusCode).toBe(200);
            await clearFornecedorDataTest(saveId);
        });

        test("Listar um fornecedor pelo nome - com sucesso", async () => {
            const responseCreate = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            const saveId = await responseCreate.body.id;

            const response = await request(app).get(`/getFornecedorByName/${"Teste aplicação"}`);
            expect(response.statusCode).toBe(200);
            await clearFornecedorDataTest(saveId);
        });

        test("Listar todos os fornecedores - com sucesso", async () => {
            const response = await request(app).get(`/getAllFornecedor`);
            expect(response.statusCode).toBe(200);
        });

        test("Atualizar um fornecedor - com sucesso", async () => {
            const responseCreate = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            const saveId = await responseCreate.body.id;

            const response = await request(app).put(`/update-fornecedor/${saveId}`).send({
                nome: "New Teste aplicação",
                telefone: "924567364",
                email: "hfhyoooopj@gmail.com",
                descricao: "1234"
            });
            expect(response.statusCode).toBe(200);
            expect(await response.body.message).toBe("fornecedor Atualizado")
            await clearFornecedorDataTest(saveId);
        });
    });

    describe("Teste de integração e End-to-End - de avaliação", () => {
        test("Criar uma avaliação - com sucesso", async () => {
            const response = await request(app).post("/create-avaliacao").send({
                assunto: "Teste aplicação",
                descricao: "Este assunto"
            });
            expect(response.statusCode).toBe(200);
            await clearAvaliacaoDataTest(await response.body.id);
        });

        test("Deletar uma avaliação - com sucesso", async () => {
            const responseCreate = await request(app).post("/create-avaliacao").send({
                assunto: "Teste aplicação",
                descricao: "Este assunto"
            });
            const saveId = await responseCreate.body.id;

            const response = await request(app).delete(`/delete-avaliacao/${saveId}`);
            expect(response.statusCode).toBe(200);
            expect(await response.body.message).toBe("Avaliacao deletado!");
        });

        test("Listar todas as avaliações - com sucesso", async () => {
            const response = await request(app).get(`/getAvaliacoes`);
            expect(response.statusCode).toBe(200);
        });

        test("Atualizar uma avaliação - com sucesso", async () => {
            const responseCreate = await request(app).post("/create-avaliacao").send({
                assunto: "Teste aplicação",
                descricao: "Este assunto"
            });
            const saveId = await responseCreate.body.id;

            const response = await request(app).put(`/update-avaliacao/${saveId}`).send({
                assunto: "Teste aplicação updated",
                descricao: "Este assunto é top"
            });
            expect(response.statusCode).toBe(200);
            expect(await response.body.message).toBe("Avaliação Atualizado")
            await clearAvaliacaoDataTest(saveId);
        });
    });

    describe("Teste de integração e End-to-End - de funcionário", () => {
        test("Criar um funcionário - com sucesso", async () => {
            const responseSector = await request(app).post("/create-sector").send({
                name: "Teste aplicação",
                descricao: "teste@gmail.com"
            });
            const response = await request(app).post("/create-funcionario").send({
                name: "Teste do sistema",
                morada: "talatona",
                bilheteidentidade: "0000055LA044",
                telefone: "999888777",
                cargo: "Software Developer",
                salario: "11000",
                sectorId: await responseSector.body.id
            });
            expect(response.statusCode).toBe(200);
            await clearSectorDataTest(await responseSector.body.id);
            await clearFuncionarioDataTest(await response.body.id);
        });

        test("Criar um funcionário com um sector que não existe - sem sucesso", async () => {
            const response = await request(app).post("/create-funcionario").send({
                name: "Teste do sistema",
                morada: "talatona",
                bilheteidentidade: "0000055LA044",
                telefone: "999888777",
                cargo: "Software Developer",
                salario: "11000",
                sectorId: "dcae6f0a-6432-4e15-8783-cd15455422ee"
            });
            expect(response.statusCode).toBe(400);
        });

        test("Deletar um funcionário - com sucesso", async () => {
            const responseSector = await request(app).post("/create-sector").send({
                name: "Teste aplicação",
                descricao: "teste@gmail.com"
            });
            const responseFuncionario = await request(app).post("/create-funcionario").send({
                name: "Teste do sistema",
                morada: "talatona",
                bilheteidentidade: "0000055LA044",
                telefone: "999888777",
                cargo: "Software Developer",
                salario: "11000",
                sectorId: await responseSector.body.id
            });
            const saveId = await responseFuncionario.body.id;

            const response = await request(app).delete(`/delete-funcionario/${saveId}`);
            expect(response.statusCode).toBe(200);
            expect(await response.body.message).toBe("Funcionario deletado");
            await clearSectorDataTest(await responseSector.body.id);
        });

        test("Listar todos os funcionário - com sucesso", async () => {
            const response = await request(app).get(`/getAllFuncionarios`);
            expect(response.statusCode).toBe(200);
        });

        test("Atualizar um funcionário - com sucesso", async () => {
            const responseSector = await request(app).post("/create-sector").send({
                name: "Teste aplicação",
                descricao: "teste@gmail.com"
            });
            const response = await request(app).post("/create-funcionario").send({
                name: "Teste do sistema",
                morada: "talatona",
                bilheteidentidade: "0000055LA044",
                telefone: "999888777",
                cargo: "Software Developer",
                salario: "11000",
                sectorId: await responseSector.body.id
            });
            const saveId = await response.body.id;

            const responseUpdate = await request(app).put(`/update-funcionario/${saveId}`).send({
                name: "New Teste do sistema",
                morada: "New talatona",
                bilheteidentidade: "1111111111LA004",
                telefone: "922333444",
                cargo: "Java - Software Developer",
                salario: "2222",
                sectorId: await responseSector.body.id
            });
            expect(responseUpdate.statusCode).toBe(200);
            expect(await responseUpdate.body.message).toBe("Funcionario Atualizado")
            await clearSectorDataTest(await responseSector.body.id);
            await clearFuncionarioDataTest(saveId);
        });
    });

    describe("Teste de integração e End-to-End - de produto", () => {
        test("Criar um produto - com sucesso", async () => {
            const responseFornecedor = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            const response = await request(app).post("/create-produto").send({
                nome: "Teste do sistema",
                descricao: "esta descricao",
                fornecedorId: await responseFornecedor.body.id
            });
            expect(response.statusCode).toBe(200);
            await clearFornecedorDataTest(await responseFornecedor.body.id);
            await clearProdutoDataTest(await response.body.id);
        });

        test("Criar um produto com id fornecedor que não existe - sem sucesso", async () => {
            const responseFornecedor = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            const response = await request(app).post("/create-produto").send({
                nome: "Teste do sistema",
                descricao: "esta descricao",
                fornecedorId: "64573637637474848-uyuehhdhdj"
            });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Este fornecedor não existe!");
            await clearFornecedorDataTest(await responseFornecedor.body.id);
            await clearProdutoDataTest(await response.body.id);
        });

        test("Deletar um produto - com sucesso", async () => {
            const responseFornecedor = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            const responseProduto = await request(app).post("/create-produto").send({
                nome: "Teste do sistema",
                descricao: "esta descricao",
                fornecedorId: await responseFornecedor.body.id
            });

            const saveId = await responseProduto.body.id;

            const response = await request(app).delete(`/delete-produto/${saveId}`);
            expect(response.statusCode).toBe(200);
            expect(await response.body.message).toBe("Produto deletado");
            await clearFornecedorDataTest(await responseFornecedor.body.id);
        });

        test("Listar todos os produto - com sucesso", async () => {
            const response = await request(app).get(`/getAllProduto`);
            expect(response.statusCode).toBe(200);
        });

        test("Listar um produto pelo id - com sucesso", async () => {
            const responseFornecedor = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            const responseProduto = await request(app).post("/create-produto").send({
                nome: "Teste do sistema",
                descricao: "esta descricao",
                fornecedorId: await responseFornecedor.body.id
            });

            const saveId = await responseProduto.body.id;

            const responseGetProdutoUpdate = await request(app).get(`/getProduto/${saveId}`).send();
            expect(responseGetProdutoUpdate.statusCode).toBe(200);
            await clearFornecedorDataTest(await responseFornecedor.body.id);
            await clearProdutoDataTest(saveId);
        });

        test("Atualizar um produto - com sucesso", async () => {
            const responseFornecedor = await request(app).post("/create-fornecedor").send({
                nome: "Teste aplicação",
                telefone: "923232323",
                email: "hfhdj@gmail.com",
                descricao: "1234"
            });
            const responseProduto = await request(app).post("/create-produto").send({
                nome: "Teste do sistema",
                descricao: "esta descricao",
                fornecedorId: await responseFornecedor.body.id
            });

            const saveId = await responseProduto.body.id;

            const responseProdutoUpdate = await request(app).put(`/update-produto/${saveId}`).send({
                nome: "New Teste do sistema",
                descricao: "new esta descricao",
                fornecedorId: await responseFornecedor.body.id
            });
            expect(responseProdutoUpdate.statusCode).toBe(200);
            expect(await responseProdutoUpdate.body.message).toBe("Produto Atualizado")
            await clearFornecedorDataTest(await responseFornecedor.body.id);
            await clearProdutoDataTest(saveId);
        });
    });
 
    describe("Teste de integração e End-to-End - de uma mesa", () => {
        test("Criar uma mesa - com sucesso", async () => {
            const response = await request(app).post("/create-mesa").send({
                lugares: 3,
                posicao: "Teste Outside"
            });
            expect(response.statusCode).toBe(200);
            await clearMesaDataTest(await response.body.id);
        });

        test("Deletar uma mesa - com sucesso", async () => {
            const response = await request(app).post("/create-mesa").send({
                lugares: 3,
                posicao: "Teste Outside"
            });
            const saveId = await response.body.id;

            const responseDelete = await request(app).delete(`/delete-mesa/${saveId}`);
            expect(responseDelete.statusCode).toBe(200);
            expect(await responseDelete.body.message).toBe("mesa deletada!")
        });

        test("Listar todas as mesas - com sucesso", async () => {
            const response = await request(app).get(`/getAllMesas`);
            expect(response.statusCode).toBe(200);
        });
 
        test("Listar mesa pelo número de identificação existente - com sucesso", async () => {
            const response = await request(app).post("/create-mesa").send({
                lugares: 3,
                posicao: "Teste Outside"
            });

            const responseGetByNumero = await request(app).get(`/getMesaByNumero/${1}`);
            expect(responseGetByNumero.statusCode).toBe(200);
            await clearMesaDataTest(await response.body.id);
        });
 
        test("Listar mesa pelo número de identificação que não existe - sem sucesso", async () => {
            const response = await request(app).post("/create-mesa").send({
                lugares: 3,
                posicao: "Teste Outside"
            });

            const responseGetByNumero = await request(app).get(`/getMesaByNumero/${99999999999999999.7}`);
            expect(responseGetByNumero.statusCode).toBe(400);
            await clearMesaDataTest(await response.body.id);
        });
 
        test("Listar mesa por número de lugares - com sucesso", async () => {
            const response = await request(app).post("/create-mesa").send({
                lugares: 3,
                posicao: "Teste Outside"
            });

            const responseGetByLugares = await request(app).get(`/getMesaByLugares/${3}`);
            expect(responseGetByLugares.statusCode).toBe(200);
            await clearMesaDataTest(await response.body.id);
        });
 
        test("Listar mesa por número de lugares que não existe - sem sucesso", async () => {
            const response = await request(app).post("/create-mesa").send({
                lugares: 3,
                posicao: "Teste Outside"
            });

            const responseGetByLugares = await request(app).get(`/getMesaByLugares/${99999999999999999.7}`);
            expect(responseGetByLugares.statusCode).toBe(400);
            await clearMesaDataTest(await response.body.id);
        });
 
        test("Atualizar uma mesa - com sucesso", async () => {
            const response = await request(app).post("/create-mesa").send({
                lugares: 3,
                posicao: "Teste Outside"
            });
            const saveId = await response.body.id;

            const responseUpdated = await request(app).put(`/update-mesa/${saveId}`).send({
                lugares: 5,
                posicao: "New Teste Outside"
            });
            expect(responseUpdated.statusCode).toBe(200);
            expect(await responseUpdated.body.message).toBe("mesa Atualizada")
            await clearMesaDataTest(saveId);
        });
    });    

    describe("Teste de integração e End-to-End - de uma atividade", () => {
        test("Criar uma atividade local do restaurante - com sucesso", async () => {
            const response = await request(app).post("/create-atividade").send({
                tema: "Almoço dos kotas",
                data: "07/11/2024",
                hora: "14:00",
                descricao: "Será uma tarde memorável!"
            });
            expect(response.statusCode).toBe(200);
            await clearAtividadeCasaDataTest(await response.body.id);
        });

        test("Deletar uma atividade local do restaurante - com sucesso", async () => {
            const response = await request(app).post("/create-atividade").send({
                tema: "Almoço dos kotas",
                data: "07/11/2024",
                hora: "14:00",
                descricao: "Será uma tarde memorável!"
            });
            const saveId = await response.body.id;

            const responseDelete = await request(app).delete(`/delete-atividade/${saveId}`);
            expect(responseDelete.statusCode).toBe(200);
            expect(await responseDelete.body.message).toBe("atividade deletada!")
        });

        test("Listar todas as atividades locais do restaurante - com sucesso", async () => {
            const response = await request(app).get(`/getAllAtividades`);
            expect(response.statusCode).toBe(200);
        });
 
        test("Atualizar uma atividade local do restaurante - com sucesso", async () => {
            const response = await request(app).post("/create-atividade").send({
                tema: "Almoço dos kotas",
                data: "07/11/2024",
                hora: "14:00",
                descricao: "Será uma tarde memorável!"
            });
            const saveId = await response.body.id;

            const responseUpdated = await request(app).put(`/update-atividade/${saveId}`).send({
                tema: "Almoço dos kotas da dipanda",
                data: "09/11/2024",
                hora: "14:00",
                descricao: "Será uma tarde memorável!"
            });
            expect(responseUpdated.statusCode).toBe(200);
            expect(await responseUpdated.body.message).toBe("atividade Atualizada")
            await clearAtividadeCasaDataTest(saveId);
        });
    });    

});