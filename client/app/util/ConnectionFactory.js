System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      const ConnectionFactory = (() => {
        let connection = null;
        const dbName = 'jscangaceiro';
        const dbVersion = 2;
        const stores = ['negociacoes'];
        let closeFn = null;

        return class ConnectionFactory {
          constructor() {
            throw new Error('Não é possível criar instâncias dessa classe');
          }

          static getConnection() {
            return new Promise((resolve, reject) => {
              if (connection) {
                console.log('connection cacheada');
                return resolve(connection);
              }

              const openConnection = indexedDB.open(dbName, dbVersion);

              openConnection.onupgradeneeded = event => {
                this._createStores(event.target.result);
              };

              openConnection.onsuccess = event => {
                connection = event.target.result;
                closeFn = connection.close;

                connection.close = () => {
                  throw new Error('Você não pode fechar diretamente a conexão');
                };

                resolve(event.target.result);
              };

              openConnection.onerror = event => reject(event.target.error.name);
            });
          }

          static _createStores(connection) {
            stores.forEach(store => {
              if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
              }

              connection.createObjectStore(store, { autoIncrement: true });
            });
          }

          static closeConnection() {
            if (!connection) return false;
            console.log('fechando a conexão');
            Reflect.apply(closeFn, connection, []);
            return true;
          }
        };
      })();

      _export('ConnectionFactory', ConnectionFactory);
    }
  };
});
//# sourceMappingURL=ConnectionFactory.js.map