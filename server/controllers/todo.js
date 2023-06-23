const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
// const Mongo = MongoClient.connect('mongodb://localhost:27017')
const Mongo = MongoClient.connect('mongodb+srv://techspire:techspire@cluster0.mhuu2yr.mongodb.net/?retryWrites=true&w=majority')



const addTodo = async (req, res) => {
    try {
        Mongo.then((client) => {
            client
                .db('task')
                .collection('todo')
                .findOne({ title: req.body.title })
                .then((existingTodo) => {
                    if (existingTodo) {
                        console.log('Todo already exists');
                        return res.status(400).json({ message: 'Todo already exists' });
                    }
            client
                .db('task')
                .collection('todo')
                .insertOne({
                    title: req.body.title,
                    completed: false,
                    addedDate:new Date()
                })
                .then(() => {
                    return res.status(201).json({ message: 'Todo added' });
                })
                .catch((error) => {
                    console.log(error.message);
                    return res.status(500).json({ message: 'Server error' });
                });
            })
            .catch((error) => {
                console.log(error.message);
                return res.status(500).json({ message: 'Server error' });
            });
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message)
    }
}

const getTodo = async (req, res) => {
    try {
        Mongo.then((client) => {
            client.db('task').collection('todo').find().sort({ addedDate: -1 }).toArray()
                .then(respo => {
                    // console.log(respo);
                    res.status(200).json(respo)
                })
                .catch(err => {
                    // console.log(err.message)
                    res.status(401).json({ message: err.message })
                })
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message)
    }
}

const updateTodo = async (req, res) => {
    try {
        Mongo.then((client) => {
            client
                .db('task')
                .collection('todo')
                .updateOne(
                    { _id: new ObjectId(req.params.id) },
                    [{ $set: { completed: { $eq: [false, "$completed"] } } }]
                )
                .then((result) => {
                    // console.log(result)
                    res.status(200).json({ message: `todo updated` })
                })
                .catch((err) => {
                    // console.log(err.message);
                    res.status(401).json({ message: err.message })
                });
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message)
    }
}

const deleteTodo = async (req, res) => {
    try {
        Mongo.then((client) => {
            client.db('task').collection('todo').deleteOne({ _id: new ObjectId(req.params.id) })
                .then(respo => {
                    // console.log(respo);
                    res.status(200).json({ message: respo })
                })
                .catch(err => {
                    console.log(err.message)
                    res.status(401).json({ message: `deletion error` })
                })
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message)
    }
}

module.exports = {
    addTodo,
    getTodo,
    updateTodo,
    deleteTodo
}