/**
 * Esquema del objeto de transporte.
 *
 * @swagger
 * components:
 *   schemas:
 *     TransportLine:
 *       type: object
 *       properties:
 *         TransportLineId:
 *           type: integer
 *           description: Identificador único de la línea de transporte.
 *         UserId:
 *           type: integer
 *           description: Identificador único del usuario de la línea de transporte.
 *         NameLine:
 *           type: string
 *           description: Nombre de la línea de transporte.
 *         TransportLineTypeId:
 *           type: integer
 *           description: Identificador único del tipo de la línea de transporte.
 *         StatusId:
 *           type: integer
 *           description: Identificador único del estado de la línea de transporte.
 *       example:
 *         TransportLineId: 1
 *         UserId: 2
 *         NameLine: "Línea 1"
 *         TransportLineTypeId: 3
 *         StatusId: 1
 *     getTransportLine:
 *       type: object
 *       properties:
 *         TransportLineId:
 *           type: integer
 *           description: Identificador único de la línea de transporte.
 *         UserId:
 *           type: integer
 *           description: Identificador único del usuario de la línea de transporte.
 *       example:
 *         TransportLineId: 1
 *         UserId: 1
 */

/**
 * Esquema que describe la estructura de un objeto de respuesta de transporte.
 *
 * @swagger
 * components:
 *   schemas:
 *     TransportLineResponse:
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
 * Obtiene una lista de transportes según el ID de transporte especificado.
 *
 * @swagger
 * /GesCitApi/Catalogs/addOrUpdateTransportLine:
 *   post:
 *     tags:
 *       - Catalogs
 *     summary: Agrega o actualiza una línea de transporte.
 *     description: Agrega o actualiza una línea de transporte en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransportLine'
 *     responses:
 *       200:
 *         description: Línea de transporte agregada o actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GenericResponse'
 *       500:
 *         description: Error al agregar o actualizar la línea de transporte.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * Obtiene una lista de líneas de transporte según el ID de transporte especificado.
 *
 * @swagger
 * /GesCitApi/catalogs/getTransportLines:
 *   post:
 *     tags:
 *       - Catalogs
 *     summary: Obtiene una lista de líneas de transporte.
 *     description: Obtiene una lista de líneas de transporte en la base de datos según el ID de transporte especificado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/getTransportLine'
 *     responses:
 *       200:
 *         description: Lista de líneas de transporte obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TransportLine'
 *       500:
 *         description: Error al obtener las líneas de transporte.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
