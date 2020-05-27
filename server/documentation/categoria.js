/**
 * @swagger
 * /categoria:
 *   get:
 *     tags:
 *       - Categoria de Produtos
 *     summary: Obter todas as categoria
 *     description: Esta rota é responsável por obter todas as categorias cadastradas
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna uma lista de categorias
 *         schema:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  CategoriaId:
 *                      type: integer
 *                      example: 1
 *                  Descricao:
 *                      type: string
 *                      example: 'Eletrônicos'
 *                  Ativo:
 *                      type: string
 *                      example: '<span class="badge badge-success">Sim</span>'
 */

/**
 * @swagger
 * /categoria/ativas:
 *   get:
 *     tags:
 *       - Categoria de Produtos
 *     summary: Obter todas as categoria ativas
 *     description: Esta rota é responsável por obter todas as categorias ativas cadastradas
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Retorna uma lista de categorias ativas
 *         schema:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  CategoriaId:
 *                      type: integer
 *                      example: 1
 *                  Descricao:
 *                      type: string
 *                      example: 'Eletrônicos'
 *                  Ativo:
 *                      type: string
 *                      example: '<span class="badge badge-success">Sim</span>'
 */

/**
 * @swagger
 * /categoria/{categoriaId}:
 *   get:
 *     tags:
 *       - Categoria de Produtos
 *     summary: Obter categoria por Id
 *     description: Esta rota é responsável por obter a categoria pelo Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoriaId
 *         description: Id da categoria
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Retorna a categoria filtrada pelo Id
 *         schema:
 *            type: object
 *            properties:
 *               CategoriaId:
 *                   type: integer
 *                   example: 1
 *               Descricao:
 *                   type: string
 *                   example: 'Eletrônicos'
 *               Ativo:
 *                   type: string
 *                   example: '<span class="badge badge-success">Sim</span>'
 */

/**
 * @swagger
 * /categoria:
 *   post:
 *     tags:
 *       - Categoria de Produtos
 *     summary: Cadastrar nova categoria
 *     description: Esta rota é responsável por cadastrar uma nova categoria
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         description: "Enviar um objeto JSON no seguinte formato:"
 *         required: true
 *         schema:
 *            type: object
 *            properties:
 *               descricao:
 *                  type: string
 *                  example: "Nova Categoria"
 *     responses:
 *       200:
 *         description: Retorna em formato de texto a mensagem de falha ou sucesso do cadastro da categoria
 *         schema:
 *            type: object
 *            properties:
 *               retorno:
 *                   type: string
 *                   example: "{ \"resultado\" : \"sucesso\", \"msg\" : \"Cadastro realizado com sucesso!\" , \"class\" : \"success\" }"
 */

/**
 * @swagger
 * /categoria:
 *   put:
 *     tags:
 *       - Categoria de Produtos
 *     summary: Atualizar categoria
 *     description: Esta rota é responsável por atualizar os dados de uma categoria
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         description: "Enviar um objeto JSON no seguinte formato:"
 *         required: true
 *         schema:
 *            type: object
 *            properties:
 *               categoriaId:
 *                  type: integer
 *                  example: 1
 *                  description: "Este é o Id da categoria que será atualizada"
 *               descricao:
 *                  type: string
 *                  example: "Categoria editada"
 *     responses:
 *       200:
 *         description: Retorna em formato de texto a mensagem de falha ou sucesso do cadastro da categoria
 *         schema:
 *            type: object
 *            properties:
 *               retorno:
 *                   type: string
 *                   example: "{ \"resultado\" : \"sucesso\", \"msg\" : \"Cadastro atualizado com sucesso!\" }"
 */

/**
 * @swagger
 * /categoria/ativar:
 *   post:
 *     tags:
 *       - Categoria de Produtos
 *     summary: Cadastrar nova categoria
 *     description: Esta rota é responsável por cadastrar uma nova categoria
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         description: "Enviar um objeto JSON no seguinte formato:"
 *         required: true
 *         schema:
 *            type: object
 *            properties:
 *               descricao:
 *                  type: string
 *                  example: "Nova Categoria"
 *     responses:
 *       200:
 *         description: Retorna em formato de texto a mensagem de falha ou sucesso do cadastro da categoria
 *         schema:
 *            type: object
 *            properties:
 *               retorno:
 *                   type: string
 *                   example: "{ \"resultado\" : \"sucesso\", \"msg\" : \"Cadastro realizado com sucesso!\" , \"class\" : \"success\" }"
 */
