
/**
 * Esquema del objeto de credenciales de usuario.
 *
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Nombre de usuario.
 *         password:
 *           type: string
 *           description: Contraseña del usuario.
 */

/**
 * Esquema de la respuesta de éxito de inicio de sesión.
 *
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: Identificador único del usuario.
 *         successMessage:
 *           type: string
 *           description: Mensaje de exito descriptivo.
 *         errorMessage:
 *           type: string
 *           description: Mensaje de error descriptivo.
 */

/**
 * Esquema del objeto de actualizacion de Aviso de Privacidad del Usuario
 *
 * @swagger
 * components:
 *   schemas:
 *     UserPrivacyNotice:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: integer
 *           description: Identificador del Usuario.
 */

/**
 * Esquema de la respuesta generica.
 *
 * @swagger
 * components:
 *   schemas:
 *     GenericResponse:
 *       type: object
 *       properties:
 *         successMessage:
 *           type: string
 *           description: Mensaje de exito descriptivo.
 */

/**
 * Esquema de la respuesta de error genérico.
 *
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de error descriptivo.
 */

/**
 * Inicia sesión de usuario.
 *
 * @swagger
 * /GesCitApi/configuration/login:
 *   post:
 *     tags:
 *       - Configuration
 *     summary: Iniciar sesión de usuario
 *     description: Iniciar sesión de usuario con credenciales de usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       500:
 *         description: Error al realizar el login.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


/**
 * Actualiza el campo de PrivacyNotice de la tabla de Usuarios.
 *
 * @swagger
 * /GesCitApi/configuration/UserPrivacyNotice:
 *   post:
 *     tags:
 *       - Configuration
 *     summary: Aviso de Privacidad de Usuario.
 *     description: Actualiza el campo de PrivacyNotice de la tabla de Usuarios.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPrivacyNotice'
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 *       500:
 *         description: Error al realizar el login.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /GesCitApi/configuration/roles:
 *   get:
 *     tags:
 *       - Configuration
 *     summary: Devuelve una lista de roles
 *     description: Devuelve una lista de todos los roles disponibles en el sistema.
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del rol
 *                   name:
 *                     type: string
 *                     description: Nombre del rol
 *                   description:
 *                     type: string
 *                     description: Descripción del rol
 */
