# proyecto-dblandit
 Empresa con alumnos y cursos.

Se puede ver alumnos, listarlos, agregar nuevos alumnos, actualizar y eliminarlos.
Cada alumno contiene la siguiente información:
    Nombre
    Apellido
    Dirección
    DNI
    ObjectId

Los datos se pueden listar a través de un GET a localhost/alumnos, así como a su vez se pueden tener los datos ingresando la ID del alumno después de /alumnos/

Para agregar a alumnos se puede hacer un POST a /alumnos

Para actualizarlos, un PATCH a /alumnos/ObjectId

Para eliminarlos, DELETE a /alumnos/ObjectId

***************************************************************************************************************

Con los cursos es lo mismo. Se pueden listar cursos, ver su información, actualizar y eliminar.
Cada curso contiene la siguiente información:
    Tema
    Duración
    Año de dictado

La idea era que también en cursos se puedan listar los alumnos que pertenecen a cada uno, eso todavía se sigue investigando sobre como realizarlo.

Se pueden listar los datos con un GET a /cursos

Para agregar un curso, se tiene que hacer POST a /cursos

Para actualizarlos, un PATCH a /cursos/ObjectId

Para eliminarlos, DELETE a /cursos/ObjectId

***************************************************************************************************************

Para poder utilizar POST, GET, PATCH, DELETE se utilizó Postman.

***************************************************************************************************************

Almacena el JWT en nodemon.js, que es donde se encuentra el env.JWT_KEY.
En las rutas sensibles donde se pueden hacer POST, antes de hacerlo, chequea de que el usuario esté logueado.

***************************************************************************************************************

Para iniciar el servidor, se utiliza "npm start" en la terminal de VS Code.
Las colecciones de la base de datos se guardan en MongoDB Atlas.

***************************************************************************************************************