/**
 * Esquema que describe la estructura de un objeto de transporte.
 *
 * @swagger
 * components:
 *   schemas:
 *     Transport:
 *       type: object
 *       properties:
 *         TransportId:
 *           type: integer
 *         UserId:
 *           type: integer
 *         TransportTypeId:
 *           type: integer
 *         TransportPlate1:
 *           type: string
 *         TransportPlate2:
 *           type: string
 *         TransportPlate3:
 *           type: string
 *         Capacity:
 *           type: integer
 *         StatusId:
 *           type: integer
 *       required:
 *         - TransportId
 *         - UserId
 *         - TransportTypeId
 *         - TransportPlate1
 *         - TransportPlate2
 *         - TransportPlate3
 *         - Capacity
 *         - StatusId
 *     getTransports:
 *       type: object
 *       properties:
 *         TransportId:
 *           type: integer
 *         UserId:
 *           type: integer
 *       required:
 *         - UserId
 */

/**
 * Esquema que describe la estructura de un objeto de respuesta de transporte.
 *
 * @swagger
 * components:
 *   schemas:
 *     TransportResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       required:
 *         - message
 *     GenericResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       required:
 *         - message
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       required:
 *         - message
 */

/**
 * Actualiza o agrega un transporte a la base de datos.
 *
 * @swagger
 * /GesCitApi/Catalogs/addOrUpdateTransport:
 *   post:
 *     tags:
 *       - Catalogs
 *     summary: Agrega o actualiza un transporte.
 *     description: Agrega o actualiza un transporte en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transport'
 *     responses:
 *       200:
 *         description: Transporte agregado o actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransportResponse'
 *       500:
 *         description: Error al agregar o actualizar el transporte.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * Obtiene una lista de transportes según el ID de transporte especificado.
 *
 * @swagger
 * /GesCitApi/Catalogs/getTransports:
 *   post:
 *     tags:
 *       - Catalogs
 *     summary: Obtiene una lista de transportes.
 *     description: Obtiene una lista de transportes según el ID de transporte especificado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/getTransports'
 *     responses:
 *       200:
 *         description: Lista de transportes obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transport'
 *       400:
 *         description: Parámetros inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error al obtener la lista de transportes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
