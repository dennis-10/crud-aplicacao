from flask_pymongo import PyMongo
from flask import Flask, request, jsonify
from flask_cors import CORS
from bson import ObjectId

app = Flask(__name__)
# Passando o caminho do mongo server com o respectivo database
app.config['MONGO_URI']='mongodb://localhost/desafio'
mongo = PyMongo(app)

CORS(app)

# Se referindo a colecao que utilizarei
db = mongo.db.celulares

@app.route('/celulares', methods=['GET'])
def getCels():
    celulares = []
    for celular in db.find():
        celulares.append({
            '_id': str(ObjectId(celular['_id'])),
            'marca': celular['marca'],
            'modelo': celular['modelo'],
            'capacidade': celular['capacidade'],
            'data_lancamento': celular['data_lancamento']
        })
    return jsonify(celulares)

@app.route('/celular/<id>', methods=['GET'])
def getCelular(id):
    celular = db.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id': str(ObjectId(celular['_id'])),
        'marca': celular['marca'],
        'modelo': celular['modelo'],
        'capacidade': celular['capacidade'],
        'data_lancamento': celular['data_lancamento']
    })

@app.route('/celulares', methods=['POST'])
def createCel():
    id = db.insert({
        'marca': request.json['marca'],
        'modelo': request.json['modelo'],
        'capacidade': request.json['capacidade'],
        'data_lancamento': request.json['data_lancamento']
    })
    return jsonify(str(ObjectId(id)))

@app.route('/celulares/<id>', methods=['DELETE'])
def deleteCel(id):
  db.delete_one({"_id": ObjectId(id)})
  return jsonify({'msg': 'Celular deletado!'})

@app.route('/celulares/<id>', methods=['PUT'])
def updateCel(id):
    db.update_one({'_id': ObjectId(id)}, {"$set":{
        'marca': request.json['marca'],
        'modelo': request.json['modelo'],
        'capacidade': request.json['capacidade'],
        'data_lancamento': request.json['data_lancamento']
    }})
    return jsonify({'message': 'Celular atualizado'})


# roda backend c/ python
if __name__ == "__main__":
    app.run(debug=True)