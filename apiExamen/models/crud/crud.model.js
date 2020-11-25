var MongoDB = require('../dbm');
var ObjectID = require('mongodb').ObjectID;

class ProductsModel{
    constructor(){
      this.collection = null
      MongoDB.getDb()
       .then (
         (db)=>{
           this.collection = db.collection("empleado");
         }
      )
       .catch((ex)=>{
        throw(ex);
      });
    }

    async getAll(){
        try {
          let rslts = await this.collection.find({}).toArray();
          return rslts;
        }catch(ex){
          throw(ex);
        }
      }

      async getById(id){
        try{
          const _id = new ObjectID(id);
          let oneDoc = await this.collection.findOne({_id});
          return oneDoc;
        }catch(ex){
          throw(ex);
        }
      }

    

      async addempelado(id, ca){
        try {
          let _nombre = nombre.toLowerCase();
          let _correo = correo.toLowerCase();
          let _telefono = telefono.toLowerCase();
          let _producto = producto.toLowerCase();
          let _pago = pago.toLowerCase();
          let _estado = estado.toLowerCase();
          const UpdOps = {"$push": {nombre: _nombre,correo: _correo,telefono:_telefono,producto:_producto,pago:_pago,estado:_estado}};
          const _id = new ObjectID(id);
          let updDoc = await this.collection.findOneAndUpdate({ _id }, UpdOps, { returnOriginal: false});
          return updDoc;
        }catch(ex){
          throw(ex);
        }
      }
    

      async updateById(id, stock, sales){
        try{
          const _id = new ObjectID(id);
          // UPDATE TABLE SET attr = val, attr = val where attr = val;
          const updOps = {"$set":{"stock":stock, "sales":sales}};
          let updDoc = await this.collection.findOneAndUpdate({ _id }, updOps, { returnOriginal:false});
          return updDoc;
        }catch(ex){
          throw(ex);
        }
      }

      async removeById(id) {
        try{
          const _id = new ObjectID(id);
          let rslt = await this.collection.deleteOne({_id});
          return rslt;
        }catch(ex){
          throw(ex);
        }
      }
      

}

module.exports = ProductsModel;