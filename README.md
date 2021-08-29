# Simulador de Plazos Fijos

### Objetivo:
- El simulador de Plazos Fijos busca brindar al usuario una herramienta con la que pueda calcular de forma sencilla cuál sería su ganancia si decidiera operar a través de éste portal ficticio, en función del dinero que ingresa y también en función de la cantidad de días que dicha suma permanece en el plazo fijo.
- El Plazo Fijo Grupal también es completamente ficticio. Tiene el objetivo de que varias personas puedan invertir sus ahorro de forma conjunta.

#### Individual:
- El simulador, luego de hacer click sobre el botón de Plazo Fijo Individual, requiere del usuario el ingreso de dos tipos de datos, ambos numéricos. Le solicita un monto a depositar y una cantidad de días para determinar la duración del plazo fijo.
- No hay un monto mínimo para el depósito, ni monto máximo.
- El simulador incluye una validación por la cual en caso de que la cantidad de días ingresada sea menor a treinta días o superior a un año, el proceso se detiene y no se permite al usuario continuar con la simulación.
- El interés utilizado para la simulación es de 35% anual.
- El resultado que el simulador arroja a través de un alert, será la ganancia obtenida en los días que dure el Plazo Fijo.

#### Grupal:
- El simulador, luego de hacer click sobre el botón de Plazo Fijo Grupal, requiere del primer usuario el ingreso de un valor string, su nombre y luego un valor numérico, el monto que desea depositar.
- El simulador consulta al usuario si desea agregar mas participantes para la operación, debiendo este colocar la palabra "SI" para proceder con la carga de los datos de la siguiente persona.
- Una vez que se termina con la carga de datos, se coloca NO o cualquier palabra que sea distinta de SI y el simulador va a solicitar la cantidad de días para determinar la duración del plazo fijo.
- El interés utilizado para la simulación es de 35% anual.
- No hay un monto mínimo para el depósito, ni monto máximo.
- El resultado que el simulador arroja a través de varios alerts, será la ganancia total obtenida en los días que dure el Plazo Fijo.
- El resultado de la ganancia individual en los plazos fijos grupales a partir de ahora será a través de una lista con elementos que van siendo creados a través del DOM.
- Tambien se podran borrar estos resultados para "volver a empezar" a través del botón "borrar resultados".

### Mejoras:

#### Previo 1ºEntrega:
- Se mejora aspecto visual del HTML. 
- Se crean dos botones para acceder a nueva funcionalidad que permite acceder al simulador de Plazos Fijos con participación Grupal.
- Se crea una nueva clase que va a ser utilizada en ambas modalidades de Plazos Fijos con el objetivo de reciclar código.
- Se agrega un botón asociado a una nueva función que permite borrar los resultados que surgen en forma de lista de la versión grupal del simulador.

#### Updates para 2ºEntrega:
- Se eliminan los alerts y los prompts.
- Se agregan formularios para entrada de valores.
- Ahora los errores por tiempo inválido se muestran manipulando el DOM.
- Se hace uso de LocalStorage para poder repetir consultas anteriores.
- Se crea función para vincular botones con funcionalidades y reciclar código.
- Se crea función para que elemento del DOM se elimine a si mismo cuando se realiza evento, en este caso para un botón.

#### Updates para 3ºEntrega:
- Se corrige botón "Borrar Resultados" en Plazo Fijo Grupal.
- Se modifica en HTML la ubicación espacial de los alerts de Boostrap.
- Se modifica la función "Invalid" para que pueda ser reutilizada.
- Se agregan efectos de JQuery a elementos que son creados y/o eliminados modificando el DOM.
- Se agrega una sección para ver cotizaciones de moneda extranjera, en este caso del dolar, a través de la consulta a un JSON estático, utilizando ajax.
- Se modifica el color de aquellos alerts que representen errores, ahora son rojos.
- Se modifica nombre de variables en documentos HTML y Js para que mantengan la misma estructura.