
var db;

function errorHandler(tx, error)
{
    console.error("SQL error: " + tx + " (" + error.code + "): " + error.message);
}

var DB = {
    DACreateDatabase: function () {
        var shortName = "FeedbackDB";
        var version = "1.0";
        var displayName = "DB for Feedback app";
        var dbSize = 2 * 1024 * 1024; // this is a 2 MB estimated size

        function dbCreate() {
            console.info("Success: Database created successfully");
        }

        // openDatabase() creates a DB if it doesn't exist, or open it if it exists
        db = openDatabase(shortName, version, displayName, dbSize, dbCreate);
    },
    DACreateTables: function ()
    {
        function txFunction(tx)
        {
            var sql = "DROP TABLE IF EXISTS type;";
            var options = [];
            tx.executeSql(sql, options, errorHandler);

            sql = "CREATE TABLE IF NOT EXISTS type( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL);";
            tx.executeSql(sql, options, successCreate, errorHandler);

            function successCreate()
            {
                console.info("Table created successfully");
            }
            sql = "INSERT INTO type(name) VALUES('Canadian');";
            tx.executeSql(sql, options, successTransaction, errorHandler);

            sql = "INSERT INTO type(name) VALUES('Asian');";
            tx.executeSql(sql, options, successTransaction, errorHandler);

            sql = "INSERT INTO type(name) VALUES('Others');";
            tx.executeSql(sql, options, successTransaction, errorHandler);

            function successTransaction()
            {
                console.info("Insert transaction successful");
            }

            sql = "CREATE TABLE IF NOT EXISTS review( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "businessName VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "reviewDate DATE," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";

            tx.executeSql(sql, options, successCreate, errorHandler);

            function successCreate()
            {
                console.info("Table created successfully");
            }

            tx.executeSql(sql, options, successCreate, errorHandler);
        }

        function successTransaction()
        {
            console.info("Create table transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    DADropTables: function ()
    {
        function txFunction(tx)
        {
            var sql = "DROP TABLE IF EXISTS type;";
            var options = [];

            tx.executeSql(sql, options, successDrop, errorHandler);

            sql = "DROP TABLE IF EXISTS review;";

            tx.executeSql(sql, options, successDrop, errorHandler);

            function successDrop()
            {
                console.info("Table dropped successfully");
            }
        }

        function successTransaction()
        {
            console.info("Drop table transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};