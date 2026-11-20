
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import { randomUUID, randomBytes } from 'node:crypto';

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET || randomBytes(32).toString('hex');
const DB = './auth-db.json';

app.use(cors());
app.use(express.json({ limit: '50kb' }));

if (!fs.existsSync(DB)) {
    fs.writeFileSync(DB, JSON.stringify({
        users: [],
        routines: []
    }, null, 2));
}

function readDB() {
    return JSON.parse(fs.readFileSync(DB, 'utf8'));
}

function saveDB(data) {
    fs.writeFileSync(`${DB}.tmp`, JSON.stringify(data, null, 2));
    fs.renameSync(`${DB}.tmp`, DB);
}

function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        req.user = jwt.verify(token, SECRET, {
            algorithms: ['HS256']
        });
        next();
    } catch {
        res.status(401).json({
            message: 'Please log in.'
        });
    }
}

// Register
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        !name.trim() ||
        !email.includes('@') ||
        password.length < 8 ||
        Buffer.byteLength(password) > 72
    ) {
        return res.status(400).json({
            message: 'Enter valid details and a password of at least 8 characters.'
        });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const passwordHash = await bcrypt.hash(password, 12);
    const db = readDB();

    if (db.users.some(user => user.email === normalizedEmail)) {
        return res.status(409).json({
            message: 'Email already registered.'
        });
    }

    const user = {
        id: randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        passwordHash
    };

    db.users.push(user);
    saveDB(db);

    res.status(201).json({
        message: 'Account created successfully.'
    });
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        Buffer.byteLength(password) > 72
    ) {
        return res.status(400).json({
            message: 'Invalid details.'
        });
    }

    const db = readDB();

    const user = db.users.find(
        user => user.email === email.trim().toLowerCase()
    );

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({
            message: 'Invalid email or password.'
        });
    }

    const token = jwt.sign(
        { id: user.id },
        SECRET,
        { expiresIn: '1d', algorithm: 'HS256' }
    );

    res.json({
        token,
        name: user.name
    });
});

// Read routines
app.get('/routines', authenticate, (req, res) => {
    const db = readDB();

    res.json(db.routines.filter(
        item => item.userId === req.user.id
    ));
});

// Create routine
app.post('/routines', authenticate, (req, res) => {
    const db = readDB();
    const { productId, name, image, routine } = req.body;

    if (
        typeof productId !== 'string' ||
        typeof name !== 'string' ||
        !productId ||
        !name ||
        !['Morning', 'Evening'].includes(routine)
    ) {
        return res.status(400).json({
            message: 'Invalid routine.'
        });
    }

    const exists = db.routines.some(item =>
        item.userId === req.user.id &&
        item.productId === productId &&
        item.routine === routine
    );

    if (exists) {
        return res.status(409).json({
            message: 'Product already in this routine.'
        });
    }

    const item = {
        id: randomUUID(),
        userId: req.user.id,
        productId,
        name,
        image: typeof image === 'string' ? image : '',
        routine
    };

    db.routines.push(item);
    saveDB(db);

    res.status(201).json(item);
});

// Update routine
app.patch('/routines/:id', authenticate, (req, res) => {
    const db = readDB();

    const item = db.routines.find(item =>
        item.id === req.params.id &&
        item.userId === req.user.id
    );

    if (!item) {
        return res.status(404).json({
            message: 'Routine not found.'
        });
    }

    const { routine } = req.body;

    if (!['Morning', 'Evening'].includes(routine)) {
        return res.status(400).json({
            message: 'Invalid routine.'
        });
    }

    const exists = db.routines.some(other =>
        other.id !== item.id &&
        other.userId === req.user.id &&
        other.productId === item.productId &&
        other.routine === routine
    );

    if (exists) {
        return res.status(409).json({
            message: 'Product already in this routine.'
        });
    }

    item.routine = routine;
    saveDB(db);

    res.json(item);
});

// Delete routine
app.delete('/routines/:id', authenticate, (req, res) => {
    const db = readDB();

    const item = db.routines.find(item =>
        item.id === req.params.id &&
        item.userId === req.user.id
    );

    if (!item) {
        return res.status(404).json({
            message: 'Routine not found.'
        });
    }

    db.routines = db.routines.filter(
        item => item.id !== req.params.id
    );

    saveDB(db);
    res.status(204).end();
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
