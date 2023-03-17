const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger/swagger');
const formData = require('express-form-data');

const configurationRoutes = require('./routes/configurationRoutes');
const datesRoutes = require('./routes/datesRoutes');
const catalogsRoutes = require('./routes/catalogsRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(formData.parse());

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

// Agregar la documentación de Swagger
app.use('/GesCitApi/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/GesCitApi/configuration', configurationRoutes);

app.use('/GesCitApi/catalogs', catalogsRoutes);

app.use('/GesCitApi/dates', datesRoutes);

const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/GesCitApi/addOrUpdateLineDocument', upload.single('LineDocumentFile'), async (req, res) => {
    try {
        console.log(req.file);
        // const { userId, TransportLineId } = req.body;
        // const LineDocumentFile = req.files['LineDocumentFile'].buffer.toString('base64');

        // const response = await TransportLineDao.AddOrUpdateLineDocuments(userId, TransportLineId, LineDocumentFile);
        // console.log(LineDocumentFile);
        res.json('1');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error, message: error.message });
    }
});

// Inicia el servidor
app.get('/', (req, res) => {
  res.redirect('/GesCitApi/api-docs');
});

module.exports = app;
