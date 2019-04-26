<!--
Written by Daiana Arantes
April 2019
Revision History
-->
var review = {
    DAinsert: function (options, callback){

        function txFunction(tx)
        {
            var sql = "INSERT INTO review(businessName, typeId, reviewerEmail, reviewerComments," +
                "reviewDate, hasRating, rating1, rating2, rating3) VALUES(?,?,?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction()
        {
            console.info("Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    DAselect: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "SELECT * FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);

    },
    DAselectAll: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "SELECT * FROM review;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("SelectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    DAupdate: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "UPDATE review SET businessName=?, typeId=?," +
                "reviewerEmail=?, reviewerComments=?, reviewDate=?, hasRating=?," +
                "rating1=?, rating2=?, rating3=? WHERE id=?; ";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    DAdelete: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "DELETE FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }


};

var type = {
    DAselectAll: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "SELECT * FROM type;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("SelectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};