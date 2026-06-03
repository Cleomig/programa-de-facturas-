require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/apexflow';
console.log('MongoDB URI seleccionada:', MONGODB_URI.includes('mongodb+srv') ? 'mongodb+srv (oculta)' : 'mongodb estándar (oculta)');

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });

// Servir archivos estáticos del frontend desde la misma carpeta (para desarrollo)
const path = require('path');
app.use(express.static(path.join(__dirname)));

// Enviar index.html para rutas no-API (single page app)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// --- Schemas (simple for demo) ---
const Schema = mongoose.Schema;

const UserSchema = new Schema({ id: String, name: String, email: String, password: String, role: String }, { timestamps: true });
const ClientSchema = new Schema({ id: String, name: String, cid: String, address: String, phone: String, email: String, balance: Number }, { timestamps: true });
const ProductSchema = new Schema({ id: String, sku: String, name: String, category: String, cost: Number, price: Number, stock: Number, minStock: Number }, { timestamps: true });
const ServiceSchema = new Schema({ id: String, name: String, duration: Number, price: Number }, { timestamps: true });
const AppointmentSchema = new Schema({ id: String, customerName: String, customerPhone: String, date: String, time: String, serviceId: String, worker: String, status: String }, { timestamps: true });
const InvoiceSchema = new Schema({ id: String, clientId: String, customerName: String, customerId: String, date: String, items: Array, subtotal: Number, tax: Number, total: Number, paymentMethod: String, paymentDetails: Object }, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Client = mongoose.model('Client', ClientSchema);
const Product = mongoose.model('Product', ProductSchema);
const Service = mongoose.model('Service', ServiceSchema);
const Appointment = mongoose.model('Appointment', AppointmentSchema);
const Invoice = mongoose.model('Invoice', InvoiceSchema);

app.get('/api/ping', (req, res) => res.json({ ok: true, now: new Date() }));

// Generic GET endpoints
app.get('/api/users', async (req, res) => { const data = await User.find({}); res.json(data); });
app.get('/api/clients', async (req, res) => { const data = await Client.find({}); res.json(data); });
app.get('/api/products', async (req, res) => { const data = await Product.find({}); res.json(data); });
app.get('/api/services', async (req, res) => { const data = await Service.find({}); res.json(data); });
app.get('/api/appointments', async (req, res) => { const data = await Appointment.find({}); res.json(data); });
app.get('/api/invoices', async (req, res) => { const data = await Invoice.find({}); res.json(data); });

// Generic POST endpoints to allow seeding from frontend if desired
app.post('/api/users', async (req, res) => { const u = new User(req.body); await u.save(); res.json(u); });
app.post('/api/clients', async (req, res) => { const u = new Client(req.body); await u.save(); res.json(u); });
app.post('/api/products', async (req, res) => { const u = new Product(req.body); await u.save(); res.json(u); });
app.post('/api/services', async (req, res) => { const u = new Service(req.body); await u.save(); res.json(u); });
app.post('/api/appointments', async (req, res) => { const u = new Appointment(req.body); await u.save(); res.json(u); });
app.post('/api/invoices', async (req, res) => { const u = new Invoice(req.body); await u.save(); res.json(u); });

// Simple reset / seed endpoint (DANGEROUS: for local dev only)
app.post('/api/seed', async (req, res) => {
  const { users = [], clients = [], products = [], services = [], appointments = [], invoices = [] } = req.body;
  await User.deleteMany({}); await Client.deleteMany({}); await Product.deleteMany({}); await Service.deleteMany({}); await Appointment.deleteMany({}); await Invoice.deleteMany({});
  await User.insertMany(users); await Client.insertMany(clients); await Product.insertMany(products); await Service.insertMany(services); await Appointment.insertMany(appointments); await Invoice.insertMany(invoices);
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
