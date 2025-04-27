PORT=3030
SECRET_SESSION="blabla"
DB_URL="mysql://donaninita-user:donaninita-password@localhost:3306/donaninita-database"


```
    docker run --name my-mysql -e MYSQL_ROOT_PASSWORD=donaninita-password -e MYSQL_DATABASE=donaninita-database -e MYSQL_USER=donaninita-user -e MYSQL_PASSWORD=donaninita-password -p 3306:3306 -d mysql
```bash

criar as tabelas e inserir os dados

```
    npm run db-create
    
    npm run db-insert
```bash